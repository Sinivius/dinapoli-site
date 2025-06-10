
import { useState } from 'react';
import { ShoppingCart, Send } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { useToast } from '@/hooks/use-toast';
import { CustomerData } from './cart/cartSchema';
import { CartItemsList } from './cart/CartItemsList';
import { CartSummary } from './cart/CartSummary';
import { CartActions } from './cart/CartActions';
import { CheckoutForm } from './cart/CheckoutForm';

const PAYMENT_METHODS = ['Dinheiro', 'PIX', 'Cartão de Crédito', 'Cartão de Débito'];

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<'cart' | 'checkout'>('cart');
  const { items, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, getTotalItems, getTotalPrice } = useCart();
  const { toast } = useToast();
  
  const totalItems = getTotalItems();
  const subtotal = getTotalPrice();

  const handleProceedToCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione itens ao carrinho antes de continuar.",
        variant: "destructive"
      });
      return;
    }
    
    // Close the drawer
    setIsOpen(false);
    
    // Scroll to order section
    const orderSection = document.getElementById('order');
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBackToCart = () => {
    setCurrentStep('cart');
  };

  const handleSendOrder = (data: CustomerData) => {
    if (items.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione itens ao carrinho antes de enviar o pedido.",
        variant: "destructive"
      });
      return;
    }

    // Format order message
    let message = "Olá, gostaria de confirmar meu pedido com a Dinapoli 🍕🥟\n\n";
    
    // Group items by category
    const categorizedItems = {
      salty: items.filter(item => item.category === 'salty'),
      sweet: items.filter(item => item.category === 'sweet'),
      drink: items.filter(item => item.category === 'drink')
    };
    
    message += "🧾 *Resumo do Pedido:*\n";
    
    // Add all items
    items.forEach(item => {
      message += `- ${item.quantity}x ${item.name}: R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
    });
    
    // Add total (without delivery fee)
    message += `\n📦 *Total:* R$ ${subtotal.toFixed(2).replace('.', ',')}\n\n`;
    
    // Add customer data
    message += "👤 *Dados para entrega:*\n";
    message += `Nome: ${data.name}\n`;
    message += `Telefone: ${data.phone}\n`;
    message += `Endereço: ${data.address}\n`;
    if (data.complement) message += `Complemento: ${data.complement}\n`;
    if (data.reference) message += `Referência: ${data.reference}\n\n`;
    
    // Add payment info
    message += `💳 Pagamento na entrega: ${data.paymentMethod}`;
    if (data.paymentMethod.toLowerCase() === 'dinheiro' && data.changeFor) {
      message += ` (troco para R$ ${data.changeFor})`;
    }
    
    message += "\n\nAguardo a confirmação e o cálculo da taxa de entrega! 🙏";
    
    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with the order
    window.open(`https://wa.me/13996365529?text=${encodedMessage}`, '_blank');
    
    // Close drawer and clear cart
    setIsOpen(false);
    clearCart();
    setCurrentStep('cart');
    
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
          <DrawerTitle className="text-xl font-bold text-center">
            {currentStep === 'cart' ? 'Seu Pedido' : 'Dados para Entrega'}
          </DrawerTitle>
        </DrawerHeader>
        
        {currentStep === 'cart' ? (
          <>
            <CartItemsList 
              items={items}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
            />
            
            {items.length > 0 && (
              <CartSummary 
                subtotal={subtotal}
              />
            )}
            
            <DrawerFooter>
              <CartActions 
                onProceedToCheckout={handleProceedToCheckout} 
                isCartEmpty={items.length === 0} 
              />
            </DrawerFooter>
          </>
        ) : (
          <CheckoutForm 
            onSubmit={handleSendOrder}
            onBackToCart={handleBackToCart}
            totalWithDelivery={subtotal}
            paymentMethods={PAYMENT_METHODS}
          />
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default Cart;
