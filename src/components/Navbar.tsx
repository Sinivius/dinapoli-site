
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState<string>('inicio');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      const sections = document.querySelectorAll('section[id]');

      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });

      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-black/90 shadow-lg backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/fa1111b9-d9ee-4aa8-a830-782d732a3cf6.png" 
              alt="Dinapoli Esfiharia e Pizzaria" 
              className="h-12 md:h-16"
            />
          </div>

          {/* Desktop menu */}
          <nav className="hidden md:flex space-x-8">
            <a href="#inicio" onClick={(e) => handleLinkClick(e, 'inicio')} className={`menu-item ${activeSection === 'inicio' ? 'active' : ''}`}>
              Início
            </a>
            <a href="#cardapio" onClick={(e) => handleLinkClick(e, 'cardapio')} className={`menu-item ${activeSection === 'cardapio' ? 'active' : ''}`}>
              Cardápio
            </a>
            <a href="#combos" onClick={(e) => handleLinkClick(e, 'combos')} className={`menu-item ${activeSection === 'combos' ? 'active' : ''}`}>
              Combos
            </a>
            <a href="#contato" onClick={(e) => handleLinkClick(e, 'contato')} className={`menu-item ${activeSection === 'contato' ? 'active' : ''}`}>
              Contato
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              aria-label="Menu"
              className="p-2 text-dinapoli-white"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 bg-black/90 backdrop-blur-sm">
            <nav className="flex flex-col space-y-3">
              <a href="#inicio" onClick={(e) => handleLinkClick(e, 'inicio')} className={`menu-item px-4 py-2 ${activeSection === 'inicio' ? 'active' : ''}`}>
                Início
              </a>
              <a href="#cardapio" onClick={(e) => handleLinkClick(e, 'cardapio')} className={`menu-item px-4 py-2 ${activeSection === 'cardapio' ? 'active' : ''}`}>
                Cardápio
              </a>
              <a href="#combos" onClick={(e) => handleLinkClick(e, 'combos')} className={`menu-item px-4 py-2 ${activeSection === 'combos' ? 'active' : ''}`}>
                Combos
              </a>
              <a href="#contato" onClick={(e) => handleLinkClick(e, 'contato')} className={`menu-item px-4 py-2 ${activeSection === 'contato' ? 'active' : ''}`}>
                Contato
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
