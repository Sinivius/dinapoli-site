
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Combos = () => {
  const combos = [
    {
      id: 1,
      title: '15 Esfihas',
      description: 'Carne, Queijo, Calabresa',
      extras: '+ Refrigerante',
      price: '45',
      savings: 'Economia de R$ 10',
      bgColor: 'bg-gradient-to-br from-dinapoli-red to-dinapoli-red/70'
    },
    {
      id: 2,
      title: '20 Esfihas',
      description: 'Carne, Queijo, Calabresa, Catupiry',
      extras: '+ Refrigerante',
      price: '60',
      savings: 'Economia de R$ 15',
      bgColor: 'bg-gradient-to-br from-dinapoli-yellow to-dinapoli-yellow/70',
      featured: true
    },
    {
      id: 3,
      title: '30 Esfihas',
      description: 'Carne, Queijo, Calabresa',
      extras: '+ Refrigerante',
      price: '90',
      savings: 'Economia de R$ 20',
      bgColor: 'bg-gradient-to-br from-dinapoli-green to-dinapoli-green/70'
    }
  ];

  return (
    <section id="combos" className="section-padding relative">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Combos</h2>
          <div className="mx-auto w-24 h-1 bg-gradient-to-r from-dinapoli-green via-dinapoli-white to-dinapoli-red mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Aproveite nossos combos especiais e economize. Ideal para reunir amigos e família.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {combos.map((combo) => (
            <div key={combo.id} className="flex">
              <Card className={`${combo.featured ? 'transform -translate-y-4 scale-105' : ''} w-full ${combo.bgColor} text-white rounded-lg overflow-hidden shadow-xl card-hover border-0`}>
                {combo.featured && (
                  <div className="bg-black text-dinapoli-yellow py-2 text-center text-sm font-bold">
                    MAIS VENDIDO
                  </div>
                )}
                
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold mb-2">Combo {combo.title}</h3>
                  <div className="text-sm mb-4 opacity-90">
                    <p>{combo.description}</p>
                    <p>{combo.extras}</p>
                  </div>
                  
                  <div className="mb-6">
                    <span className="text-sm">Por apenas</span>
                    <div className="flex items-center justify-center">
                      <span className="text-3xl font-bold">R$ {combo.price}</span>
                      <span className="text-sm self-start ml-1">,00</span>
                    </div>
                    <span className="text-xs opacity-90">{combo.savings}</span>
                  </div>
                  
                  <a 
                    href={`https://wa.me/13996365529?text=Olá! Gostaria de pedir o Combo ${combo.title} por R$ ${combo.price}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button 
                      className={`w-full ${
                        combo.featured 
                          ? 'bg-dinapoli-yellow hover:bg-dinapoli-yellow/90 text-black' 
                          : 'bg-white/90 hover:bg-white text-black'
                      }`}
                    >
                      Pedir agora
                    </Button>
                  </a>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Combos;
