
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { customerSchema, CustomerData } from './cartSchema';

interface CheckoutFormProps {
  onSubmit: (data: CustomerData) => void;
  onBackToCart: () => void;
  totalWithDelivery: number;
  paymentMethods: string[];
}

export const CheckoutForm = ({
  onSubmit,
  onBackToCart,
  totalWithDelivery,
  paymentMethods
}: CheckoutFormProps) => {
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
  
  return (
    <div className="px-4 pb-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    {paymentMethods.map(method => (
                      <option key={method} value={method}>{method}</option>
                    ))}
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
              <span>Total sem Taxa de Entrega</span>
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
              onClick={onBackToCart}
            >
              Voltar ao Carrinho
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
