
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { Edit, Save, X, Trash2, Upload, Link2 } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

interface EditableNewsCardProps {
  id: number;
  title: string;
  summary: string;
  date: string;
  category: string;
  imageUrl: string;
  link: string;
  onUpdate: (id: number, data: any) => void;
  onDelete?: (id: number) => void;
}

const EditableNewsCard: React.FC<EditableNewsCardProps> = ({
  id,
  title,
  summary,
  date,
  category,
  imageUrl,
  link,
  onUpdate,
  onDelete
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedSummary, setEditedSummary] = useState(summary);
  const [editedCategory, setEditedCategory] = useState(category);
  const [editedDate, setEditedDate] = useState(date);
  const [editedImageUrl, setEditedImageUrl] = useState(imageUrl);
  const [editedLink, setEditedLink] = useState(link);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    defaultValues: {
      link: link,
    }
  });

  const handleSave = () => {
    onUpdate(id, {
      title: editedTitle,
      summary: editedSummary,
      category: editedCategory,
      date: editedDate,
      imageUrl: editedImageUrl,
      link: editedLink
    });
    setIsEditing(false);
    toast.success("Notícia atualizada com sucesso!");
  };

  const handleCancel = () => {
    setEditedTitle(title);
    setEditedSummary(summary);
    setEditedCategory(category);
    setEditedDate(date);
    setEditedImageUrl(imageUrl);
    setEditedLink(link);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
      toast.success("Notícia removida com sucesso!");
    }
    setIsDeleteDialogOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditedImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLinkSave = (values: any) => {
    setEditedLink(values.link);
    setIsLinkDialogOpen(false);
    toast.success("Link atualizado com sucesso!");
  };

  if (isEditing) {
    return (
      <Card className="card-shadow overflow-hidden h-full flex flex-col">
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={editedImageUrl} 
            alt={editedTitle} 
            className="w-full h-full object-cover"
          />
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="absolute bottom-2 right-2 bg-white/80 hover:bg-white"
            onClick={() => imageInputRef.current?.click()}
          >
            <Upload className="h-4 w-4" />
            <span className="sr-only">Upload image</span>
          </Button>
          <input
            type="file"
            ref={imageInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center mb-2">
            <Input 
              value={editedCategory} 
              onChange={(e) => setEditedCategory(e.target.value)} 
              className="w-1/2"
            />
            <Input 
              value={editedDate} 
              onChange={(e) => setEditedDate(e.target.value)} 
              className="w-1/3 text-right"
            />
          </div>
          <Input 
            value={editedTitle} 
            onChange={(e) => setEditedTitle(e.target.value)}
            className="text-lg font-semibold"
          />
        </CardHeader>
        <CardContent className="flex-grow pb-2">
          <Textarea 
            value={editedSummary} 
            onChange={(e) => setEditedSummary(e.target.value)} 
            className="min-h-[100px]"
            rows={4}
          />
        </CardContent>
        <CardFooter className="pt-2 flex flex-col gap-2">
          <Button 
            onClick={() => setIsLinkDialogOpen(true)} 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
          >
            <Link2 className="h-4 w-4" />
            Editar Link: {editedLink.substring(0, 30)}{editedLink.length > 30 ? '...' : ''}
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
              Excluir Notícia
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
                      <FormDescription>
                        O link será aberto em uma nova aba quando o usuário clicar em "Ler mais"
                      </FormDescription>
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
            <p>Tem certeza que deseja excluir esta notícia? Esta ação não pode ser desfeita.</p>
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
    <Card className="card-shadow overflow-hidden h-full flex flex-col group">
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute top-2 right-2 bg-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => setIsEditing(true)}
        >
          <Edit className="h-4 w-4" />
        </Button>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline" className="bg-gov-blue/10 text-gov-blue">
            {category}
          </Badge>
          <span className="text-sm text-muted-foreground">{date}</span>
        </div>
        <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow pb-2">
        <CardDescription className="line-clamp-3">
          {summary}
        </CardDescription>
      </CardContent>
      <CardFooter className="pt-2">
        <Link 
          to={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gov-blue font-medium hover:text-gov-blue-dark hover:underline transition-colors"
        >
          Ler mais →
        </Link>
      </CardFooter>
    </Card>
  );
};

export default EditableNewsCard;
