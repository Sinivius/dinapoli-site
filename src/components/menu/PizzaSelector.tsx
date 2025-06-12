
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

type MenuItem = {
  name: string;
  price: string;
  description?: string;
  isPopular?: boolean;
};

interface PizzaSelectorProps {
  pizzas: MenuItem[];
  onAddToCart: (item: { name: string; price: number; category: 'pizza' }) => void;
}

export const PizzaSelector = ({ pizzas, onAddToCart }: PizzaSelectorProps) => {
  const [selectedFlavor1, setSelectedFlavor1] = useState<MenuItem | null>(null);
  const [selectedFlavor2, setSelectedFlavor2] = useState<MenuItem | null>(null);
  const { toast } = useToast();

  const handleFlavorSelect = (flavor: MenuItem, position: 1 | 2) => {
    if (position === 1) {
      setSelectedFlavor1(flavor);
      // Se o sabor 2 for igual ao sabor 1, limpa o sabor 2
      if (selectedFlavor2?.name === flavor.name) {
        setSelectedFlavor2(null);
      }
    } else {
      setSelectedFlavor2(flavor);
      // Se o sabor 1 for igual ao sabor 2, limpa o sabor 1
      if (selectedFlavor1?.name === flavor.name) {
        setSelectedFlavor1(null);
      }
    }
  };

  const calculateHalfPrice = () => {
    if (!selectedFlavor1 || !selectedFlavor2) return 0;
    
    const price1 = parseFloat(selectedFlavor1.price.replace(',', '.'));
    const price2 = parseFloat(selectedFlavor2.price.replace(',', '.'));
    
    return (price1 + price2) / 2;
  };

  const handleAddHalfPizza = () => {
    if (!selectedFlavor1 || !selectedFlavor2) {
      toast({
        title: "Selecione dois sabores",
        description: "Escolha dois sabores diferentes para a pizza meio a meio.",
        variant: "destructive"
      });
      return;
    }

    const halfPrice = calculateHalfPrice();
    const pizzaName = `Pizza Meio a Meio: ${selectedFlavor1.name} / ${selectedFlavor2.name}`;

    onAddToCart({
      name: pizzaName,
      price: halfPrice,
      category: 'pizza'
    });

    toast({
      title: "Pizza meio a meio adicionada",
      description: `${pizzaName} adicionada ao carrinho`,
      duration: 2000,
    });

    // Reset selections
    setSelectedFlavor1(null);
    setSelectedFlavor2(null);
  };

  const availableFlavors = pizzas.filter(pizza => 
    !selectedFlavor1 || pizza.name !== selectedFlavor1.name
  ).filter(pizza => 
    !selectedFlavor2 || pizza.name !== selectedFlavor2.name
  );

  return (
    <div className="space-y-6">
      <div className="bg-gray-900/50 p-4 rounded-lg">
        <p className="text-sm text-gray-300 mb-4">
          Escolha dois sabores diferentes. O preço será calculado como a média dos dois sabores selecionados.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="font-semibold mb-2 text-dinapoli-green">1º Sabor</h4>
            <div className="bg-gray-800 p-3 rounded min-h-[60px] flex items-center">
              {selectedFlavor1 ? (
                <div>
                  <span className="font-medium">{selectedFlavor1.name}</span>
                  <span className="block text-sm text-dinapoli-yellow">R$ {selectedFlavor1.price}</span>
                </div>
              ) : (
                <span className="text-gray-400">Selecione o primeiro sabor</span>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2 text-dinapoli-green">2º Sabor</h4>
            <div className="bg-gray-800 p-3 rounded min-h-[60px] flex items-center">
              {selectedFlavor2 ? (
                <div>
                  <span className="font-medium">{selectedFlavor2.name}</span>
                  <span className="block text-sm text-dinapoli-yellow">R$ {selectedFlavor2.price}</span>
                </div>
              ) : (
                <span className="text-gray-400">Selecione o segundo sabor</span>
              )}
            </div>
          </div>
        </div>

        {selectedFlavor1 && selectedFlavor2 && (
          <div className="text-center mb-4">
            <span className="text-lg font-bold text-dinapoli-yellow">
              Preço da pizza meio a meio: R$ {calculateHalfPrice().toFixed(2).replace('.', ',')}
            </span>
          </div>
        )}

        <div className="flex justify-center">
          <Button
            onClick={handleAddHalfPizza}
            disabled={!selectedFlavor1 || !selectedFlavor2}
            className="bg-dinapoli-green hover:bg-dinapoli-green/80 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Pizza Meio a Meio
          </Button>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-3">Sabores Disponíveis</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-80 overflow-y-auto">
          {pizzas.map((pizza, index) => (
            <div 
              key={index}
              className={`p-3 border border-gray-700 rounded cursor-pointer transition-colors ${
                selectedFlavor1?.name === pizza.name || selectedFlavor2?.name === pizza.name
                  ? 'bg-dinapoli-green/20 border-dinapoli-green'
                  : 'hover:bg-gray-800'
              }`}
              onClick={() => {
                if (!selectedFlavor1) {
                  handleFlavorSelect(pizza, 1);
                } else if (!selectedFlavor2 && pizza.name !== selectedFlavor1.name) {
                  handleFlavorSelect(pizza, 2);
                } else if (selectedFlavor1?.name === pizza.name) {
                  setSelectedFlavor1(null);
                } else if (selectedFlavor2?.name === pizza.name) {
                  setSelectedFlavor2(null);
                }
              }}
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <span className="font-medium text-sm">{pizza.name}</span>
                  {pizza.description && (
                    <span className="block text-xs text-gray-400">{pizza.description}</span>
                  )}
                </div>
                <span className="text-dinapoli-yellow font-bold text-sm">R$ {pizza.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
