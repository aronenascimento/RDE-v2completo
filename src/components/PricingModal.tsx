import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ActiveCampaignForm from "./ActiveCampaignForm";
import { Loader2 } from "lucide-react";

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
  // Novo estado para controlar o feedback visual de redirecionamento
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleFormSuccess = (link: string, formData: { name: string; email: string; phone: string }) => {
    console.log('Sucesso no form. Iniciando redirecionamento para:', link);
    
    // 1. Em vez de fechar, ativamos o estado de loading
    setIsRedirecting(true);

    // 2. Constrói a URL
    const url = new URL(link);
    if (formData.name) url.searchParams.set('name', formData.name);
    if (formData.email) url.searchParams.set('email', formData.email);
    if (formData.phone) url.searchParams.set('phone', formData.phone);

    // 3. Redireciona. Não precisamos de setTimeout para "esperar o modal fechar" mais.
    // O usuário verá a mensagem de "Redirecionando..." até a nova página carregar.
    window.location.href = url.toString();
  };

  const handleClose = (isOpen: boolean) => {
    // Impede o fechamento manual se estiver no meio do redirecionamento
    if (isRedirecting) return;
    
    onOpenChange(isOpen);
    // Reseta o estado caso o modal seja reaberto futuramente sem recarregar a página
    if (!isOpen) setTimeout(() => setIsRedirecting(false), 300); 
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
        {isRedirecting ? (
          <div className="flex flex-col items-center justify-center p-10 space-y-4 text-center">
            {/* Ícone de loading opcional */}
            <Loader2 className="h-10 w-10 animate-spin text-primary" /> 
            <div className="space-y-2">
              <h3 className="text-lg font-bold">Tudo certo!</h3>
              <p className="text-muted-foreground">
                Estamos redirecionando você para o pagamento...
              </p>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader className="p-6 pb-0">
              <DialogTitle className="text-xl font-bold text-primary">
                Quase lá!
              </DialogTitle>
              <DialogDescription>
                Preencha seus dados para garantir o acesso ao plano: 
                <span className="font-semibold text-foreground block mt-1">{planTitle}</span>
              </DialogDescription>
            </DialogHeader>
            
            {open && (
              <div className="p-0">
                <ActiveCampaignForm 
                  onSuccess={handleFormSuccess} 
                  targetLink={targetLink} 
                />
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PricingModal;