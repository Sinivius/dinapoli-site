
import { Card } from '@/components/ui/card';

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatarUrl: string;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Carlos Silva",
      rating: 5,
      comment: "As esfihas são incríveis! Massa super macia e recheio generoso. Não tem como pedir só uma. O atendimento é excelente e a entrega sempre rápida.",
      date: "15/04/2023",
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      name: "Ana Costa",
      rating: 5,
      comment: "Melhor esfiharia da região! Peço toda semana e nunca me decepcionou. O combo família é excelente custo-benefício. Super recomendo!",
      date: "22/03/2023",
      avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 3,
      name: "Roberto Almeida",
      rating: 4,
      comment: "As esfihas de frango com catupiry são simplesmente divinas! Peço sempre pelo WhatsApp e chega rapidinho. Só faltou a 5ª estrela porque às vezes a entrega atrasa um pouco.",
      date: "05/04/2023",
      avatarUrl: "https://randomuser.me/api/portraits/men/67.jpg"
    }
  ];

  return (
    <section id="avaliacoes" className="section-padding relative">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Avaliações dos Clientes</h2>
          <div className="mx-auto w-24 h-1 bg-gradient-to-r from-dinapoli-green via-dinapoli-white to-dinapoli-red mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Veja o que nossos clientes estão dizendo sobre a Dinapoli Esfiharia e Pizzaria.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-black border-gray-800 p-6 hover:border-dinapoli-red transition-colors duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-dinapoli-red">
                  <img
                    src={testimonial.avatarUrl}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating ? 'text-dinapoli-yellow' : 'text-gray-600'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 mb-3 text-sm italic">"{testimonial.comment}"</p>
              
              <p className="text-gray-500 text-xs text-right">{testimonial.date}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
