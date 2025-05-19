
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="bg-gov-blue py-16 md:py-20 text-white">
      <div className="gov-container">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:pr-8 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              CGENet - Portal de Transparência de Rondônia
            </h1>
            <p className="text-lg md:text-xl mb-6 text-white/90">
              Acesso à informação, transparência e controle social para todos os cidadãos de Rondônia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                className="bg-white text-gov-blue hover:bg-gray-100 font-medium"
              >
                <Link to="/transparencia">Acessar Transparência</Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                <Link to="/servicos">Serviços Disponíveis</Link>
              </Button>
            </div>
          </div>
          <div className="bg-white/95 p-12 rounded-lg shadow-lg">
            <div className="text-gov-blue text-6xl md:text-8xl font-bold">
              CGE-RO
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
