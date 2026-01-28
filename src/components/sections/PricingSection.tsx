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
      event: 'cta_pricing_click',
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
      highlight: "1 ANO",
      title: "MENTORIA + INTENSIVÃO",
      subtitle: null,
      originalPrice: "R$ 5.947",
      installmentPrice: "12x de R$ 394,64",
      cashPrice: "R$ 3.884",
      features: [
        "Mentoria completa",
        "Simulados autorais",
        "Materiais didáticos",
        "Heatmaps: mapas de incidência SES-PE",
        "Intensivão final SES-PE e ENAMED",
      ],
      featured: false,
      link: "https://pay.hub.la/PiSKxMDXWRGthaP8s4Wp",
    },
    {
      highlight: null,
      title: "MENTORIA",
      subtitle: "1 ANO",
      originalPrice: "R$ 4.847",
      installmentPrice: "12x de R$ 372,28",
      cashPrice: "R$ 3.664",
      features: [
        "Mentoria completa",
        "Simulados autorais",
        "Materiais didáticos",
        "Heatmaps: mapas de incidência SES-PE",
      ],
      featured: false,
      link: "https://pay.hub.la/CqZF7dHdfWFmCbo5ctil",
    },
    {
      highlight: "RECOMENDADO",
      title: "MENTORIA + INTENSIVÃO",
      subtitle: "2 ANOS - Opção para quem quer se preparar desde o 5° ano",
      originalPrice: "R$ 8.694",
      installmentPrice: "12x de R$ 650,28",
      cashPrice: "R$ 6.400",
      features: [
        "Planejamento longo prazo",
        "Mentoria completa",
        "Simulados autorais",
        "Materiais didáticos",
        "Heatmaps: mapas de incidência SES-PE",
        "Intensivão final SES-PE e ENAMED",
      ],
      featured: true,
      link: "https://pay.hub.la/2oF1e0znhEVShwGOxK0R",
    },
  ];

  return (
    <>
      <section id="planos" className="bg-primary section-padding">
        <div className="container-narrow">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-12 lg:mb-16 px-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground leading-tight">
              ESCOLHA COMO VOCÊ QUER SE PREPARAR EM 2026
            </h2>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4 sm:px-0">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-card rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col relative ${
                  plan.featured 
                    ? 'ring-2 ring-accent shadow-xl sm:scale-[1.03] order-first sm:order-none' 
                    : 'shadow-card hover:shadow-card-hover'
                }`}
              >
                {/* Card Header */}
                {plan.highlight && (
                  <div className={`py-2.5 px-4 text-center ${
                    plan.featured ? 'bg-accent' : 'bg-secondary'
                  }`}>
                    <span className={`text-xs sm:text-sm font-bold tracking-wider ${
                      plan.featured ? 'text-accent-foreground' : 'text-secondary-foreground'
                    }`}>
                      {plan.highlight}
                    </span>
                  </div>
                )}

                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  {/* Plan Title */}
                  <div className="mb-4">
                    <h3 className="text-base sm:text-lg font-bold text-foreground leading-tight">
                      {plan.title}
                    </h3>
                    {plan.subtitle && (
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-snug">
                        {plan.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Pricing */}
                  <div className="mb-5 sm:mb-6 space-y-2">
                    {/* Original Price (Strikethrough) */}
                    {plan.originalPrice && (
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground line-through decoration-red-500 decoration-2">
                          De {plan.originalPrice}
                        </p>
                      </div>
                    )}
                    
                    {/* Installment Price */}
                    <div>
                      <p className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
                        {plan.installmentPrice}
                      </p>
                    </div>
                    
                    {/* Cash Price */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                        ou
                      </span>
                      <span className="text-base sm:text-lg font-bold text-accent">
                        {plan.cashPrice}
                      </span>
                      <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                        à vista
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6 flex-1">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-muted-foreground leading-snug">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button 
                    variant="pricingCta" 
                    size="lg"
                    className={`mt-auto w-full text-sm sm:text-base py-5 sm:py-6 font-bold transition-all duration-200 ${
                      plan.featured 
                        ? 'shadow-lg hover:shadow-xl' 
                        : 'bg-primary hover:bg-primary/90'
                    }`}
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
                  <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 z-10">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent rounded-full flex items-center justify-center shadow-lg ring-2 ring-primary">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-accent-foreground fill-current" />
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