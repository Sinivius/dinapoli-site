
import { WhatsApp } from 'lucide-react';

const WhatsappButton = () => {
  return (
    <a 
      href="https://wa.me/13996365529?text=Olá! Gostaria de fazer um pedido." 
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
      aria-label="Peça pelo WhatsApp"
    >
      <WhatsApp className="h-8 w-8 text-white" />
    </a>
  );
};

export default WhatsappButton;
