
interface CartSummaryProps {
  subtotal: number;
}

export const CartSummary = ({ 
  subtotal
}: CartSummaryProps) => {
  return (
    <div className="border-t border-gray-800 p-4">
      <div className="flex justify-between items-center font-bold text-lg mb-4">
        <span>Total</span>
        <span className="text-dinapoli-yellow">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
      </div>
    </div>
  );
};
