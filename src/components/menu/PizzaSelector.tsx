
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

type Pizza = {
  name: string;
  price: number;
  description: string;
  isPopular?: boolean;
};

export const PizzaSelector = () => {
  const [halfPizza1, setHalfPizza1] = useState<Pizza | null>(null);
  const [halfPizza2, setHalfPizza2] = useState<Pizza | null>(null);
  const { addToCart } = useCart();
  const { toast } = useToast();

  // Using the same pizzas from Menu component
  const pizzas: Pizza[] = [
    { name: 'CALABRESA', price: 35.00, description: 'Calabresa acebolada' },
    { name: 'DOIS QUEIJOS', price: 40.00, description: 'Mussarela e requeijão' },
    { name: 'CALACATU', price: 36.00, description: 'Calabresa e requeijão' },
    { name: 'NAPOLITANA', price: 36.00, description: 'Mussarela, tomate e parmesão' },
    { name: 'MUSSARELA', price: 38.00, description: 'Mussarela e tomate' },
    { name: 'BAIANA', price: 38.00, description: 'Calabresa ralada, pimenta calabresa, cebola e ovo' },
    { name: 'CALAMUSSA', price: 40.00, description: 'Calabresa e mussarela' },
    { name: 'BAURU', price: 40.00, description: 'Mussarela, presunto e tomate' },
    { name: 'FRANGO C/ CATUPIRY', price: 40.00, description: 'Frango e requeijão', isPopular: true },
    { name: 'BACON', price: 40.00, description: 'Bacon e mussarela' },
    { name: 'ALHO', price: 40.00, description: 'Mussarela e alho' },
    { name: 'ATUM', price: 40.00, description: 'Atum, cebola e molho de tomate' },
    { name: 'MILHO', price: 40.00, description: 'Milho com mussarela' },
    { name: 'QUATRO QUEIJOS', price: 45.00, description: 'Mussarela, requeijão, parmesão e provolone' },
    { name: 'TOSCANA', price: 42.00, description: 'Calabresa moída com mussarela' },
    { name: 'BAIANA C/ MUSSARELA', price: 42.00, description: 'Calabresa ralada, pimenta calabresa, cebola e mussarela' },
    { name: 'FRANGO C/ MUSSARELA', price: 42.00, description: 'Frango e mussarela' },
    { name: 'PORTUGUESA', price: 45.00, description: 'Presunto, ovos, ervilha, cebola, palmito e mussarela', isPopular: true },
    { name: 'PALMITO', price: 45.00, description: 'Mussarela e palmito' },
    { name: 'MILHO C/ CATUPIRY', price: 45.00, description: 'Milho, mussarela e requeijão' },
    { name: 'PERUANA', price: 45.00, description: 'Atum e mussarela' },
    { name: 'BRÓCOLIS', price: 48.00, description: 'Brócolis, mussarela e bacon' },
    { name: 'CAIPIRA', price: 48.00, description: 'Frango, milho, mussarela e bacon' },
  ];

  const handlePizzaSelect = (pizza: Pizza, half: 1 | 2) => {
    if (half === 1) {
      setHalfPizza1(pizza);
    } else {
      setHalfPizza2(pizza);
    }
  };

  const calculatePrice = () => {
    if (halfPizza1 && halfPizza2) {
      return (halfPizza1.price + halfPizza2.price) / 2;
    }
    return 0;
  };

  const handleAddToCart = () => {
    if (halfPizza1 && halfPizza2) {
      const finalPrice = calculatePrice();
      addToCart({
        name: `${halfPizza1.name} / ${halfPizza2.name} (Meio a Meio)`,
        price: finalPrice,
        category: 'pizza'
      });
      toast({
        title: "Pizza adicionada",
        description: `Pizza meio a meio ${halfPizza1.name} / ${halfPizza2.name} adicionada ao carrinho`,
        duration: 2000,
      });
      // Reset selections
      setHalfPizza1(null);
      setHalfPizza2(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-gray-300">Escolha dois sabores para sua pizza meio a meio</p>
      </div>

      {/* Selected pizzas display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="border border-gray-700 rounded-lg p-4 bg-black/40">
          <h4 className="text-lg font-semibold mb-2 text-dinapoli-green">Primeira Metade:</h4>
          {halfPizza1 ? (
            <div>
              <p className="font-medium">{halfPizza1.name}</p>
              <p className="text-sm text-gray-400">{halfPizza1.description}</p>
              <p className="text-dinapoli-yellow font-bold">R$ {halfPizza1.price.toFixed(2).replace('.', ',')}</p>
            </div>
          ) : (
            <p className="text-gray-500">Clique em um sabor abaixo</p>
          )}
        </div>
        <div className="border border-gray-700 rounded-lg p-4 bg-black/40">
          <h4 className="text-lg font-semibold mb-2 text-dinapoli-green">Segunda Metade:</h4>
          {halfPizza2 ? (
            <div>
              <p className="font-medium">{halfPizza2.name}</p>
              <p className="text-sm text-gray-400">{halfPizza2.description}</p>
              <p className="text-dinapoli-yellow font-bold">R$ {halfPizza2.price.toFixed(2).replace('.', ',')}</p>
            </div>
          ) : (
            <p className="text-gray-500">Clique em um sabor abaixo</p>
          )}
        </div>
      </div>

      {/* Price calculation */}
      {halfPizza1 && halfPizza2 && (
        <div className="text-center p-4 bg-dinapoli-green/20 rounded-lg">
          <p className="text-xl font-bold text-dinapoli-yellow">
            Preço Final: R$ {calculatePrice().toFixed(2).replace('.', ',')}
          </p>
        </div>
      )}

      {/* Pizza options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pizzas.map((pizza, index) => (
          <div 
            key={index}
            className="flex justify-between items-center p-3 border-b border-gray-800 relative group"
          >
            <div className="flex-1">
              <span className="font-medium">{pizza.name}</span>
              <span className="block text-sm text-gray-400">{pizza.description}</span>
              <span className="block md:hidden text-dinapoli-yellow font-bold">R$ {pizza.price.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden md:inline-block text-dinapoli-yellow font-bold mr-4">R$ {pizza.price.toFixed(2).replace('.', ',')}</span>
              <Button
                size="sm"
                className="bg-dinapoli-green hover:bg-dinapoli-green/80 text-white"
                onClick={() => handlePizzaSelect(pizza, 1)}
                disabled={halfPizza1 === pizza}
              >
                1ª
              </Button>
              <Button
                size="sm"
                className="bg-dinapoli-green hover:bg-dinapoli-green/80 text-white"
                onClick={() => handlePizzaSelect(pizza, 2)}
                disabled={halfPizza2 === pizza}
              >
                2ª
              </Button>
            </div>
            {pizza.isPopular && (
              <span className="badge-popular">Mais pedido</span>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button
          onClick={handleAddToCart}
          disabled={!halfPizza1 || !halfPizza2}
          className="bg-dinapoli-green hover:bg-dinapoli-green/90 text-white px-8 py-3 text-lg"
        >
          <Plus className="mr-2 h-5 w-5" />
          Adicionar ao Carrinho
        </Button>
      </div>
    </div>
  );
};
