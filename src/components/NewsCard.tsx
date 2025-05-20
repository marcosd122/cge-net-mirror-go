
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface NewsCardProps {
  title: string;
  summary: string;
  date: string;
  category: string;
  imageUrl: string;
  link: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  summary,
  date,
  category,
  imageUrl,
  link
}) => {
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

export default NewsCard;
