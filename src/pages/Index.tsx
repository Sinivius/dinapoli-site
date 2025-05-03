
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Menu from '@/components/Menu';
import Combos from '@/components/Combos';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsappButton from '@/components/WhatsappButton';
import Cart from '@/components/Cart';
import OrderForm from '@/components/OrderForm';
import { useToast } from '@/hooks/use-toast';
import { CartProvider } from '@/contexts/CartContext';

const Index = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mostrar uma mensagem de boas-vindas depois de carregar
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Bem-vindo à Dinapoli!",
        description: "Peça suas esfihas favoritas.",
        duration: 3000,
      });
    }, 1000);
  }, [toast]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-black">
        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-dinapoli-green via-dinapoli-white to-dinapoli-red p-1 animate-pulse">
          <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center p-3">
            <img 
              src="/lovable-uploads/fa1111b9-d9ee-4aa8-a830-782d732a3cf6.png" 
              alt="Dinapoli Logo" 
              className="w-full h-auto"
            />
          </div>
        </div>
        <p className="mt-6 text-dinapoli-white text-lg">Carregando...</p>
      </div>
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-black">
        <Navbar />
        <Hero />
        <Menu />
        <Combos />
        <section id="order" className="section-padding relative">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-5xl md:text-6xl font-bold mb-4 font-display">Peça Agora</h2>
              <div className="mx-auto w-24 h-1 bg-gradient-to-r from-dinapoli-green via-dinapoli-white to-dinapoli-red mb-6"></div>
            </div>
            <OrderForm />
          </div>
        </section>
        <Contact />
        <Footer />
        <WhatsappButton />
        <Cart />
      </div>
    </CartProvider>
  );
};

export default Index;
