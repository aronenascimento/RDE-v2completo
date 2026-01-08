import { Button } from "@/components/ui/button";
import { Check, Shield, ArrowRight } from "lucide-react";

const FooterSection = () => {
  const targetAudience = [
    "Quem quer a SES-PE ou ENAMED como bancas prioritárias",
    "Quem já tentou estudar sozinho e se perdeu",
    "Quem quer método, não excesso",
    "Quem entende que aprovação é construção",
  ];

  return (
    <footer className="bg-dark text-dark-foreground">
      {/* Main Footer Content */}
      <div className="section-padding">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left - Audience */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                PARA QUEM É O RESIDENTE DE ELITE
              </h2>
              
              <ul className="space-y-4">
                {targetAudience.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-dark-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right - Commitment */}
            <div>
              <div className="bg-dark-foreground/5 rounded-xl p-6 md:p-8 border border-dark-foreground/10">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-accent" />
                  <h3 className="text-xl font-bold text-accent">
                    NOSSO COMPROMISSO
                  </h3>
                </div>
                
                <p className="text-dark-foreground/85 leading-relaxed">
                  O Residente de Elite não promete atalhos irreais. Promete{" "}
                  <strong className="text-dark-foreground">clareza, estratégia e acompanhamento</strong>. 
                  Você estuda com método, ciência e direção.
                </p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-16 text-center">
            <p className="text-lg md:text-xl text-dark-foreground/90 mb-8 max-w-2xl mx-auto">
              Escolha seu caminho em 2026. A aprovação começa com uma decisão bem feita.
            </p>
            
            <Button 
              variant="cta" 
              size="xl" 
              className="group"
              data-gtm-click="cta_footer"
              data-gtm-label="Vem Ser Residente de Elite"
              onClick={() => {
                (window as any).dataLayer = (window as any).dataLayer || [];
                (window as any).dataLayer.push({
                  event: 'botao_clique',
                  category: 'footer_section',
                  action: 'clique_cta',
                  label: 'Vem Ser Residente de Elite'
                });
                document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              VEM SER RESIDENTE DE ELITE
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-dark-foreground/10 py-6">
        <div className="container-narrow text-center">
          <p className="text-sm text-dark-foreground/60">
            © 2026 Residente de Elite. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
