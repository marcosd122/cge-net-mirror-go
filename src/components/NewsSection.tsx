
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import NewsCard from './NewsCard';
import EditableNewsCard from './EditableNewsCard';
import { useAdmin } from '@/contexts/AdminContext';
import { Plus, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';

const NewsSection = () => {
  const { isAdmin } = useAdmin();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string>('');
  
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

  const form = useForm({
    defaultValues: {
      title: '',
      summary: '',
      date: new Date().toLocaleDateString('pt-BR'),
      category: 'Geral',
      link: '',
    }
  });

  const handleNewsUpdate = (id: number, data: any) => {
    setNews(news.map(item => 
      item.id === id ? { ...item, ...data } : item
    ));
  };

  const handleDeleteNews = (id: number) => {
    setNews(news.filter(item => item.id !== id));
    toast.success("Notícia removida com sucesso!");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddNews = () => {
    setIsAddDialogOpen(true);
  };

  const handleSubmitNews = (data: any) => {
    const newId = Math.max(...news.map(item => item.id)) + 1;
    const newNews = {
      id: newId,
      title: data.title,
      summary: data.summary,
      date: data.date,
      category: data.category,
      imageUrl: previewImage || 'https://placehold.co/600x400/e6f2ff/0057b7?text=Nova+Notícia',
      link: data.link || '/noticias/nova-noticia'
    };
    setNews([...news, newNews]);
    setIsAddDialogOpen(false);
    setPreviewImage('');
    form.reset();
    toast.success("Nova notícia adicionada com sucesso!");
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
                onDelete={handleDeleteNews}
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

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Nova Notícia</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitNews)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <FormControl>
                        <Input placeholder="Categoria" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data</FormLabel>
                      <FormControl>
                        <Input placeholder="DD/MM/YYYY" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Título da notícia" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resumo</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Resumo da notícia" 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Imagem</FormLabel>
                <FormControl>
                  <div className="flex flex-col items-center space-y-2">
                    {previewImage && (
                      <div className="w-full h-48 rounded-md overflow-hidden">
                        <img 
                          src={previewImage} 
                          alt="Preview" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => imageInputRef.current?.click()}
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      {previewImage ? "Alterar imagem" : "Carregar imagem"}
                    </Button>
                    <input
                      type="file"
                      ref={imageInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>
                </FormControl>
              </FormItem>
              
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link da Notícia</FormLabel>
                    <FormControl>
                      <Input placeholder="/noticias/pagina ou https://..." {...field} />
                    </FormControl>
                    <FormDescription>
                      O link será aberto em uma nova aba quando o usuário clicar em "Ler mais"
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => {
                  setIsAddDialogOpen(false);
                  setPreviewImage('');
                  form.reset();
                }}>
                  Cancelar
                </Button>
                <Button type="submit">Adicionar Notícia</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default NewsSection;
