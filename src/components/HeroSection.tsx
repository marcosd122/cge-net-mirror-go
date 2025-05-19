
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="bg-gov-blue py-12 md:py-24 text-white">
      <div className="gov-container">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex-1 md:pr-8 mb-8 md:mb-0">
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
          <div className="flex-1 flex justify-center">
            <div className="rounded-lg overflow-hidden shadow-xl bg-white p-4">
              <img 
                src="https://placehold.co/600x400/e6f2ff/0057b7?text=CGE-RO" 
                alt="CGE Rondônia" 
                className="w-full h-auto rounded" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
