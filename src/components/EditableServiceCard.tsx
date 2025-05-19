
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { Edit, Save, X } from 'lucide-react';
import { toast } from 'sonner';

interface EditableServiceCardProps {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  linkText: string;
  onUpdate: (id: number, data: any) => void;
}

const EditableServiceCard: React.FC<EditableServiceCardProps> = ({
  id,
  title,
  description,
  icon,
  link,
  linkText,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedLinkText, setEditedLinkText] = useState(linkText);

  const handleSave = () => {
    onUpdate(id, {
      title: editedTitle,
      description: editedDescription,
      linkText: editedLinkText,
    });
    setIsEditing(false);
    toast.success("Serviço atualizado com sucesso!");
  };

  const handleCancel = () => {
    setEditedTitle(title);
    setEditedDescription(description);
    setEditedLinkText(linkText);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Card className="card-shadow h-full flex flex-col">
        <CardHeader>
          <div className="flex justify-center mb-4 text-gov-blue">
            {icon}
          </div>
          <div className="space-y-2">
            <Input 
              value={editedTitle} 
              onChange={(e) => setEditedTitle(e.target.value)}
              className="text-center font-semibold"
            />
            <Textarea 
              value={editedDescription} 
              onChange={(e) => setEditedDescription(e.target.value)} 
              className="text-center"
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
          />
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
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="card-shadow h-full flex flex-col group">
      <CardHeader>
        <div className="flex justify-center mb-4 text-gov-blue">
          {icon}
        </div>
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
