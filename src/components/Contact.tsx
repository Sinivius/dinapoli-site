import { Map, MapPin, Clock, Phone, Instagram } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contato" className="section-padding relative bg-black">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-display">Entre em Contato</h2>
          <div className="mx-auto w-24 h-1 bg-gradient-to-r from-dinapoli-green via-dinapoli-white to-dinapoli-red mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Estamos à disposição para atender você. Entre em contato conosco ou visite nossa loja física.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div>
            <div className="bg-dinapoli-black/60 border border-gray-800 rounded-lg p-6 space-y-6">
              <div className="flex items-start">
                <div className="bg-dinapoli-red/20 p-3 rounded-lg mr-4">
                  <MapPin className="w-6 h-6 text-dinapoli-red" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Endereço</h3>
                  <p className="text-gray-300">
                    Av. Darcy Fonseca, nº 1156 - Jd dos Prados
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-dinapoli-yellow/20 p-3 rounded-lg mr-4">
                  <Clock className="w-6 h-6 text-dinapoli-yellow" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Horário de Funcionamento</h3>
                  <p className="text-gray-300">
                    Terça a Domingo - 18h30 às 00h
                  </p>
                  <p className="text-gray-400 text-sm">
                    Fechado às segundas-feiras
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-dinapoli-green/20 p-3 rounded-lg mr-4">
                  <Phone className="w-6 h-6 text-dinapoli-green" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">WhatsApp</h3>
                  <p className="text-gray-300">
                    <a 
                      href="https://wa.me/13996365529" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-dinapoli-green transition-colors"
                    >
                      (13) 99636-5529
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-500/20 p-3 rounded-lg mr-4">
                  <Instagram className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Instagram</h3>
                  <p className="text-gray-300">
                    <a 
                      href="https://instagram.com/dinapoliesfiharia" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-purple-500 transition-colors"
                    >
                      @dinapoliesfiharia
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="h-80 md:h-96 rounded-lg overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3645.4813018161786!2d-46.31527092491526!3d-23.969265878981463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce1c2ba8fa6e35%3A0x8ba876de2ddf7eb2!2sAv.%20Darcy%20Fonseca%2C%201156%20-%20Jardim%20Dos%20Prados%2C%20Peruibe%20-%20SP%2C%2011750-000!5e0!3m2!1sen!2sbr!4v1724945922350!5m2!1sen!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da Dinapoli Esfiharia e Pizzaria"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
