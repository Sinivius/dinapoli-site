
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Menu from '@/components/Menu';
import Combos from '@/components/Combos';
import Promotions from '@/components/Promotions';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsappButton from '@/components/WhatsappButton';
import Cart from '@/components/Cart';
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
        description: "Esfihas feitas com muito sabor e tradição.",
        duration: 5000,
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
        <About />
        <Menu />
        <Combos />
        <Promotions />
        <Testimonials />
        <Contact />
        <Footer />
        <WhatsappButton />
        <Cart />
      </div>
    </CartProvider>
  );
};

export default Index;
