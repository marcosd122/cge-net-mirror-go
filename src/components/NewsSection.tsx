
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import NewsCard from './NewsCard';
import EditableNewsCard from './EditableNewsCard';
import { useAdmin } from '@/contexts/AdminContext';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

const NewsSection = () => {
  const { isAdmin } = useAdmin();
  
  // Sample news data with IDs added
  const [news, setNews] = useState([
    {
      id: 1,
      title: 'CGE divulga relatório de auditoria do primeiro semestre',
      summary: 'Confira os resultados da auditoria realizada pela Controladoria Geral do Estado nos órgãos e entidades do Poder Executivo no primeiro semestre de 2025.',
      date: '15/05/2025',
      category: 'Auditoria',
      imageUrl: 'https://placehold.co/600x400/e6f2ff/0057b7?text=Auditoria',
      link: '/noticias/relatorio-auditoria-2025'
    },
    {
      id: 2,
      title: 'Portal da Transparência implementa novas funcionalidades',
      summary: 'O Portal da Transparência do Estado de Rondônia ganhou novas funcionalidades que facilitam o acesso às informações públicas e melhoram a experiência do usuário.',
      date: '28/04/2025',
      category: 'Portal',
      imageUrl: 'https://placehold.co/600x400/e6f2ff/0057b7?text=Transparência',
      link: '/noticias/novas-funcionalidades-transparencia'
    },
    {
      id: 3,
      title: 'CGE promove curso de capacitação para servidores',
      summary: 'A Controladoria Geral do Estado está promovendo cursos de capacitação para servidores públicos sobre gestão de documentos e transparência pública.',
      date: '10/04/2025',
      category: 'Capacitação',
      imageUrl: 'https://placehold.co/600x400/e6f2ff/0057b7?text=Capacitação',
      link: '/noticias/curso-capacitacao-servidores'
    }
  ]);

  const handleNewsUpdate = (id: number, data: any) => {
    setNews(news.map(item => 
      item.id === id ? { ...item, ...data } : item
    ));
  };

  const handleAddNews = () => {
    const newId = Math.max(...news.map(item => item.id)) + 1;
    const newNews = {
      id: newId,
      title: 'Nova Notícia',
      summary: 'Descrição da nova notícia. Clique em editar para modificar este conteúdo.',
      date: new Date().toLocaleDateString('pt-BR'),
      category: 'Geral',
      imageUrl: 'https://placehold.co/600x400/e6f2ff/0057b7?text=Nova+Notícia',
      link: '/noticias/nova-noticia'
    };
    setNews([...news, newNews]);
    toast.success("Nova notícia adicionada. Agora você pode editar o conteúdo.");
  };

  return (
    <section className="py-12">
      <div className="gov-container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gov-blue-dark">Últimas Notícias</h2>
          <div className="flex gap-2">
            {isAdmin && (
              <Button 
                onClick={handleAddNews}
                variant="outline" 
                className="border-gov-blue text-gov-blue hover:bg-gov-blue hover:text-white"
              >
                <Plus className="mr-1 h-4 w-4" /> Adicionar
              </Button>
            )}
            <Button asChild variant="outline" className="border-gov-blue text-gov-blue hover:bg-gov-blue hover:text-white">
              <Link to="/noticias">Ver todas</Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            isAdmin ? (
              <EditableNewsCard
                key={item.id}
                id={item.id}
                title={item.title}
                summary={item.summary}
                date={item.date}
                category={item.category}
                imageUrl={item.imageUrl}
                link={item.link}
                onUpdate={handleNewsUpdate}
              />
            ) : (
              <NewsCard
                key={item.id}
                title={item.title}
                summary={item.summary}
                date={item.date}
                category={item.category}
                imageUrl={item.imageUrl}
                link={item.link}
              />
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
