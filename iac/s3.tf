# S3 Bucket para hospedagem da landing page do Residente de Elite
resource "aws_s3_bucket" "residente_elite_landing_bucket" {
  bucket = "residente-elite-landing-page"
}

resource "aws_s3_bucket_ownership_controls" "residente_elite_landing_bucket_ownership" {
  bucket = aws_s3_bucket.residente_elite_landing_bucket.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

# Bloquear acesso público direto ao S3 (apenas CloudFront pode acessar)
resource "aws_s3_bucket_public_access_block" "residente_elite_landing_bucket_public_access" {
  bucket = aws_s3_bucket.residente_elite_landing_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# CloudFront Origin Access Control
resource "aws_cloudfront_origin_access_control" "residente_elite_landing_oac" {
  name                              = "residente-elite-landing-oac"
  description                       = "OAC for Residente de Elite Landing Page S3 bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# Política do S3 para permitir apenas CloudFront
resource "aws_s3_bucket_policy" "residente_elite_landing_bucket_policy" {
  bucket = aws_s3_bucket.residente_elite_landing_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowCloudFrontServicePrincipal"
        Effect = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.residente_elite_landing_bucket.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.residente_elite_landing_distribution.arn
          }
        }
      }
    ]
  })
}

# Certificado SSL para o subdomínio (deve ser criado na região us-east-1)
resource "aws_acm_certificate" "residente_elite_landing_cert" {
  provider          = aws.us_east_1
  domain_name       = "landing.residente-elite.com"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

# Validação do certificado via Route 53
resource "aws_route53_record" "landing_cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.residente_elite_landing_cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.residente_elite_zone.zone_id
}

resource "aws_acm_certificate_validation" "residente_elite_landing_cert_validation" {
  provider                = aws.us_east_1
  certificate_arn         = aws_acm_certificate.residente_elite_landing_cert.arn
  validation_record_fqdns = [for record in aws_route53_record.landing_cert_validation : record.fqdn]
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "residente_elite_landing_distribution" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Residente de Elite Landing Page Distribution"
  default_root_object = "index.html"
  price_class         = "PriceClass_100"

  aliases = [
    "landing.residente-elite.com"
  ]

  origin {
    domain_name              = aws_s3_bucket.residente_elite_landing_bucket.bucket_regional_domain_name
    origin_id                = "S3-residente-elite-landing"
    origin_access_control_id = aws_cloudfront_origin_access_control.residente_elite_landing_oac.id
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-residente-elite-landing"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
  }

  # Cache behavior para assets (imagens, css, js)
  ordered_cache_behavior {
    path_pattern     = "/assets/*"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-residente-elite-landing"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 31536000
    max_ttl                = 31536000
    compress               = true
  }

  # Custom error response para SPA (redireciona 404 para index.html)
  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 300
  }

  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 300
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.residente_elite_landing_cert.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  depends_on = [aws_acm_certificate_validation.residente_elite_landing_cert_validation]
}

# Data source para a hosted zone do Route 53
data "aws_route53_zone" "residente_elite_zone" {
  name         = "residente-elite.com"
  private_zone = false
}

# Route 53 record para o subdomínio landing
resource "aws_route53_record" "residente_elite_landing" {
  zone_id = data.aws_route53_zone.residente_elite_zone.zone_id
  name    = "landing.residente-elite.com"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.residente_elite_landing_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.residente_elite_landing_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

# Outputs
output "cloudfront_domain_name" {
  value       = aws_cloudfront_distribution.residente_elite_landing_distribution.domain_name
  description = "CloudFront distribution domain name"
}

output "cloudfront_distribution_id" {
  value       = aws_cloudfront_distribution.residente_elite_landing_distribution.id
  description = "CloudFront distribution ID"
}

output "s3_bucket_name" {
  value       = aws_s3_bucket.residente_elite_landing_bucket.id
  description = "S3 bucket name"
}

output "website_url" {
  value       = "https://landing.residente-elite.com"
  description = "Website URL"
}