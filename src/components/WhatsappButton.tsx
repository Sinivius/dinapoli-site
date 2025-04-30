
import { MessageSquare } from 'lucide-react';

const WhatsappButton = () => {
  return (
    <a 
      href="https://wa.me/13996365529?text=Olá! Gostaria de fazer um pedido." 
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button fixed bottom-6 right-6 z-50 bg-[#25D366] p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors duration-300"
      aria-label="Peça pelo WhatsApp"
    >
      <MessageSquare className="h-8 w-8 text-white" />
    </a>
  );
};

export default WhatsappButton;
