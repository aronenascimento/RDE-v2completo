set -e

echo "🚀 Iniciando deploy da Landing Page do Residente de Elite..."


echo "📦 Construindo o projeto..."
if command -v bun &> /dev/null; then
    bun run build
elif command -v npm &> /dev/null; then
    npm run build
else
    echo "❌ Erro: Nem bun nem npm foram encontrados"
    exit 1
fi

S3_BUCKET="residente-elite-landing-page"
CLOUDFRONT_DISTRIBUTION_ID="E3C0YNUPZN9X9P"

echo "☁️ Fazendo upload para S3..."
if [ -d "dist" ]; then
    aws s3 sync dist/ s3://${S3_BUCKET}/ --delete --cache-control "max-age=31536000,public" --exclude "index.html"
    
    # Upload do index.html sem cache
    aws s3 cp dist/index.html s3://${S3_BUCKET}/index.html --cache-control "max-age=0,no-cache,no-store,must-revalidate"
    
    echo "✅ Upload para S3 concluído!"
else
    echo "❌ Erro: Diretório 'dist' não encontrado. Certifique-se de que o build foi executado com sucesso."
    exit 1
fi

if [ -n "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
    echo "🔄 Invalidando cache do CloudFront..."
    aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} --paths "/*"
    echo "✅ Cache do CloudFront invalidado!"
fi

echo ""
echo "✅ Deploy concluído com sucesso!"
echo "🌐 Landing Page disponível em: https://landing.residente-elite.com"