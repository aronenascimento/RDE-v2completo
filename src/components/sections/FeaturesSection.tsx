import { Button } from "@/components/ui/button";
import { 
  Users, 
  FileText, 
  Video, 
  BookOpen, 
  LineChart, 
  Calendar, 
  Zap,
  Map
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Users,
      title: "Mentoria com acompanhamento",
      description: "Mentoria inicial diagnóstica para estabelecer objetivo do aluno e desenhar o mapa da sua aprovação. Ajustes sob demanda contínuo com seu mentor para ajustar estratégia e organizar rotina. Aprender exige feedback rápido e ajustes de rota.",
    },
    {
      icon: FileText,
      title: "Simulados autorais",
      description: "Formato banca SES-PE e ENAMED. Correção em vídeo, ranking e assessoria diagnóstica.",
    },
    {
      icon: LineChart,
      title: "Assessoria diagnóstica",
      description: "Aqui nossos professores avaliam: seu desempenho, o tipo que erro que está cometendo e a relevância do erro em cada tema e analisam a sua evolução.",
    },
    {
      icon: Video,
      title: "Aulas objetivas complementares",
      description: "Foco no que cai. Linguagem de prova e atalhos cognitivos. Sem teoria infinita.",
    },
    {
      icon: BookOpen,
      title: "Material didático enxuto",
      description: "Mapas mentais e ebooks direcionados. Conteúdo filtrado por incidência.",
    },
    {
      icon: Calendar,
      title: "Calendário de revisão",
      description: "Repetição espaçada + recuperação ativa no momento certo.",
    },
    {
      icon: Zap,
      title: "Intensivão final ENAMED e SES-PE",
      description: "Revisões altamente direcionadas na reta final. Aqui nossos professores são reconhecidos pela alta didática!",
    },
    {
      icon: Map,
      title: "Heatmaps SES-PE",
      description: "Nossos mapas da aprovação, contém análise de incidência dos últimos anos de prova e comentários dos nossos Professores primeiro lugares. Aqui você entende o que precisa dedicar mais tempo! Não se engane, você não precisa saber de tudo!",
    },
  ];

  return (
    <section className="bg-background section-padding">
      <div className="container-narrow">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            O QUE VOCÊ TERÁ ACESSO AO LONGO DO ANO
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 shadow-card transition-all duration-200 hover:shadow-card-hover hover:-translate-y-1 border border-border"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
        <Button 
          variant="cta" 
          size="lg"
          className="text-sm"
          onClick={() => {
            (window as any).dataLayer = (window as any).dataLayer || [];
            (window as any).dataLayer.push({
              event: 'botao_clique',
              category: 'features_section',
              action: 'clique_cta',
              label: 'Qual o Melhor Programa Para Mim'
            });
            document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          QUAL O MELHOR PROGRAMA PARA MIM
        </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
