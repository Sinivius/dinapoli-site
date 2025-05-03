
interface CartSummaryProps {
  subtotal: number;
  deliveryFee: number;
  totalWithDelivery: number;
}

export const CartSummary = ({ 
  subtotal, 
  deliveryFee, 
  totalWithDelivery 
}: CartSummaryProps) => {
  return (
    <div className="border-t border-gray-800 p-4">
      <div className="flex justify-between items-center mb-2">
        <span>Subtotal</span>
        <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span>Taxa de entrega</span>
        <span>R$ {deliveryFee.toFixed(2).replace('.', ',')}</span>
      </div>
      <div className="flex justify-between items-center font-bold text-lg mb-4">
        <span>Total</span>
        <span className="text-dinapoli-yellow">R$ {totalWithDelivery.toFixed(2).replace('.', ',')}</span>
      </div>
    </div>
  );
};
