import { Calendar, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

interface DocumentCardProps {
  title: string;
  date: string;
  tags: string[];
  docId: string;
  description?: string;
}

export const DocumentCard = ({ title, date, tags, docId, description }: DocumentCardProps) => {
  return (
    <Link to={`/docs/${docId}`} className="block">
      <Card className="group cursor-pointer border-0 bg-card/50 backdrop-blur-sm transition-smooth hover:shadow-hover hover:bg-card/80">
        <CardContent className="p-6">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold group-hover:text-primary transition-smooth">
              {title}
            </h3>
            
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {description}
              </p>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{date}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <div className="flex gap-1 flex-wrap">
                  {tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="text-xs px-2 py-1 bg-accent/60 hover:bg-accent transition-smooth"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};