
import { useState, useEffect } from 'react';
import { Flashcard as FlashcardType } from '@/types';
import { Flashcard } from '@/components/Flashcard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Undo2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, 
  CardContent
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StudySessionProps {
  cards: FlashcardType[];
  setTitle: string;
}

type StudyMode = 'flashcards' | 'multiple-choice' | 'matching';

export function StudySession({ cards, setTitle }: StudySessionProps) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [studiedCards, setStudiedCards] = useState<string[]>([]);
  const [shuffledCards, setShuffledCards] = useState<FlashcardType[]>([]);
  const [studyMode, setStudyMode] = useState<StudyMode>('flashcards');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [matchingPairs, setMatchingPairs] = useState<{id: string, term: string, definition: string, matched: boolean}[]>([]);
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);
  
  // Shuffle cards on component mount
  useEffect(() => {
    if (cards.length > 0) {
      const shuffled = [...cards].sort(() => Math.random() - 0.5);
      setShuffledCards(shuffled);
      
      // Setup matching pairs
      const pairs = shuffled.slice(0, 10).map(card => ({
        id: card.id,
        term: card.term,
        definition: card.definition,
        matched: false
      }));
      setMatchingPairs(pairs);
    }
  }, [cards]);

  // Generate multiple choice options
  const generateOptions = () => {
    const correctAnswer = shuffledCards[currentIndex].definition;
    let options = [correctAnswer];
    
    // Add 3 random incorrect options
    const incorrectOptions = shuffledCards
      .filter(card => card.id !== shuffledCards[currentIndex].id)
      .map(card => card.definition)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    options = [...options, ...incorrectOptions];
    
    // Shuffle options
    return options.sort(() => Math.random() - 0.5);
  };
  
  const handleNext = () => {
    // Mark current card as studied
    if (!studiedCards.includes(shuffledCards[currentIndex].id)) {
      setStudiedCards(prev => [...prev, shuffledCards[currentIndex].id]);
    }
    
    // Reset selection state
    setSelectedAnswer(null);
    setIsCorrect(null);
    
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
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  };
  
  const handleRestart = () => {
    setCurrentIndex(0);
    setStudiedCards([]);
    setSelectedAnswer(null);
    setIsCorrect(null);
    
    // Reshuffle cards
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    
    // Reset matching pairs
    const pairs = shuffled.slice(0, 10).map(card => ({
      id: card.id,
      term: card.term,
      definition: card.definition,
      matched: false
    }));
    setMatchingPairs(pairs);
    
    toast('Study session restarted', {
      description: 'Cards have been reshuffled.'
    });
  };
  
  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === shuffledCards[currentIndex].definition;
    setIsCorrect(correct);
    
    if (correct) {
      if (!studiedCards.includes(shuffledCards[currentIndex].id)) {
        setStudiedCards(prev => [...prev, shuffledCards[currentIndex].id]);
      }
    }
  };
  
  const handleTermSelection = (id: string) => {
    if (selectedTermId === null) {
      // First selection - select a term
      setSelectedTermId(id);
    } else {
      // Second selection - check if match
      const termPair = matchingPairs.find(pair => pair.id === selectedTermId);
      const definitionPair = matchingPairs.find(pair => pair.id === id);
      
      if (termPair && definitionPair && termPair.id === definitionPair.id) {
        // Match found
        setMatchingPairs(prev => prev.map(pair => 
          pair.id === termPair.id ? {...pair, matched: true} : pair
        ));
        
        // Add to studied cards
        if (!studiedCards.includes(termPair.id)) {
          setStudiedCards(prev => [...prev, termPair.id]);
        }
        
        toast.success('Match found!');
      } else {
        // No match
        toast.error('Not a match. Try again!');
      }
      
      // Reset selection
      setSelectedTermId(null);
    }
  };
  
  if (shuffledCards.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">No flashcards available.</p>
      </div>
    );
  }
  
  const progress = Math.round((studiedCards.length / shuffledCards.length) * 100);
  const isComplete = studiedCards.length === shuffledCards.length;
  const allPairsMatched = matchingPairs.every(pair => pair.matched);
  
  return (
    <div className="max-w-3xl mx-auto w-full space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">{setTitle}</h2>
        <div className="text-sm text-muted-foreground">
          {studyMode === 'flashcards' && `${currentIndex + 1} of ${shuffledCards.length}`}
          {studyMode === 'multiple-choice' && `${currentIndex + 1} of ${shuffledCards.length}`}
          {studyMode === 'matching' && `${studiedCards.length} of ${matchingPairs.length} matched`}
        </div>
      </div>
      
      <Progress value={progress} className="h-2" />
      
      <Tabs value={studyMode} onValueChange={(val) => setStudyMode(val as StudyMode)} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
          <TabsTrigger value="multiple-choice">Multiple Choice</TabsTrigger>
          <TabsTrigger value="matching">Matching</TabsTrigger>
        </TabsList>
        
        <TabsContent value="flashcards" className="pt-2">
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
        </TabsContent>
        
        <TabsContent value="multiple-choice" className="pt-2">
          <div className="py-6 space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-2">
                What is the definition of:
              </h3>
              <p className="text-2xl font-semibold mb-4">
                {shuffledCards[currentIndex].term}
              </p>
            </Card>
            
            <div className="space-y-3">
              {generateOptions().map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left p-4 h-auto",
                    selectedAnswer === option && isCorrect && "bg-green-100 border-green-500",
                    selectedAnswer === option && !isCorrect && "bg-red-100 border-red-500"
                  )}
                  onClick={() => handleAnswerSelection(option)}
                  disabled={selectedAnswer !== null}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{String.fromCharCode(65 + index)}.</span>
                    <span>{option}</span>
                  </div>
                </Button>
              ))}
            </div>
            
            {isCorrect !== null && (
              <div className={cn(
                "p-4 rounded-md",
                isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              )}>
                {isCorrect 
                  ? "Correct! Well done." 
                  : `Incorrect. The correct answer is: ${shuffledCards[currentIndex].definition}`
                }
              </div>
            )}
          </div>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <Button 
              onClick={handleNext}
              disabled={selectedAnswer === null}
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="matching" className="pt-2">
          <div className="py-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="text-lg font-medium mb-2">Terms</h3>
                {matchingPairs.map((pair) => (
                  <Button
                    key={`term-${pair.id}`}
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left p-4 h-auto",
                      pair.matched && "bg-green-100 border-green-500 opacity-50",
                      selectedTermId === pair.id && "ring-2 ring-primary"
                    )}
                    onClick={() => !pair.matched && handleTermSelection(pair.id)}
                    disabled={pair.matched}
                  >
                    {pair.term}
                  </Button>
                ))}
              </div>
              
              <div className="space-y-3">
                <h3 className="text-lg font-medium mb-2">Definitions</h3>
                {matchingPairs
                  .sort(() => Math.random() - 0.5) // Shuffle definitions
                  .map((pair) => (
                    <Button
                      key={`def-${pair.id}`}
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left p-4 h-auto",
                        pair.matched && "bg-green-100 border-green-500 opacity-50",
                        selectedTermId !== null && selectedTermId !== pair.id && "cursor-pointer"
                      )}
                      onClick={() => selectedTermId !== null && !pair.matched && handleTermSelection(pair.id)}
                      disabled={pair.matched || selectedTermId === null}
                    >
                      {pair.definition}
                    </Button>
                  ))}
              </div>
            </div>
            
            {allPairsMatched && (
              <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-md">
                Congratulations! You've matched all the pairs.
              </div>
            )}
          </div>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => navigate('/library')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Library
            </Button>
            
            <Button onClick={handleRestart}>
              <Undo2 className="w-4 h-4 mr-2" />
              Restart
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
