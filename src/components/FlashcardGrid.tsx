
import { Flashcard as FlashcardType } from '@/types';
import { Flashcard } from '@/components/Flashcard';

interface FlashcardGridProps {
  cards: FlashcardType[];
}

export function FlashcardGrid({ cards }: FlashcardGridProps) {
  if (cards.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">No flashcards available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
      {cards.map(card => (
        <Flashcard key={card.id} card={card} />
      ))}
    </div>
  );
}
