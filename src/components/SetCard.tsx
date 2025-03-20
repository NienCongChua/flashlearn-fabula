
import { FlashcardSet } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, BookOpen, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { deleteFlashcardSet } from '@/lib/flashcard-utils';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface SetCardProps {
  set: FlashcardSet;
  onDelete?: () => void;
}

export function SetCard({ set, onDelete }: SetCardProps) {
  const navigate = useNavigate();
  const formattedDate = new Date(set.updatedAt).toLocaleDateString();
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this flashcard set?')) {
      deleteFlashcardSet(set.id);
      if (onDelete) onDelete();
      toast.success('Flashcard set deleted');
    }
  };

  return (
    <Card className="flashcard-container overflow-hidden h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold line-clamp-1">{set.title}</CardTitle>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
            <Book className="w-4 h-4" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow py-2">
        {set.description ? (
          <p className="text-sm text-muted-foreground line-clamp-2">{set.description}</p>
        ) : (
          <p className="text-sm text-muted-foreground italic">No description</p>
        )}
        
        <div className="flex items-center justify-between mt-4">
          <div className="text-xs font-medium text-muted-foreground">
            {set.cards.length} {set.cards.length === 1 ? 'card' : 'cards'}
          </div>
          <div className="text-xs text-muted-foreground">
            Updated {formattedDate}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 flex justify-between gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          asChild
        >
          <Link to={`/study/${set.id}`}>
            <BookOpen className="w-4 h-4 mr-1" />
            Study
          </Link>
        </Button>
        
        <Button 
          variant="destructive" 
          size="sm"
          onClick={handleDelete}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
