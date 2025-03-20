
import { Flashcard, FlashcardSet } from "@/types";
import { toast } from "sonner";

// Generate a unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

// Parse flashcards from text
export function parseFlashcardsFromText(text: string): Flashcard[] {
  const lines = text.split('\n').filter(line => line.trim() !== '');
  
  return lines.map(line => {
    const parts = line.split(':').map(part => part.trim());
    
    if (parts.length < 2) {
      return {
        id: generateId(),
        term: parts[0] || 'Unknown Term',
        definition: 'No definition provided',
      };
    }
    
    return {
      id: generateId(),
      term: parts[0],
      definition: parts[1],
      example: parts[2] || undefined,
    };
  });
}

// Create a new flashcard set
export function createFlashcardSet(title: string, description: string, cards: Flashcard[]): FlashcardSet {
  return {
    id: generateId(),
    title,
    description,
    cards,
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

// Save flashcard set to local storage
export function saveFlashcardSet(set: FlashcardSet): void {
  try {
    // Get existing sets
    const existingSets = getFlashcardSets();
    
    // Check if set already exists
    const index = existingSets.findIndex(s => s.id === set.id);
    
    if (index >= 0) {
      // Update existing set
      existingSets[index] = {
        ...set,
        updatedAt: new Date()
      };
    } else {
      // Add new set
      existingSets.push(set);
    }
    
    // Save back to localStorage
    localStorage.setItem('flashcardSets', JSON.stringify(existingSets));
    
    toast.success('Flashcard set saved successfully');
  } catch (error) {
    console.error('Failed to save flashcard set:', error);
    toast.error('Failed to save flashcard set');
  }
}

// Get all flashcard sets from local storage
export function getFlashcardSets(): FlashcardSet[] {
  try {
    const sets = localStorage.getItem('flashcardSets');
    return sets ? JSON.parse(sets) : [];
  } catch (error) {
    console.error('Failed to retrieve flashcard sets:', error);
    return [];
  }
}

// Get a specific flashcard set
export function getFlashcardSet(id: string): FlashcardSet | undefined {
  const sets = getFlashcardSets();
  return sets.find(set => set.id === id);
}

// Delete a flashcard set
export function deleteFlashcardSet(id: string): void {
  try {
    const sets = getFlashcardSets().filter(set => set.id !== id);
    localStorage.setItem('flashcardSets', JSON.stringify(sets));
    toast.success('Flashcard set deleted');
  } catch (error) {
    console.error('Failed to delete flashcard set:', error);
    toast.error('Failed to delete flashcard set');
  }
}
