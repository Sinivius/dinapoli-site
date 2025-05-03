
import { ShoppingCart } from 'lucide-react';
import { CartItem as CartItemType } from '@/contexts/CartContext';
import { CartItem } from './CartItem';

interface CartItemsListProps {
  items: CartItemType[];
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
}

export const CartItemsList = ({ 
  items, 
  increaseQuantity, 
  decreaseQuantity, 
  removeFromCart 
}: CartItemsListProps) => {
  return (
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
            <CartItem
              key={item.id}
              item={item}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};
