
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  linkText: string;
  imageUrl?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  link,
  linkText,
  imageUrl
}) => {
  return (
    <Card className="card-shadow h-full flex flex-col group">
      <CardHeader>
        {imageUrl ? (
          <div className="w-full mb-4 overflow-hidden rounded-md">
            <AspectRatio ratio={16/9}>
              <img 
                src={imageUrl} 
                alt={title} 
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>
        ) : (
          <div className="flex justify-center mb-4 text-gov-blue">
            {icon}
          </div>
        )}
        <CardTitle className="text-center text-xl">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow"></CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-gov-blue hover:bg-gov-blue-dark">
          <Link to={link} target="_blank" rel="noopener noreferrer">{linkText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
