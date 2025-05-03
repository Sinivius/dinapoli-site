
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/contexts/CartContext';
import { Send } from 'lucide-react';

const OrderForm = () => {
  const { items, getTotalPrice } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [complement, setComplement] = useState('');
  const [reference, setReference] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [change, setChange] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');

  const formatMessage = () => {
    // Format cart items
    const itemsList = items.map(
      (item) => `- ${item.quantity}x ${item.name} – R$${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    // Calculate total
    const total = getTotalPrice().toFixed(2);
    
    // Prepare change info if needed
    const changeInfo = paymentMethod === 'Dinheiro' && change 
      ? `(troco para R$${change})` 
      : '';
    
    // Build the message
    const message = `Olá, gostaria de confirmar meu pedido com a Dinapoli 🍕🥟

🧾 *Resumo do Pedido:*
${itemsList}

📦 *Total:* R$${total}

👤 *Dados para entrega:*
Nome: ${name}  
Telefone: ${phone}  
Endereço: ${address}  
${complement ? `Complemento: ${complement}  \n` : ''}${reference ? `Referência: ${reference}  \n` : ''}
🕐 ${deliveryTime ? `Horário desejado para entrega: ${deliveryTime}  \n` : ''}
💳 Pagamento na entrega: ${paymentMethod} ${changeInfo}

Aguardo a confirmação! 🙏`;

    return encodeURIComponent(message);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = formatMessage();
    window.open(`https://wa.me/13996365529?text=${message}`, '_blank');
  };
  
  return (
    <div className="bg-black/80 p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-white font-display">Complete seu pedido</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-white mb-1">Nome:</label>
          <Input 
            id="name" 
            placeholder="Seu nome completo" 
            className="bg-black/50 text-white border-dinapoli-green"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-white mb-1">Telefone:</label>
          <Input 
            id="phone" 
            placeholder="(13) 90000-0000" 
            className="bg-black/50 text-white border-dinapoli-green"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="address" className="block text-white mb-1">Endereço completo:</label>
          <Input 
            id="address" 
            placeholder="Rua, número, bairro" 
            className="bg-black/50 text-white border-dinapoli-green"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="complement" className="block text-white mb-1">Complemento:</label>
            <Input 
              id="complement" 
              placeholder="Apto, bloco, etc." 
              className="bg-black/50 text-white border-dinapoli-green"
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="reference" className="block text-white mb-1">Ponto de referência:</label>
            <Input 
              id="reference" 
              placeholder="Próximo à..." 
              className="bg-black/50 text-white border-dinapoli-green"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="deliveryTime" className="block text-white mb-1">Horário de entrega:</label>
            <Input 
              id="deliveryTime" 
              placeholder="Ex: 20:00" 
              className="bg-black/50 text-white border-dinapoli-green"
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="payment" className="block text-white mb-1">Forma de pagamento:</label>
            <select 
              id="payment"
              className="flex h-10 w-full rounded-md border bg-black/50 text-white border-dinapoli-green px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option value="">Selecione</option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="PIX">PIX</option>
              <option value="Cartão">Cartão</option>
            </select>
          </div>
        </div>
        
        {paymentMethod === 'Dinheiro' && (
          <div>
            <label htmlFor="change" className="block text-white mb-1">Troco para:</label>
            <Input 
              id="change" 
              placeholder="R$ 0,00" 
              className="bg-black/50 text-white border-dinapoli-green"
              value={change}
              onChange={(e) => setChange(e.target.value)}
            />
          </div>
        )}
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-dinapoli-green via-dinapoli-white to-dinapoli-red hover:opacity-90 text-black font-bold py-3"
        >
          <Send className="mr-2 h-5 w-5" /> Enviar pedido via WhatsApp
        </Button>
      </form>
    </div>
  );
};

export default OrderForm;
