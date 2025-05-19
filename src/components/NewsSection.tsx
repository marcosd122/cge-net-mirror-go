
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import NewsCard from './NewsCard';

const NewsSection = () => {
  // Sample news data
  const news = [
    {
      title: 'CGE divulga relatório de auditoria do primeiro semestre',
      summary: 'Confira os resultados da auditoria realizada pela Controladoria Geral do Estado nos órgãos e entidades do Poder Executivo no primeiro semestre de 2025.',
      date: '15/05/2025',
      category: 'Auditoria',
      imageUrl: 'https://placehold.co/600x400/e6f2ff/0057b7?text=Auditoria',
      link: '/noticias/relatorio-auditoria-2025'
    },
    {
      title: 'Portal da Transparência implementa novas funcionalidades',
      summary: 'O Portal da Transparência do Estado de Rondônia ganhou novas funcionalidades que facilitam o acesso às informações públicas e melhoram a experiência do usuário.',
      date: '28/04/2025',
      category: 'Portal',
      imageUrl: 'https://placehold.co/600x400/e6f2ff/0057b7?text=Transparência',
      link: '/noticias/novas-funcionalidades-transparencia'
    },
    {
      title: 'CGE promove curso de capacitação para servidores',
      summary: 'A Controladoria Geral do Estado está promovendo cursos de capacitação para servidores públicos sobre gestão de documentos e transparência pública.',
      date: '10/04/2025',
      category: 'Capacitação',
      imageUrl: 'https://placehold.co/600x400/e6f2ff/0057b7?text=Capacitação',
      link: '/noticias/curso-capacitacao-servidores'
    }
  ];

  return (
    <section className="py-12">
      <div className="gov-container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gov-blue-dark">Últimas Notícias</h2>
          <Button asChild variant="outline" className="border-gov-blue text-gov-blue hover:bg-gov-blue hover:text-white">
            <Link to="/noticias">Ver todas</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <NewsCard
              key={index}
              title={item.title}
              summary={item.summary}
              date={item.date}
              category={item.category}
              imageUrl={item.imageUrl}
              link={item.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
