
import { Button } from '@/components/ui/button';
import { DrawerClose } from '@/components/ui/drawer';

interface CartActionsProps {
  onProceedToCheckout: () => void;
  isCartEmpty: boolean;
}

export const CartActions = ({ onProceedToCheckout, isCartEmpty }: CartActionsProps) => {
  return (
    <div className="p-4 pt-0">
      <Button
        className="w-full bg-dinapoli-green hover:bg-dinapoli-green/90 text-white"
        onClick={onProceedToCheckout}
        disabled={isCartEmpty}
      >
        Continuar para Entrega
      </Button>
      
      <DrawerClose asChild>
        <Button 
          variant="outline" 
          className="w-full mt-2 border-gray-700 text-gray-300 hover:bg-gray-900 hover:text-white"
        >
          Continuar Comprando
        </Button>
      </DrawerClose>
    </div>
  );
};
