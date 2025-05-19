
import React from 'react';
import ServiceCard from './ServiceCard';
import { FileText, Search, FileBarChart, Lock, Users, BookOpen } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      title: 'Documentos',
      description: 'Acesse, envie e gerencie documentos oficiais',
      icon: <FileText size={48} />,
      link: '/documentos',
      linkText: 'Acessar Documentos'
    },
    {
      title: 'Consultas',
      description: 'Realize consultas em bases de dados públicas',
      icon: <Search size={48} />,
      link: '/consultas',
      linkText: 'Realizar Consulta'
    },
    {
      title: 'Relatórios',
      description: 'Visualize e baixe relatórios de transparência',
      icon: <FileBarChart size={48} />,
      link: '/relatorios',
      linkText: 'Ver Relatórios'
    },
    {
      title: 'Área Restrita',
      description: 'Acesso seguro para servidores autorizados',
      icon: <Lock size={48} />,
      link: '/login',
      linkText: 'Fazer Login'
    },
    {
      title: 'Ouvidoria',
      description: 'Envie sugestões, reclamações e elogios',
      icon: <Users size={48} />,
      link: '/ouvidoria',
      linkText: 'Acessar Ouvidoria'
    },
    {
      title: 'Legislação',
      description: 'Consulte leis e normas sobre transparência',
      icon: <BookOpen size={48} />,
      link: '/legislacao',
      linkText: 'Ver Legislação'
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="gov-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gov-blue-dark mb-4">Nossos Serviços</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            O CGENet oferece uma série de serviços para facilitar o acesso à informação e promover a transparência na gestão pública do Estado de Rondônia.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              link={service.link}
              linkText={service.linkText}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
