
export interface Flashcard {
  id: string;
  term: string;
  definition: string;
  example?: string;
  lastReviewed?: Date;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface FlashcardSet {
  id: string;
  title: string;
  description?: string;
  cards: Flashcard[];
  createdAt: Date;
  updatedAt: Date;
}

export type StudyMode = 'flashcards' | 'multiple-choice' | 'matching';
