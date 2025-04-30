
import { useState } from 'react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  return (
    <section id="inicio" className="pt-28 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
            <div className="flex items-center mb-4">
              <div className="w-10 h-1 bg-dinapoli-green"></div>
              <div className="w-10 h-1 bg-dinapoli-white mx-1"></div>
              <div className="w-10 h-1 bg-dinapoli-red"></div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-white">Di</span>
              <span className="text-dinapoli-red">Napoli</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium mb-6">
              <span className="highlight-text">Esfiharia e Pizzaria</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Sabores autênticos da culinária italiana e árabe, com receitas artesanais e ingredientes selecionados para proporcionar uma experiência gastronômica única.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#cardapio">
                <Button className="bg-dinapoli-red hover:bg-dinapoli-red/80 text-white px-8 py-6 text-lg">
                  Ver Cardápio
                </Button>
              </a>
              <a href="https://wa.me/13996365529" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-dinapoli-yellow text-dinapoli-yellow hover:bg-dinapoli-yellow hover:text-black px-8 py-6 text-lg">
                  Peça Agora
                </Button>
              </a>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative">
              {/* Logo circle with italian flag gradient border */}
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-black p-1 bg-gradient-to-r from-dinapoli-green via-dinapoli-white to-dinapoli-red animate-float">
                <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center p-4">
                  <img
                    src="/lovable-uploads/fa1111b9-d9ee-4aa8-a830-782d732a3cf6.png"
                    alt="Dinapoli Logo"
                    className={`w-full h-auto transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setIsImageLoaded(true)}
                  />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full bg-dinapoli-yellow opacity-70"></div>
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-dinapoli-red opacity-70"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
