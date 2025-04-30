
import { Button } from '@/components/ui/button';

const Promotions = () => {
  // Simulação de promoções da semana
  const promotions = [
    {
      id: 1,
      title: "Segunda do Cliente",
      description: "15% OFF em qualquer pedido toda segunda-feira",
      bgColor: "bg-dinapoli-red",
      validUntil: "Toda segunda-feira",
      code: "SEGUNDA15"
    },
    {
      id: 2,
      title: "Combo Família",
      description: "25 esfihas sortidas + refrigerante 2L por apenas R$ 75",
      bgColor: "bg-dinapoli-yellow",
      textColor: "text-black",
      validUntil: "Válido até 30/05",
      code: "FAMILIA25"
    },
    {
      id: 3,
      title: "Delivery Grátis",
      description: "Para pedidos acima de R$ 50 em um raio de 5km",
      bgColor: "bg-dinapoli-green",
      validUntil: "Válido todos os dias",
      code: "FRETE0"
    }
  ];

  return (
    <section id="promocoes" className="section-padding relative bg-black">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Promoções da Semana</h2>
          <div className="mx-auto w-24 h-1 bg-gradient-to-r from-dinapoli-green via-dinapoli-white to-dinapoli-red mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Confira nossas promoções especiais e economize em seus pedidos. Novas ofertas toda semana!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {promotions.map((promo) => (
            <div 
              key={promo.id} 
              className={`${promo.bgColor} ${promo.textColor || 'text-white'} p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105`}
            >
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-bold mb-2">{promo.title}</h3>
                <p className="text-sm mb-4 opacity-90 flex-grow">{promo.description}</p>
                <div>
                  <div className="mb-4 text-xs font-medium">{promo.validUntil}</div>
                  <div className="flex items-center justify-between">
                    <div className="bg-black/20 rounded px-2 py-1 text-sm font-mono">
                      {promo.code}
                    </div>
                    <a 
                      href={`https://wa.me/13996365529?text=Olá! Gostaria de usar a promoção ${promo.title} (código: ${promo.code})`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Button 
                        size="sm" 
                        className={`
                          ${promo.bgColor === 'bg-dinapoli-yellow' 
                            ? 'bg-black text-white hover:bg-black/80' 
                            : 'bg-white text-black hover:bg-white/90'}
                        `}
                      >
                        Aproveitar
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotions;
