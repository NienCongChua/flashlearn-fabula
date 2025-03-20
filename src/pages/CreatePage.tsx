
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Flashcard as FlashcardType } from '@/types';
import { Flashcard } from '@/components/Flashcard';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { generateId, createFlashcardSet, saveFlashcardSet } from '@/lib/flashcard-utils';
import { Plus, Save, X, Edit2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const CreatePage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cards, setCards] = useState<FlashcardType[]>([]);

  // New card form
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [example, setExample] = useState('');
  const [editingCardId, setEditingCardId] = useState<string | null>(null);

  const handleAddCard = () => {
    if (!term.trim() || !definition.trim()) {
      toast.error('Term and definition are required');
      return;
    }

    if (editingCardId) {
      // Update existing card
      setCards(cards.map(card => 
        card.id === editingCardId 
          ? { ...card, term, definition, example: example || undefined } 
          : card
      ));
      toast.success('Card updated');
      setEditingCardId(null);
    } else {
      // Add new card
      const newCard: FlashcardType = {
        id: generateId(),
        term,
        definition,
        example: example || undefined
      };
      
      setCards([...cards, newCard]);
      toast.success('Card added');
    }
    
    // Reset form
    setTerm('');
    setDefinition('');
    setExample('');
  };

  const handleEditCard = (card: FlashcardType) => {
    setTerm(card.term);
    setDefinition(card.definition);
    setExample(card.example || '');
    setEditingCardId(card.id);
  };

  const handleDeleteCard = (id: string) => {
    setCards(cards.filter(card => card.id !== id));
    toast.success('Card deleted');
    
    if (editingCardId === id) {
      // If we're currently editing this card, reset the form
      setTerm('');
      setDefinition('');
      setExample('');
      setEditingCardId(null);
    }
  };

  const handleSaveSet = () => {
    if (!title.trim()) {
      toast.error('Please provide a title for your flashcard set');
      return;
    }
    
    if (cards.length === 0) {
      toast.error('Please add at least one card to your set');
      return;
    }
    
    const newSet = createFlashcardSet(title, description, cards);
    saveFlashcardSet(newSet);
    navigate('/library');
  };

  const handleCancelEdit = () => {
    setTerm('');
    setDefinition('');
    setExample('');
    setEditingCardId(null);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-28 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Create Flashcard Set</h1>
          <p className="text-muted-foreground mb-8">
            Create your own custom flashcard set with terms, definitions, and examples.
          </p>
          
          <div className="space-y-8">
            {/* Set details */}
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="text-sm font-medium">
                  Set Title
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
            
            <Separator />
            
            {/* Add card form */}
            <div>
              <h2 className="text-xl font-medium mb-4">
                {editingCardId ? 'Edit Card' : 'Add Card'}
              </h2>
              
              <Card>
                <CardHeader className="pb-2">
                  <label htmlFor="term" className="text-sm font-medium">
                    Term
                  </label>
                  <Input
                    id="term"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Enter the term"
                  />
                </CardHeader>
                
                <CardContent className="space-y-4 py-4">
                  <div>
                    <label htmlFor="definition" className="text-sm font-medium">
                      Definition
                    </label>
                    <Textarea
                      id="definition"
                      value={definition}
                      onChange={(e) => setDefinition(e.target.value)}
                      placeholder="Enter the definition"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="example" className="text-sm font-medium">
                      Example (optional)
                    </label>
                    <Textarea
                      id="example"
                      value={example}
                      onChange={(e) => setExample(e.target.value)}
                      placeholder="Enter an example"
                      className="mt-1"
                    />
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-end gap-2">
                  {editingCardId && (
                    <Button 
                      variant="outline" 
                      onClick={handleCancelEdit}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  )}
                  
                  <Button onClick={handleAddCard}>
                    {editingCardId ? (
                      <>
                        <Edit2 className="w-4 h-4 mr-2" />
                        Update Card
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Card
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Card preview */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium">
                  Cards ({cards.length})
                </h2>
                
                {cards.length > 0 && (
                  <Button onClick={handleSaveSet}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Set
                  </Button>
                )}
              </div>
              
              {cards.length === 0 ? (
                <div className="text-center py-8 border rounded-xl bg-secondary/30">
                  <p className="text-muted-foreground">
                    No cards added yet. Add your first card above.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 animate-fade-in">
                  {cards.map((card) => (
                    <div key={card.id} className="relative">
                      <Flashcard card={card} />
                      <div className="absolute top-2 right-2 flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                          onClick={() => handleEditCard(card)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm text-destructive"
                          onClick={() => handleDeleteCard(card.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
