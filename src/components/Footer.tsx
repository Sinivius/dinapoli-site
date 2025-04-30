
import { Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 border-t border-gray-800 relative">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <img 
              src="/lovable-uploads/fa1111b9-d9ee-4aa8-a830-782d732a3cf6.png"
              alt="Dinapoli Logo" 
              className="h-16"
            />
          </div>
          
          <div className="mb-6 md:mb-0">
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/dinapoliesfiharia" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-purple-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram />
              </a>
              <a 
                href="https://wa.me/13996365529" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#25D366] transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsApp />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>
            Terça a Domingo: 18h30 às 00h | Fechado às segundas-feiras
          </p>
          <p className="mt-2">
            &copy; {currentYear} Dinapoli Esfiharia e Pizzaria. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
