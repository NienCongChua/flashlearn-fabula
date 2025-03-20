
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { parseFlashcardsFromText, createFlashcardSet, saveFlashcardSet } from '@/lib/flashcard-utils';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Flashcard as FlashcardType } from '@/types';
import { Flashcard } from '@/components/Flashcard';

export function ImportForm() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cards, setCards] = useState<FlashcardType[]>([]);
  const [imported, setImported] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleImport = () => {
    if (!text.trim()) {
      toast.error('Please enter some text to import');
      return;
    }

    try {
      const parsedCards = parseFlashcardsFromText(text);
      
      if (parsedCards.length === 0) {
        toast.error('No valid flashcards found in the text');
        return;
      }
      
      setCards(parsedCards);
      setImported(true);
      toast.success(`Successfully imported ${parsedCards.length} flashcards`);
    } catch (error) {
      console.error('Import error:', error);
      toast.error('Failed to import flashcards');
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      toast.error('Please enter a title for your flashcard set');
      return;
    }

    if (cards.length === 0) {
      toast.error('No flashcards to save');
      return;
    }

    try {
      const newSet = createFlashcardSet(title, description, cards);
      saveFlashcardSet(newSet);
      navigate('/library');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save flashcard set');
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full animate-fade-in">
      {!imported ? (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-2">Import Flashcards</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Enter your flashcards in the format: <br />
              <code className="bg-muted px-2 py-1 rounded text-xs">
                Term: Definition: Example (optional)
              </code>
              <br />
              Each flashcard should be on a new line.
            </p>
            <Textarea 
              value={text}
              onChange={handleTextChange}
              placeholder="Enter your flashcards here..."
              className="min-h-[300px] font-mono text-sm"
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setText('')}>
              Clear
            </Button>
            <Button onClick={handleImport}>
              Import Flashcards
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-2">Create Flashcard Set</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Give your flashcard set a title and description before saving.
            </p>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a title for your flashcard set"
                  className="mt-1"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="text-sm font-medium">
                  Description (optional)
                </label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter a description"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-md font-medium mb-3">Preview ({cards.length} cards)</h3>
            
            <div className="max-h-[400px] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cards.slice(0, 4).map((card) => (
                  <Flashcard key={card.id} card={card} />
                ))}
              </div>
              
              {cards.length > 4 && (
                <p className="text-center text-sm text-muted-foreground mt-4">
                  +{cards.length - 4} more cards
                </p>
              )}
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setImported(false)}>
              Back to Import
            </Button>
            <Button onClick={handleSave}>
              Save Flashcard Set
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
