
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

const Combos = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const combos = [
    {
      id: 1,
      title: '15 Esfihas + Refrigerante',
      description: '5 Carne, 5 Queijo, 5 Calabresa',
      price: '47',
      bgColor: 'bg-gradient-to-br from-dinapoli-red to-dinapoli-red/70'
    },
    {
      id: 2,
      title: '20 Esfihas + Refrigerante',
      description: '5 Carne, 5 Queijo, 5 Calabresa, 5 Requeijão',
      price: '60',
      bgColor: 'bg-gradient-to-br from-dinapoli-yellow to-dinapoli-yellow/70',
      featured: true
    },
    {
      id: 3,
      title: '30 Esfihas + Refrigerante',
      description: '10 Carne, 10 Queijo, 10 Calabresa',
      price: '90',
      bgColor: 'bg-gradient-to-br from-dinapoli-green to-dinapoli-green/70'
    }
  ];

  const handleAddComboToCart = (combo: typeof combos[0]) => {
    // Convert price from string to number
    const priceAsNumber = parseFloat(combo.price);
    
    addToCart({
      name: `Combo ${combo.title}`,
      price: priceAsNumber,
      category: 'salty',  // Combos are primarily salty items
    });
    
    toast({
      title: "Combo adicionado",
      description: `Combo ${combo.title} adicionado ao carrinho`,
      duration: 2000,
    });
  };

  return (
    <section id="combos" className="section-padding relative">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4 font-display">Combos</h2>
          <div className="mx-auto w-24 h-1 bg-gradient-to-r from-dinapoli-green via-dinapoli-white to-dinapoli-red mb-6"></div>
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
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">{combo.title}</h3>
                  
                  <p className="text-sm md:text-base mb-6 opacity-90">
                    {combo.description}
                  </p>
                  
                  <div className="mb-6">
                    <div className="flex items-center justify-center">
                      <span className="text-4xl md:text-5xl font-bold">R$ {combo.price}</span>
                      <span className="text-sm self-start ml-1">,00</span>
                    </div>
                  </div>
                  
                  <Button 
                    className={`w-full ${
                      combo.featured 
                        ? 'bg-dinapoli-yellow hover:bg-dinapoli-yellow/90 text-black' 
                        : 'bg-white/90 hover:bg-white text-black'
                    } text-lg py-6`}
                    onClick={() => handleAddComboToCart(combo)}
                  >
                    <Plus className="mr-1 h-4 w-4" /> Adicionar ao Carrinho
                  </Button>
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
