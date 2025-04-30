
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <section id="sobre" className="py-20 relative bg-black">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">
            <span className="text-dinapoli-white">Sobre a </span>
            <span className="text-dinapoli-red">Dinapoli</span>
          </h2>
          <div className="mx-auto w-24 h-1 bg-gradient-to-r from-dinapoli-green via-dinapoli-white to-dinapoli-red mb-8"></div>
          
          <p className="text-gray-300 text-lg mb-6">
            A Dinapoli nasceu da paixão pela gastronomia e do desejo de oferecer uma experiência autêntica de sabores italianos e árabes. Com receitas tradicionais e um toque especial, nossas esfihas e pizzas conquistaram o paladar dos nossos clientes.
          </p>
          
          <p className="text-gray-300 text-lg mb-8">
            Nosso compromisso é com a qualidade dos ingredientes, o atendimento próximo e acolhedor, e a satisfação total dos nossos clientes. Cada esfiha é preparada artesanalmente, seguindo receitas que preservam o sabor original e a tradição.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-dinapoli-red/20 flex items-center justify-center mb-3">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/3448/3448022.png" 
                  alt="Qualidade" 
                  className="w-8 h-8"
                />
              </div>
              <h3 className="font-bold text-lg">Qualidade</h3>
              <p className="text-sm text-gray-400">Ingredientes selecionados</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-dinapoli-yellow/20 flex items-center justify-center mb-3">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/1830/1830839.png" 
                  alt="Artesanal" 
                  className="w-8 h-8"
                />
              </div>
              <h3 className="font-bold text-lg">Artesanal</h3>
              <p className="text-sm text-gray-400">Produção caseira</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-dinapoli-green/20 flex items-center justify-center mb-3">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/2904/2904948.png" 
                  alt="Tradição" 
                  className="w-8 h-8"
                />
              </div>
              <h3 className="font-bold text-lg">Tradição</h3>
              <p className="text-sm text-gray-400">Receitas autênticas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
