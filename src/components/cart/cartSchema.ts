
import { z } from 'zod';

export const customerSchema = z.object({
  name: z.string().min(3, { message: 'Nome é obrigatório' }),
  phone: z.string().min(10, { message: 'Telefone inválido' }),
  address: z.string().min(5, { message: 'Endereço é obrigatório' }),
  complement: z.string().optional(),
  reference: z.string().optional(),
  paymentMethod: z.string().min(1, { message: 'Selecione um método de pagamento' }),
  changeFor: z.string().optional(),
});

export type CustomerData = z.infer<typeof customerSchema>;
