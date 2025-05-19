
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { Edit, Save, X } from 'lucide-react';
import { toast } from 'sonner';

interface EditableNewsCardProps {
  id: number;
  title: string;
  summary: string;
  date: string;
  category: string;
  imageUrl: string;
  link: string;
  onUpdate: (id: number, data: any) => void;
}

const EditableNewsCard: React.FC<EditableNewsCardProps> = ({
  id,
  title,
  summary,
  date,
  category,
  imageUrl,
  link,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedSummary, setEditedSummary] = useState(summary);
  const [editedCategory, setEditedCategory] = useState(category);
  const [editedDate, setEditedDate] = useState(date);

  const handleSave = () => {
    onUpdate(id, {
      title: editedTitle,
      summary: editedSummary,
      category: editedCategory,
      date: editedDate,
    });
    setIsEditing(false);
    toast.success("Notícia atualizada com sucesso!");
  };

  const handleCancel = () => {
    setEditedTitle(title);
    setEditedSummary(summary);
    setEditedCategory(category);
    setEditedDate(date);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Card className="card-shadow overflow-hidden h-full flex flex-col">
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
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
        <CardFooter className="pt-2 flex gap-2">
          <Button onClick={handleSave} variant="outline" className="flex-1">
            <Save className="mr-2 h-4 w-4" />
            Salvar
          </Button>
          <Button onClick={handleCancel} variant="outline" className="flex-1">
            <X className="mr-2 h-4 w-4" />
            Cancelar
          </Button>
        </CardFooter>
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
          className="text-gov-blue font-medium hover:text-gov-blue-dark hover:underline transition-colors"
        >
          Ler mais →
        </Link>
      </CardFooter>
    </Card>
  );
};

export default EditableNewsCard;
