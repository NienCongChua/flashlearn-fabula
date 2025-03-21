
import { useState, useRef, useEffect } from 'react';
import { Flashcard as FlashcardType } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { RotateCw } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';

interface FlashcardProps {
  card: FlashcardType;
  showExample?: boolean;
}

export function Flashcard({ card, showExample = true }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (frontRef.current && backRef.current) {
      const frontHeight = frontRef.current.offsetHeight;
      const backHeight = backRef.current.offsetHeight;
      
      // Set minimum height to ensure cards aren't too small
      // Use larger minimum height for content that might be longer
      const minHeight = 200;
      const calculatedHeight = Math.max(frontHeight, backHeight, minHeight);
      
      // Set a maximum height on mobile to prevent very tall cards
      const maxHeight = isMobile ? 400 : 600;
      
      setHeight(Math.min(calculatedHeight, maxHeight));
    }
  }, [card, isMobile]);

  function handleFlip() {
    setFlipped(prev => !prev);
  }

  return (
    <div 
      className="flashcard-container w-full perspective bg-card rounded-xl overflow-hidden border shadow-sm cursor-pointer"
      style={{ height: height ? `${height}px` : 'auto' }}
      onClick={handleFlip}
    >
      <div 
        className={cn(
          "w-full h-full relative transition-all duration-500 preserve-3d",
          flipped ? "animate-flip" : "animate-flip-back"
        )}
      >
        {/* Front of card */}
        <div 
          ref={frontRef}
          className={cn(
            "absolute w-full h-full preserve-3d p-6 flex flex-col",
            flipped && "opacity-0 pointer-events-none"
          )}
        >
          <div className="text-xs font-medium text-primary mb-2">Term</div>
          <h3 className="text-2xl font-semibold mb-4">{card.term}</h3>
          <div className="flex-grow"></div>
          <div className="text-xs text-muted-foreground self-end mt-4">Click to flip</div>
        </div>

        {/* Back of card */}
        <div 
          ref={backRef}
          className={cn(
            "absolute w-full h-full preserve-3d back-face p-6 flex flex-col",
            !flipped && "opacity-0 pointer-events-none"
          )}
        >
          <div className="text-xs font-medium text-primary mb-2">Definition</div>
          <ScrollArea className="flex-grow pr-4 -mr-4">
            <p className="text-lg mb-4 whitespace-pre-wrap">{card.definition}</p>
            
            {showExample && card.example && (
              <>
                <div className="text-xs font-medium text-primary mb-2">Example</div>
                <p className="text-sm italic text-muted-foreground whitespace-pre-wrap">{card.example}</p>
              </>
            )}
          </ScrollArea>
          
          <div className="text-xs text-muted-foreground self-end mt-4 pt-2">Click to flip</div>
        </div>
      </div>
    </div>
  );
}
