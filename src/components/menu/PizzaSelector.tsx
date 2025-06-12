
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

interface Pizza {
  id: number;
  name: string;
  price: number;
  image: string;
}

export const PizzaSelector = () => {
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
  const [halfPizza1, setHalfPizza1] = useState<Pizza | null>(null);
  const [halfPizza2, setHalfPizza2] = useState<Pizza | null>(null);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const pizzas: Pizza[] = [
    { id: 1, name: 'Mussarela', price: 42.90, image: '/images/pizzas/mussarela.png' },
    { id: 2, name: 'Calabresa', price: 43.90, image: '/images/pizzas/calabresa.png' },
    { id: 3, name: 'Marguerita', price: 45.90, image: '/images/pizzas/marguerita.png' },
    { id: 4, name: 'Frango com Catupiry', price: 47.90, image: '/images/pizzas/frango-catupiry.png' },
    { id: 5, name: 'Portuguesa', price: 47.90, image: '/images/pizzas/portuguesa.png' },
    { id: 6, name: 'Vegetariana', price: 45.90, image: '/images/pizzas/vegetariana.png' },
  ];

  const handlePizzaSelect = (pizza: Pizza) => {
    if (halfPizza1 === pizza || halfPizza2 === pizza) {
      return;
    }
    setSelectedPizza(pizza);
    setHalfPizza1(null);
    setHalfPizza2(null);
  };

  const handleHalfPizzaSelect = (pizza: Pizza, half: 1 | 2) => {
    setSelectedPizza(null);
    if (half === 1) {
      setHalfPizza1(pizza);
    } else {
      setHalfPizza2(pizza);
    }
  };

  const handleAddToCart = () => {
    if (selectedPizza) {
      addToCart({
        name: selectedPizza.name,
        price: selectedPizza.price,
        category: 'pizza'
      });
      toast({
        title: "Pizza adicionada",
        description: `${selectedPizza.name} adicionada ao carrinho`,
      });
    } else if (halfPizza1 && halfPizza2) {
      const halfPizzaPrice = (halfPizza1.price + halfPizza2.price) / 2;
      addToCart({
        name: `${halfPizza1.name} / ${halfPizza2.name} (Meia)`,
        price: halfPizzaPrice,
        category: 'pizza'
      });
      toast({
        title: "Pizza adicionada",
        description: `Meia ${halfPizza1.name} / ${halfPizza2.name} adicionada ao carrinho`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pizzas.map((pizza) => (
          <div
            key={pizza.id}
            className={`relative rounded-lg overflow-hidden shadow-md cursor-pointer ${
              selectedPizza === pizza ? 'ring-2 ring-dinapoli-green' : ''
            }`}
            onClick={() => handlePizzaSelect(pizza)}
          >
            <img
              src={pizza.image}
              alt={pizza.name}
              className="w-full h-48 object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black/70 text-white p-2">
              <h3 className="text-lg font-semibold">{pizza.name}</h3>
              <p className="text-sm">R$ {pizza.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border rounded-md p-4">
        <h4 className="text-lg font-semibold mb-2">
          Escolha a Meia Pizza:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="text-md font-semibold mb-1">Primeira Metade:</h5>
            <select
              className="w-full p-2 border rounded-md text-black"
              value={halfPizza1 ? halfPizza1.id.toString() : ''}
              onChange={(e) => {
                const pizzaId = parseInt(e.target.value);
                const pizza = pizzas.find((p) => p.id === pizzaId);
                setHalfPizza1(pizza || null);
              }}
            >
              <option value="">Selecione</option>
              {pizzas.map((pizza) => (
                <option key={pizza.id} value={pizza.id}>
                  {pizza.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h5 className="text-md font-semibold mb-1">Segunda Metade:</h5>
            <select
              className="w-full p-2 border rounded-md text-black"
              value={halfPizza2 ? halfPizza2.id.toString() : ''}
              onChange={(e) => {
                const pizzaId = parseInt(e.target.value);
                const pizza = pizzas.find((p) => p.id === pizzaId);
                setHalfPizza2(pizza || null);
              }}
            >
              <option value="">Selecione</option>
              {pizzas.map((pizza) => (
                <option key={pizza.id} value={pizza.id}>
                  {pizza.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button
          onClick={handleAddToCart}
          disabled={!selectedPizza && (!halfPizza1 || !halfPizza2)}
          className="bg-dinapoli-green hover:bg-dinapoli-green/90 text-white px-8 py-3 text-lg"
        >
          <Plus className="mr-2 h-5 w-5" />
          Finalizar pedido
        </Button>
      </div>
    </div>
  );
};
