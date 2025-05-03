
import { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const customerSchema = z.object({
  name: z.string().min(3, { message: 'Nome é obrigatório' }),
  phone: z.string().min(10, { message: 'Telefone inválido' }),
  address: z.string().min(5, { message: 'Endereço é obrigatório' }),
  complement: z.string().optional(),
  reference: z.string().optional(),
  paymentMethod: z.string().min(1, { message: 'Selecione um método de pagamento' }),
  changeFor: z.string().optional(),
});

type CustomerData = z.infer<typeof customerSchema>;

const DELIVERY_FEE = 5.00; // Taxa fixa de entrega, poderia ser calculada por bairro

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<'cart' | 'checkout'>('cart');
  const { items, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, getTotalItems, getTotalPrice } = useCart();
  const { toast } = useToast();
  
  const totalItems = getTotalItems();
  const subtotal = getTotalPrice();
  const totalWithDelivery = subtotal + DELIVERY_FEE;

  const form = useForm<CustomerData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      complement: '',
      reference: '',
      paymentMethod: '',
      changeFor: '',
    }
  });

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
    
    // Add delivery and total
    message += `\n🚚 *Taxa de Entrega:* R$ ${DELIVERY_FEE.toFixed(2).replace('.', ',')}\n`;
    message += `📦 *Total (com entrega):* R$ ${totalWithDelivery.toFixed(2).replace('.', ',')}\n\n`;
    
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
    
    message += "\n\nAguardo a confirmação! 🙏";
    
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
    
    // Reset form
    form.reset();
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
              <div className="flex justify-between items-center mb-2">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>Taxa de entrega</span>
                <span>R$ {DELIVERY_FEE.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between items-center font-bold text-lg mb-4">
                <span>Total</span>
                <span className="text-dinapoli-yellow">R$ {totalWithDelivery.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
            
            <DrawerFooter className="p-4 pt-0">
              <Button
                className="w-full bg-dinapoli-green hover:bg-dinapoli-green/90 text-white"
                onClick={handleProceedToCheckout}
                disabled={items.length === 0}
              >
                Continuar para Entrega
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
          </>
        ) : (
          <div className="px-4 pb-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSendOrder)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Nome</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Seu nome completo" 
                          {...field}
                          className="bg-gray-900 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Telefone</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="(13) 99999-9999" 
                          {...field}
                          className="bg-gray-900 border-gray-700 text-white" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Endereço</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Rua, número, bairro" 
                          {...field} 
                          className="bg-gray-900 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="complement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Complemento (opcional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Apartamento, bloco, etc." 
                          {...field} 
                          className="bg-gray-900 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="reference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Ponto de referência (opcional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Próximo à..." 
                          {...field} 
                          className="bg-gray-900 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Forma de pagamento</FormLabel>
                      <FormControl>
                        <select 
                          {...field}
                          className="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white"
                        >
                          <option value="">Selecione...</option>
                          <option value="Dinheiro">Dinheiro</option>
                          <option value="PIX">PIX</option>
                          <option value="Cartão de Crédito">Cartão de Crédito</option>
                          <option value="Cartão de Débito">Cartão de Débito</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {form.watch('paymentMethod') === 'Dinheiro' && (
                  <FormField
                    control={form.control}
                    name="changeFor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Troco para quanto?</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Valor para troco" 
                            {...field} 
                            className="bg-gray-900 border-gray-700 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                <div className="border-t border-gray-800 pt-4 mt-6">
                  <div className="flex justify-between items-center font-bold text-lg mb-4">
                    <span>Total com entrega</span>
                    <span className="text-dinapoli-yellow">R$ {totalWithDelivery.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3 pt-2">
                  <Button 
                    type="submit"
                    className="w-full bg-dinapoli-green hover:bg-dinapoli-green/90 text-white"
                  >
                    Enviar Pedido via WhatsApp
                  </Button>
                  
                  <Button 
                    type="button"
                    variant="outline" 
                    className="w-full border-gray-700 text-gray-300 hover:bg-gray-900 hover:text-white"
                    onClick={handleBackToCart}
                  >
                    Voltar ao Carrinho
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default Cart;
