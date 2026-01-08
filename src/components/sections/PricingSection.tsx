import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import PricingModal from "../PricingModal";

const PricingSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ title: string; link: string } | null>(null);

  const handleOpenModal = (title: string, link: string, highlight?: string | null) => {
    // Dispara evento para o GTM
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'botao_clique',
      category: 'pricing_section',
      action: 'clique_cta',
      label: title,
      plan: highlight || 'N/A'
    });
    
    setSelectedPlan({ title, link });
    setIsModalOpen(true);
  };

  const plans = [
    {
      highlight: "VITALÍCIO",
      title: "MENTORIA + INTENSIVÃO",
      subtitle: "Acesso até passar",
      originalPrice: "R$ 12.397",
      price: "Por 12x de R$ 944",
      features: [
        "Mentoria completa",
        "Simulados autorais",
        "Materiais didáticos",
        "Heatmaps: mapas de incidência SES-PE",
        "Intensivão final SES-PE e ENAMED",
        "Acesso até aprovação",
      ],
      featured: true,
      link: "https://pay.hub.la/2L2INoOmRCWYOZFDPMli",
    },
    {
      highlight: "1 ANO",
      title: "MENTORIA + INTENSIVÃO",
      subtitle: null,
      originalPrice: "R$ 4.947",
      price: "Por 12x de R$ 343",
      features: [
        "Mentoria completa",
        "Simulados autorais",
        "Materiais didáticos",
        "Heatmaps: mapas de incidência SES-PE",
        "Intensivão final SES-PE e ENAMED",
      ],
      featured: false,
      link: "https://pay.hub.la/OSukjs6DGCU6sWGrnPBR",
    },
    {
      highlight: null,
      title: "MENTORIA",
      subtitle: "1 ANO",
      originalPrice: "R$ 3.847",
      price: "Por 12x de R$ 304",
      features: [
        "Mentoria completa",
        "Simulados autorais",
        "Materiais didáticos",
        "Heatmaps: mapas de incidência SES-PE",
      ],
      featured: false,
      link: "https://pay.hub.la/Plaz7FCRpEWbdxYR70iT",
    },
    {
      highlight: "RECOMENDADO",
      title: "MENTORIA",
      subtitle: "2 ANOS - Opção para quem quer se preparar desde o 5° ano",
      originalPrice: "R$ 7.694",
      price: "Por 12x de R$ 599",
      features: [
        "Planejamento longo prazo",
        "Mentoria completa",
        "Simulados autorais",
        "Materiais didáticos",
        "Heatmaps: mapas de incidência SES-PE",
      ],
      featured: true,
      link: "https://pay.hub.la/pWgJ4dAT0tM9IjXshdbl",
    },
  ];

  return (
    <>
      <section id="planos" className="bg-primary section-padding">
        <div className="container-narrow">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground">
              ESCOLHA COMO VOCÊ QUER SE PREPARAR EM 2026
            </h2>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-card rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-1 flex flex-col ${
                  plan.featured 
                    ? 'ring-2 ring-accent shadow-lg scale-[1.02]' 
                    : 'shadow-card hover:shadow-card-hover'
                }`}
              >
                {/* Card Header */}
                {plan.highlight && (
                  <div className={`py-2 px-4 text-center ${
                    plan.featured ? 'bg-accent' : 'bg-secondary'
                  }`}>
                    <span className={`text-xs font-bold tracking-wider ${
                      plan.featured ? 'text-accent-foreground' : 'text-secondary-foreground'
                    }`}>
                      {plan.highlight}
                    </span>
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  {/* Plan Title */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-foreground leading-tight">
                      {plan.title}
                    </h3>
                    {plan.subtitle && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {plan.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Pricing */}
                  <div className="mb-6">
                    {plan.originalPrice && (
                      <p className="text-sm text-muted-foreground line-through decoration-red-500 decoration-2">
                        De {plan.originalPrice}
                      </p>
                    )}
                    <p className="text-2xl font-bold text-foreground">
                      {plan.price}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-6 flex-1">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button 
                    variant="pricingCta" 
                    size="lg"
                    className={`mt-auto ${plan.featured ? '' : 'bg-primary hover:bg-primary/90'}`}
                    data-gtm-click="cta_pricing"
                    data-gtm-label={plan.title}
                    data-gtm-plan={plan.highlight || plan.subtitle}
                    onClick={() => handleOpenModal(plan.title, plan.link, plan.highlight)}
                  >
                    Quero essa opção
                  </Button>
                </div>

                {/* Featured Star */}
                {plan.featured && (
                  <div className="absolute -top-3 -right-3">
                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-lg">
                      <Star className="w-5 h-5 text-accent-foreground fill-current" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedPlan && (
        <PricingModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          planTitle={selectedPlan.title}
          targetLink={selectedPlan.link}
        />
      )}
    </>
  );
};

export default PricingSection;