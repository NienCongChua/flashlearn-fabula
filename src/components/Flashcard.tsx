
import { useState, useRef, useEffect } from 'react';
import { Flashcard as FlashcardType } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { RotateCw } from 'lucide-react';

interface FlashcardProps {
  card: FlashcardType;
  showExample?: boolean;
}

export function Flashcard({ card, showExample = true }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (frontRef.current && backRef.current) {
      const frontHeight = frontRef.current.offsetHeight;
      const backHeight = backRef.current.offsetHeight;
      setHeight(Math.max(frontHeight, backHeight, 200));
    }
  }, [card]);

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
          <p className="text-lg mb-4">{card.definition}</p>
          
          {showExample && card.example && (
            <>
              <div className="text-xs font-medium text-primary mb-2">Example</div>
              <p className="text-sm italic text-muted-foreground">{card.example}</p>
            </>
          )}
          
          <div className="flex-grow"></div>
          <div className="text-xs text-muted-foreground self-end mt-4">Click to flip</div>
        </div>
      </div>
    </div>
  );
}
