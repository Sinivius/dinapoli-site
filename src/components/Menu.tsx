
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
  description?: string;
  isPopular?: boolean;
};

const Menu = () => {
  const [activeTab, setActiveTab] = useState('salty');
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const saltyItems: MenuItem[] = [
    { name: 'REQUEIJÃO', price: '3,00' },
    { name: 'CARNE', price: '3,50' },
    { name: 'QUEIJO', price: '3,50', isPopular: true },
    { name: 'CALABRESA', price: '3,50', isPopular: true },
    { name: 'PIZZA', price: '4,00' },
    { name: 'FRANGO', price: '4,00' },
    { name: 'BACON', price: '4,50' },
    { name: 'BAURU', price: '4,50' },
    { name: 'ATUM', price: '4,50' },
    { name: 'DOIS QUEIJOS', price: '4,50' },
    { name: 'ALHO', price: '4,50' },
    { name: 'CALAMUSSA', price: '4,50' },
    { name: 'CARNE/QUEIJO', price: '4,50' },
    { name: 'CALABRESA/REQUEIJÃO', price: '4,50' },
    { name: 'CALABRESA/CATUPIRY', price: '6,00' },
    { name: 'BAIANA', price: '4,50' },
    { name: 'FRANGO/REQUEIJÃO', price: '5,00' },
    { name: 'FRANGO/CATUPIRY', price: '6,50', isPopular: true },
    { name: 'FRANGO/QUEIJO', price: '5,50' },
    { name: 'PALMITO/QUEIJO', price: '5,50' },
    { name: 'MILHO/QUEIJO', price: '5,50' },
    { name: 'QUATRO QUEIJOS/REQUEIJÃO', price: '5,50' },
    { name: 'QUATRO QUEIJOS/CATUPIRY', price: '6,50' },
    { name: 'ATUM/QUEIJO', price: '5,50' },
    { name: 'BRÓCOLIS/QUEIJO/BACON', price: '6,50' },
    { name: 'BRÓCOLIS/REQUEIJÃO/BACON', price: '6,50' },
    { name: 'BRÓCOLIS/CATUPIRY/BACON', price: '7,00' },
    { name: 'BAIANA/QUEIJO', price: '6,00' },
    { name: 'PRESUNTO/FRANGO/QUEIJO', price: '6,50' },
    { name: 'PRESUNTO/FRANGO/REQUEIJÃO', price: '6,50' },
    { name: 'PRESUNTO/FRANGO/CATUPIRY', price: '7,50' },
    { name: 'CAIPIRA', price: '7,50', description: 'milho, frango, queijo, bacon, requeijão' },
  ];
  
  const sweetItems: MenuItem[] = [
    { name: 'BANANA C/ AÇÚCAR E CANELA', price: '4,00' },
    { name: 'BANANA C/ CHOCOLATE', price: '5,50' },
    { name: 'BANANA NEVADA', price: '5,50' },
    { name: 'CHOCOLATE', price: '5,50', isPopular: true },
    { name: 'ROMEU E JULIETA', price: '5,50' },
    { name: 'PRESTÍGIO', price: '5,50' },
    { name: 'CHOCOLATE E PAÇOCA', price: '5,50' },
    { name: 'CONFETE', price: '6,00' },
  ];

  const pizzas: MenuItem[] = [
    { name: 'CALABRESA', price: '35,00', description: 'Calabresa acebolada' },
    { name: 'DOIS QUEIJOS', price: '35,00', description: 'Mussarela e requeijão' },
    { name: 'CALACATU', price: '36,00', description: 'Calabresa e requeijão' },
    { name: 'NAPOLITANA', price: '36,00', description: 'Mussarela, tomate e parmesão' },
    { name: 'MUSSARELA', price: '38,00', description: 'Mussarela e tomate' },
    { name: 'BAIANA', price: '38,00', description: 'Calabresa ralada, pimenta calabresa, cebola e ovo' },
    { name: 'CALAMUSSA', price: '40,00', description: 'Calabresa e mussarela' },
    { name: 'BAURU', price: '40,00', description: 'Mussarela, presunto e tomate' },
    { name: 'FRANGO C/ CATUPIRY', price: '40,00', description: 'Frango e requeijão', isPopular: true },
    { name: 'BACON', price: '40,00', description: 'Bacon, mussarela e cebola' },
    { name: 'ALHO', price: '40,00', description: 'Mussarela e alho' },
    { name: 'ATUM', price: '40,00', description: 'Atum, cebola e molho de tomate' },
    { name: 'MILHO', price: '40,00', description: 'Milho com mussarela' },
    { name: 'QUATRO QUEIJOS', price: '42,00', description: 'Mussarela, requeijão, parmesão e provolone' },
    { name: 'TOSCANA', price: '42,00', description: 'Calabresa moída com mussarela' },
    { name: 'BAIANA C/ MUSSARELA', price: '42,00', description: 'Calabresa ralada, pimenta calabresa, cebola e mussarela' },
    { name: 'FRANGO C/ MUSSARELA', price: '42,00', description: 'Frango e mussarela' },
    { name: 'PORTUGUESA', price: '45,00', description: 'Presunto, ovos, ervilha, cebola e mussarela', isPopular: true },
    { name: 'PALMITO', price: '45,00', description: 'Mussarela e palmito' },
    { name: 'MILHO C/ CATUPIRY', price: '45,00', description: 'Milho, mussarela e requeijão' },
    { name: 'PERUANA', price: '45,00', description: 'Atum e mussarela' },
    { name: 'BRÓCOLIS', price: '48,00', description: 'Brócolis, mussarela e bacon' },
    { name: 'CAIPIRA', price: '48,00', description: 'Frango, milho, mussarela e bacon' },
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

  const handleAddToCart = (item: MenuItem, category: 'salty' | 'sweet' | 'pizza' | 'drink') => {
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

  const handleScrollToOrder = () => {
    const orderSection = document.getElementById('order');
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderMenuItems = (items: MenuItem[], category: 'salty' | 'sweet' | 'pizza' | 'drink', buttonColor: string) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item, index) => (
        <div 
          key={index}
          className="flex justify-between items-center p-3 border-b border-gray-800 relative group"
        >
          <div className="flex-1">
            <span className="font-medium">{item.name}</span>
            {item.description && (
              <span className="block text-sm text-gray-400">{item.description}</span>
            )}
            <span className="block md:hidden text-dinapoli-yellow font-bold">R$ {item.price}</span>
          </div>
          <div className="flex items-center">
            <span className="hidden md:inline-block text-dinapoli-yellow font-bold mr-4">R$ {item.price}</span>
            <Button
              size="icon"
              className={`${buttonColor} text-white`}
              onClick={() => handleAddToCart(item, category)}
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
  );

  return (
    <section id="cardapio" className="section-padding relative">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4 font-display">Cardápio</h2>
          <div className="mx-auto w-24 h-1 bg-gradient-to-r from-dinapoli-green via-dinapoli-white to-dinapoli-red mb-6"></div>
        </div>
        
        <Tabs defaultValue="salty" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger 
              value="salty"
              className="data-[state=active]:bg-dinapoli-red data-[state=active]:text-white text-base md:text-lg"
            >
              Esfihas
            </TabsTrigger>
            <TabsTrigger 
              value="sweet"
              className="data-[state=active]:bg-dinapoli-yellow data-[state=active]:text-black text-base md:text-lg"
            >
              <span className="hidden md:inline">Esfihas Doces</span>
              <span className="md:hidden">Doces</span>
            </TabsTrigger>
            <TabsTrigger 
              value="pizzas"
              className="data-[state=active]:bg-dinapoli-green data-[state=active]:text-white text-base md:text-lg"
            >
              Pizzas
            </TabsTrigger>
            <TabsTrigger 
              value="drinks"
              className="data-[state=active]:bg-dinapoli-red data-[state=active]:text-white text-base md:text-lg"
            >
              Bebidas
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="salty" className="mt-0">
            <Card className="bg-black/60 border-gray-800 p-6">
              {renderMenuItems(saltyItems, 'salty', 'bg-dinapoli-red hover:bg-dinapoli-red/80')}
            </Card>
          </TabsContent>
          
          <TabsContent value="sweet" className="mt-0">
            <Card className="bg-black/60 border-gray-800 p-6">
              {renderMenuItems(sweetItems, 'sweet', 'bg-dinapoli-yellow hover:bg-dinapoli-yellow/80')}
            </Card>
          </TabsContent>

          <TabsContent value="pizzas" className="mt-0">
            <Card className="bg-black/60 border-gray-800 p-6">
              {renderMenuItems(pizzas, 'pizza', 'bg-dinapoli-green hover:bg-dinapoli-green/80')}
            </Card>
          </TabsContent>
          
          <TabsContent value="drinks" className="mt-0">
            <Card className="bg-black/60 border-gray-800 p-6">
              {renderMenuItems(drinks, 'drink', 'bg-dinapoli-red hover:bg-dinapoli-red/80')}
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center mt-10">
          <Button 
            onClick={handleScrollToOrder} 
            className="bg-dinapoli-red hover:bg-dinapoli-red/90 text-white px-8 py-6 text-xl"
          >
            Finalizar Pedido
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Menu;
