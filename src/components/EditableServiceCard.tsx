
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { Edit, Save, X, Trash2, Link2 } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

interface EditableServiceCardProps {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconType?: string;
  link: string;
  linkText: string;
  imageUrl?: string;
  onUpdate: (id: number, data: any) => void;
  onDelete?: (id: number) => void;
}

const EditableServiceCard: React.FC<EditableServiceCardProps> = ({
  id,
  title,
  description,
  icon,
  iconType,
  link,
  linkText,
  imageUrl,
  onUpdate,
  onDelete
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedLinkText, setEditedLinkText] = useState(linkText);
  const [editedLink, setEditedLink] = useState(link);
  const [editedImageUrl, setEditedImageUrl] = useState(imageUrl || '');
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      link: link,
    }
  });

  const handleSave = () => {
    onUpdate(id, {
      title: editedTitle,
      description: editedDescription,
      linkText: editedLinkText,
      link: editedLink,
      imageUrl: editedImageUrl,
    });
    setIsEditing(false);
    toast.success("Serviço atualizado com sucesso!");
  };

  const handleCancel = () => {
    setEditedTitle(title);
    setEditedDescription(description);
    setEditedLinkText(linkText);
    setEditedLink(link);
    setEditedImageUrl(imageUrl || '');
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
      toast.success("Serviço removido com sucesso!");
    }
    setIsDeleteDialogOpen(false);
  };

  const handleLinkSave = (values: any) => {
    setEditedLink(values.link);
    setIsLinkDialogOpen(false);
    toast.success("Link atualizado com sucesso!");
  };

  if (isEditing) {
    return (
      <Card className="card-shadow h-full flex flex-col">
        <CardHeader>
          {editedImageUrl ? (
            <div className="relative h-40 w-full mb-4 overflow-hidden rounded-md">
              <img 
                src={editedImageUrl} 
                alt={editedTitle} 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="flex justify-center mb-4 text-gov-blue">
              {icon}
            </div>
          )}
          <div className="space-y-2">
            <Input 
              value={editedImageUrl}
              onChange={(e) => setEditedImageUrl(e.target.value)}
              placeholder="URL da imagem (opcional)"
              className="text-center"
            />
            <Input 
              value={editedTitle} 
              onChange={(e) => setEditedTitle(e.target.value)}
              className="text-center font-semibold"
              placeholder="Título"
            />
            <Textarea 
              value={editedDescription} 
              onChange={(e) => setEditedDescription(e.target.value)} 
              className="text-center"
              placeholder="Descrição do serviço"
              rows={3}
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow"></CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Input 
            value={editedLinkText} 
            onChange={(e) => setEditedLinkText(e.target.value)}
            className="text-center"
            placeholder="Texto do botão"
          />
          <Button 
            onClick={() => setIsLinkDialogOpen(true)} 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
          >
            <Link2 className="h-4 w-4" />
            Editar Link: {editedLink}
          </Button>
          <div className="flex gap-2 w-full">
            <Button onClick={handleSave} variant="outline" className="flex-1">
              <Save className="mr-2 h-4 w-4" />
              Salvar
            </Button>
            <Button onClick={handleCancel} variant="outline" className="flex-1">
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
          </div>
          {onDelete && (
            <Button 
              onClick={() => setIsDeleteDialogOpen(true)}
              variant="destructive" 
              className="w-full mt-2"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir Serviço
            </Button>
          )}
        </CardFooter>
        
        <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Editar Link</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleLinkSave)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="link"
                  defaultValue={editedLink}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL do Link</FormLabel>
                      <FormControl>
                        <Input placeholder="/pagina ou https://..." {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Salvar Link</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirmar exclusão</DialogTitle>
            </DialogHeader>
            <p>Tem certeza que deseja excluir este serviço? Esta ação não pode ser desfeita.</p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancelar</Button>
              <Button variant="destructive" onClick={handleDelete}>Excluir</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>
    );
  }

  return (
    <Card className="card-shadow h-full flex flex-col group">
      <CardHeader>
        {imageUrl ? (
          <div className="relative h-40 w-full mb-4 overflow-hidden rounded-md">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="flex justify-center mb-4 text-gov-blue">
            {icon}
          </div>
        )}
        <CardTitle className="text-center text-xl">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => setIsEditing(true)}
        >
          <Edit className="h-4 w-4" />
        </Button>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-gov-blue hover:bg-gov-blue-dark">
          <Link to={link}>{linkText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EditableServiceCard;
