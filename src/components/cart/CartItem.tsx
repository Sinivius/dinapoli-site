
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
}

export const CartItem = ({ 
  item, 
  increaseQuantity, 
  decreaseQuantity, 
  removeFromCart 
}: CartItemProps) => {
  return (
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
  );
};
