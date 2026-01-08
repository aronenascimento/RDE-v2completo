import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ActiveCampaignForm from "./ActiveCampaignForm";

interface PricingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planTitle: string;
  targetLink: string;
}

const PricingModal: React.FC<PricingModalProps> = ({
  open,
  onOpenChange,
  planTitle,
  targetLink,
}) => {
  // O foco é garantir que o redirecionamento ocorra após o callback.

  const handleFormSuccess = (link: string, formData: { name: string; email: string; phone: string }) => {
    console.log('Redirecionando para:', link, 'com dados:', formData);
    
    // 1. Fecha o modal imediatamente
    onOpenChange(false); 

    // 2. Constrói a URL com os parâmetros do formulário
    const url = new URL(link);
    if (formData.name) {
      url.searchParams.set('name', formData.name);
    }
    if (formData.email) {
      url.searchParams.set('email', formData.email);
    }
    if (formData.phone) {
      url.searchParams.set('phone', formData.phone);
    }

    // 3. Redireciona a aba atual para o link de compra após um pequeno delay.
    // O delay de 100ms ajuda a garantir que o estado do modal seja atualizado antes da navegação.
    setTimeout(() => {
      window.location.href = url.toString();
    }, 100);
  };

  // A função handleClose é importante para garantir que o estado 'open' seja propagado.
  const handleClose = (isOpen: boolean) => {
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-bold text-primary">
            Quase lá!
          </DialogTitle>
          <DialogDescription>
            Preencha seus dados para garantir o acesso ao plano: 
            <span className="font-semibold text-foreground block mt-1">{planTitle}</span>
          </DialogDescription>
        </DialogHeader>
        
        {/* Renderiza o formulário apenas quando o modal estiver aberto para forçar a reexecução do script AC */}
        {open && (
          <div className="p-0">
            <ActiveCampaignForm 
              onSuccess={handleFormSuccess} 
              targetLink={targetLink} 
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PricingModal;