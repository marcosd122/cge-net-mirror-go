
import React from 'react';
import { Monitor } from 'lucide-react';

const WelcomeMessage = () => {
  return (
    <div className="bg-white shadow-md rounded-md p-6 mb-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
        <div className="text-gov-blue flex-shrink-0">
          <Monitor size={64} className="text-gov-blue" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gov-blue mb-2 text-center md:text-left">
            SEJA BEM VINDO AO CGENET
          </h2>
          <p className="text-gray-600">
            O CGENet é o portal que centraliza todas as aplicações Web, com o objetivo de facilitar a interatividade entre os servidores da Controladoria Geral do Estado de Rondônia - CGE/RO e a Administração Pública
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
