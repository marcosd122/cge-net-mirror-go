import React, { useState, useRef } from 'react';
import ServiceCard from './ServiceCard';
import EditableServiceCard from './EditableServiceCard';
import { FileText, Search, FileBarChart, Lock, Users, BookOpen, Plus, Image, Upload } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';

const ServicesSection = () => {
  const { isAdmin } = useAdmin();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string>('');
  
  const [services, setServices] = useState([
    {
      id: 1,
      title: 'Documentos',
      description: 'Acesse, envie e gerencie documentos oficiais',
      icon: <FileText size={48} />,
      iconType: 'FileText',
      link: '/documentos',
      linkText: 'Acessar Documentos',
      imageUrl: ''
    },
    {
      id: 2,
      title: 'Consultas',
      description: 'Realize consultas em bases de dados públicas',
      icon: <Search size={48} />,
      iconType: 'Search',
      link: '/consultas',
      linkText: 'Realizar Consulta',
      imageUrl: ''
    },
    {
      id: 3,
      title: 'Relatórios',
      description: 'Visualize e baixe relatórios de transparência',
      icon: <FileBarChart size={48} />,
      iconType: 'FileBarChart',
      link: '/relatorios',
      linkText: 'Ver Relatórios',
      imageUrl: ''
    },
    {
      id: 4,
      title: 'Área Restrita',
      description: 'Acesso seguro para servidores autorizados',
      icon: <Lock size={48} />,
      iconType: 'Lock',
      link: '/login',
      linkText: 'Fazer Login',
      imageUrl: ''
    },
    {
      id: 5,
      title: 'Ouvidoria',
      description: 'Envie sugestões, reclamações e elogios',
      icon: <Users size={48} />,
      iconType: 'Users',
      link: '/ouvidoria',
      linkText: 'Acessar Ouvidoria',
      imageUrl: ''
    },
    {
      id: 6,
      title: 'Legislação',
      description: 'Consulte leis e normas sobre transparência',
      icon: <BookOpen size={48} />,
      iconType: 'BookOpen',
      link: '/legislacao',
      linkText: 'Ver Legislação',
      imageUrl: ''
    }
  ]);

  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      link: '',
      linkText: '',
    }
  });

  const handleServiceUpdate = (id: number, data: any) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, ...data } : service
    ));
  };

  const handleServiceDelete = (id: number) => {
    setServices(services.filter(service => service.id !== id));
    toast.success("Serviço removido com sucesso!");
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

  const handleAddService = (data: any) => {
    const newId = Math.max(...services.map(service => service.id), 0) + 1;
    const newService = {
      id: newId,
      title: data.title,
      description: data.description,
      icon: <Image size={48} />,
      iconType: 'Image',
      link: data.link || '/novo-servico',
      linkText: data.linkText || 'Acessar Serviço',
      imageUrl: previewImage || ''
    };
    
    setServices([...services, newService]);
    setIsAddDialogOpen(false);
    setPreviewImage('');
    form.reset();
    toast.success("Novo serviço adicionado com sucesso!");
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="gov-container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gov-blue-dark">Nossos Serviços</h2>
          {isAdmin && (
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              variant="outline" 
              className="border-gov-blue text-gov-blue hover:bg-gov-blue hover:text-white"
            >
              <Plus className="mr-1 h-4 w-4" /> Adicionar Serviço
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            isAdmin ? (
              <EditableServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                iconType={service.iconType}
                link={service.link}
                linkText={service.linkText}
                imageUrl={service.imageUrl}
                onUpdate={handleServiceUpdate}
                onDelete={handleServiceDelete}
              />
            ) : (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                link={service.link}
                linkText={service.linkText}
                imageUrl={service.imageUrl}
              />
            )
          ))}
        </div>
      </div>
      
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Serviço</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddService)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Título do serviço" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descrição do serviço" 
                        className="min-h-[80px]" 
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
                      <div className="w-full h-40 rounded-md overflow-hidden">
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
                <FormDescription>
                  Opcional. Se não fornecida, um ícone padrão será usado.
                </FormDescription>
              </FormItem>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link</FormLabel>
                      <FormControl>
                        <Input placeholder="/rota ou URL externa" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="linkText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Texto do Botão</FormLabel>
                      <FormControl>
                        <Input placeholder="Acessar Serviço" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => {
                  setIsAddDialogOpen(false);
                  setPreviewImage('');
                  form.reset();
                }}>
                  Cancelar
                </Button>
                <Button type="submit">Adicionar Serviço</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ServicesSection;
