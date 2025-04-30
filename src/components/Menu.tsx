
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

type MenuItem = {
  name: string;
  price: string;
  isPopular?: boolean;
};

const Menu = () => {
  const [activeTab, setActiveTab] = useState('salty');
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const saltyItems: MenuItem[] = [
    { name: 'CARNE', price: '3,00' },
    { name: 'QUEIJO', price: '3,00', isPopular: true },
    { name: 'CALABRESA', price: '3,00', isPopular: true },
    { name: 'CATUPIRY', price: '3,00' },
    { name: 'PIZZA', price: '3,50' },
    { name: 'FRANGO', price: '4,00' },
    { name: 'BACON', price: '4,00' },
    { name: 'BAURU', price: '4,00' },
    { name: 'ATUM', price: '4,00' },
    { name: 'DOIS QUEIJOS', price: '4,00' },
    { name: 'ALHO', price: '4,00' },
    { name: 'CALABRESA C/ QUEIJO', price: '4,50' },
    { name: 'CALABRESA C/ CATUPIRY', price: '4,50' },
    { name: 'CARNE C/ QUEIJO', price: '4,50' },
    { name: 'BAIANA', price: '4,50' },
    { name: 'FRANGO C/ CATUPIRY', price: '5,00', isPopular: true },
    { name: 'FRANGO C/ QUEIJO', price: '5,00' },
    { name: 'PALMITO C/ QUEIJO', price: '5,00' },
    { name: 'MILHO C/ QUEIJO', price: '5,00' },
    { name: 'QUATRO QUEIJOS', price: '5,50' },
    { name: 'ATUM C/ QUEIJO', price: '5,50' },
    { name: 'BRÓCOLIS/QUEIJO/BACON', price: '6,00' },
    { name: 'BAIANA C/ QUEIJO', price: '6,00' },
    { name: 'PRESUNTO/FRANGO/CATUPIRY', price: '6,00' },
    { name: 'PRESUNTO/FRANGO/QUEIJO', price: '6,00' },
  ];
  
  const sweetItems: MenuItem[] = [
    { name: 'BANANA C/ AÇÚCAR E CANELA', price: '4,00' },
    { name: 'BANANA C/ CHOCOLATE', price: '5,00' },
    { name: 'BANANA NEVADA', price: '5,00' },
    { name: 'CHOCOLATE', price: '5,00', isPopular: true },
    { name: 'ROMEU E JULIETA', price: '5,00' },
    { name: 'PRESTÍGIO', price: '5,00' },
    { name: 'CONFETE', price: '5,50' },
    { name: 'SENSAÇÃO', price: '6,00' },
  ];
  
  const drinks: MenuItem[] = [
    { name: 'ÁGUA 500ML', price: '3,00' },
    { name: 'COCA LATA', price: '6,00', isPopular: true },
    { name: 'GUARANÁ LATA', price: '6,00' },
    { name: 'FANTA LATA', price: '6,00' },
    { name: 'IT 2L', price: '8,00' },
    { name: 'FANTA 2L', price: '12,00' },
    { name: 'GUARANÁ 2L', price: '12,00' },
    { name: 'COCA-COLA 2L', price: '14,00' },
  ];

  const handleAddToCart = (item: MenuItem, category: 'salty' | 'sweet' | 'drink') => {
    // Convert price from string (e.g. "3,00") to number (e.g. 3.00)
    const priceAsNumber = parseFloat(item.price.replace(',', '.'));
    
    addToCart({
      name: item.name,
      price: priceAsNumber,
      category,
    });
    
    toast({
      title: "Item adicionado",
      description: `${item.name} adicionado ao carrinho`,
      duration: 2000,
    });
  };

  return (
    <section id="cardapio" className="section-padding relative">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Cardápio</h2>
          <div className="mx-auto w-24 h-1 bg-gradient-to-r from-dinapoli-green via-dinapoli-white to-dinapoli-red mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Conheça nosso delicioso cardápio de esfihas salgadas, doces e bebidas. Todos os produtos são feitos com ingredientes selecionados e muito amor.
          </p>
        </div>
        
        <Tabs defaultValue="salty" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger 
              value="salty"
              className="data-[state=active]:bg-dinapoli-red data-[state=active]:text-white"
            >
              Esfihas Salgadas
            </TabsTrigger>
            <TabsTrigger 
              value="sweet"
              className="data-[state=active]:bg-dinapoli-yellow data-[state=active]:text-black"
            >
              Esfihas Doces
            </TabsTrigger>
            <TabsTrigger 
              value="drinks"
              className="data-[state=active]:bg-dinapoli-green data-[state=active]:text-white"
            >
              Bebidas
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="salty" className="mt-0">
            <Card className="bg-black/60 border-gray-800 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {saltyItems.map((item, index) => (
                  <div 
                    key={index}
                    className="flex justify-between items-center p-3 border-b border-gray-800 relative group"
                  >
                    <div className="flex-1">
                      <span className="font-medium">{item.name}</span>
                      <span className="block md:hidden text-dinapoli-yellow font-bold">R$ {item.price}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="hidden md:inline-block text-dinapoli-yellow font-bold mr-4">R$ {item.price}</span>
                      <Button
                        size="icon"
                        className="bg-dinapoli-red hover:bg-dinapoli-red/80 text-white"
                        onClick={() => handleAddToCart(item, 'salty')}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {item.isPopular && (
                      <span className="badge-popular">Mais pedido</span>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="sweet" className="mt-0">
            <Card className="bg-black/60 border-gray-800 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sweetItems.map((item, index) => (
                  <div 
                    key={index}
                    className="flex justify-between items-center p-3 border-b border-gray-800 relative group"
                  >
                    <div className="flex-1">
                      <span className="font-medium">{item.name}</span>
                      <span className="block md:hidden text-dinapoli-yellow font-bold">R$ {item.price}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="hidden md:inline-block text-dinapoli-yellow font-bold mr-4">R$ {item.price}</span>
                      <Button
                        size="icon"
                        className="bg-dinapoli-yellow hover:bg-dinapoli-yellow/80 text-black"
                        onClick={() => handleAddToCart(item, 'sweet')}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {item.isPopular && (
                      <span className="badge-popular">Mais pedido</span>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="drinks" className="mt-0">
            <Card className="bg-black/60 border-gray-800 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {drinks.map((item, index) => (
                  <div 
                    key={index}
                    className="flex justify-between items-center p-3 border-b border-gray-800 relative group"
                  >
                    <div className="flex-1">
                      <span className="font-medium">{item.name}</span>
                      <span className="block md:hidden text-dinapoli-yellow font-bold">R$ {item.price}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="hidden md:inline-block text-dinapoli-yellow font-bold mr-4">R$ {item.price}</span>
                      <Button
                        size="icon"
                        className="bg-dinapoli-green hover:bg-dinapoli-green/80 text-white"
                        onClick={() => handleAddToCart(item, 'drink')}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {item.isPopular && (
                      <span className="badge-popular">Mais pedido</span>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Menu;
