
import { useState, useEffect } from 'react';
import { Flashcard as FlashcardType } from '@/types';
import { Flashcard } from '@/components/Flashcard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Undo2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface StudySessionProps {
  cards: FlashcardType[];
  setTitle: string;
}

export function StudySession({ cards, setTitle }: StudySessionProps) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [studiedCards, setStudiedCards] = useState<string[]>([]);
  const [shuffledCards, setShuffledCards] = useState<FlashcardType[]>([]);
  
  // Shuffle cards on component mount
  useEffect(() => {
    if (cards.length > 0) {
      const shuffled = [...cards].sort(() => Math.random() - 0.5);
      setShuffledCards(shuffled);
    }
  }, [cards]);
  
  const handleNext = () => {
    // Mark current card as studied
    if (!studiedCards.includes(shuffledCards[currentIndex].id)) {
      setStudiedCards(prev => [...prev, shuffledCards[currentIndex].id]);
    }
    
    // Move to next card
    if (currentIndex < shuffledCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Completed all cards
      toast.success('You completed the study session!', {
        description: `You studied all ${shuffledCards.length} cards.`
      });
    }
  };
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  const handleRestart = () => {
    setCurrentIndex(0);
    setStudiedCards([]);
    // Reshuffle cards
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    toast('Study session restarted', {
      description: 'Cards have been reshuffled.'
    });
  };
  
  if (shuffledCards.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">No flashcards available.</p>
      </div>
    );
  }
  
  const progress = Math.round((studiedCards.length / shuffledCards.length) * 100);
  const isComplete = currentIndex === shuffledCards.length - 1 && studiedCards.includes(shuffledCards[currentIndex].id);
  
  return (
    <div className="max-w-2xl mx-auto w-full space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">{setTitle}</h2>
        <div className="text-sm text-muted-foreground">
          {currentIndex + 1} of {shuffledCards.length}
        </div>
      </div>
      
      <Progress value={progress} className="h-2" />
      
      <div className="py-6">
        <Flashcard card={shuffledCards[currentIndex]} />
      </div>
      
      <div className="flex justify-between">
        {!isComplete ? (
          <>
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <Button onClick={handleNext}>
              {currentIndex < shuffledCards.length - 1 ? (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Complete
                  <CheckCircle className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={() => navigate('/library')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Library
            </Button>
            
            <Button onClick={handleRestart}>
              <Undo2 className="w-4 h-4 mr-2" />
              Restart
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
