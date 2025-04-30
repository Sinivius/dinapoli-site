
import { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { useToast } from '@/hooks/use-toast';

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, getTotalItems, getTotalPrice } = useCart();
  const { toast } = useToast();
  
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const handleSendOrder = () => {
    if (items.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione itens ao carrinho antes de enviar o pedido.",
        variant: "destructive"
      });
      return;
    }

    // Format order message
    let message = "Olá! Gostaria de fazer o seguinte pedido:\n\n";
    
    // Group items by category
    const categorizedItems = {
      salty: items.filter(item => item.category === 'salty'),
      sweet: items.filter(item => item.category === 'sweet'),
      drink: items.filter(item => item.category === 'drink')
    };
    
    // Add salty items
    if (categorizedItems.salty.length > 0) {
      message += "🥟 *ESFIHAS SALGADAS*:\n";
      categorizedItems.salty.forEach(item => {
        message += `- ${item.quantity}x ${item.name}: R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
      });
      message += "\n";
    }
    
    // Add sweet items
    if (categorizedItems.sweet.length > 0) {
      message += "🍫 *ESFIHAS DOCES*:\n";
      categorizedItems.sweet.forEach(item => {
        message += `- ${item.quantity}x ${item.name}: R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
      });
      message += "\n";
    }
    
    // Add drinks
    if (categorizedItems.drink.length > 0) {
      message += "🥤 *BEBIDAS*:\n";
      categorizedItems.drink.forEach(item => {
        message += `- ${item.quantity}x ${item.name}: R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
      });
      message += "\n";
    }
    
    // Add total
    message += `\n💰 *TOTAL: R$ ${totalPrice.toFixed(2).replace('.', ',')}*\n\n`;
    message += "Aguardo confirmação! 😊";
    
    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with the order
    window.open(`https://wa.me/13996365529?text=${encodedMessage}`, '_blank');
    
    // Close drawer and clear cart
    setIsOpen(false);
    clearCart();
    
    // Show success message
    toast({
      title: "Pedido enviado!",
      description: "Seu pedido foi enviado para o WhatsApp da Dinapoli.",
    });
  };
  
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button 
          className="fixed bottom-20 right-6 z-40 bg-dinapoli-yellow p-3 rounded-full shadow-lg"
          aria-label="Abrir carrinho"
        >
          <ShoppingCart className="h-6 w-6 text-black" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-dinapoli-red text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </DrawerTrigger>
      <DrawerContent className="bg-black text-white border-t border-gray-800">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-bold text-center">Seu Pedido</DrawerTitle>
        </DrawerHeader>
        
        <div className="px-4 pb-4 overflow-y-auto max-h-[60vh]">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 mx-auto text-gray-500 mb-2" />
              <p className="text-gray-400">Seu carrinho está vazio.</p>
              <p className="text-gray-500 text-sm">Adicione itens do cardápio para realizar seu pedido.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b border-gray-800 pb-3">
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-dinapoli-yellow">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => decreaseQuantity(item.id)}
                      className="p-1 rounded-full hover:bg-gray-800 transition-colors"
                      aria-label="Diminuir quantidade"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    
                    <span className="w-6 text-center">{item.quantity}</span>
                    
                    <button 
                      onClick={() => increaseQuantity(item.id)}
                      className="p-1 rounded-full hover:bg-gray-800 transition-colors"
                      aria-label="Aumentar quantidade"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 rounded-full hover:bg-dinapoli-red/20 text-dinapoli-red transition-colors"
                      aria-label="Remover item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="border-t border-gray-800 p-4">
          <div className="flex justify-between items-center font-bold text-lg mb-4">
            <span>Total</span>
            <span className="text-dinapoli-yellow">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>
        
        <DrawerFooter className="p-4 pt-0">
          <Button
            className="w-full bg-dinapoli-green hover:bg-dinapoli-green/90 text-white"
            onClick={handleSendOrder}
            disabled={items.length === 0}
          >
            Enviar Pedido via WhatsApp
          </Button>
          
          <DrawerClose asChild>
            <Button 
              variant="outline" 
              className="w-full border-gray-700 text-gray-300 hover:bg-gray-900 hover:text-white"
            >
              Continuar Comprando
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Cart;
