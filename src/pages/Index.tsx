
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Flashcard } from '@/components/Flashcard';
import { Flashcard as FlashcardType } from '@/types';
import { generateId } from '@/lib/flashcard-utils';

const Index = () => {
  // Example flashcard for showcase
  const exampleCard: FlashcardType = {
    id: generateId(),
    term: "Photosynthesis",
    definition: "The process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll.",
    example: "Plants convert carbon dioxide and water into glucose and oxygen through photosynthesis."
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4 animate-fade-in">
            Better way to learn
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight animate-slide-in">
            Effortless Learning with <span className="text-primary">FlashLearn</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-in" style={{ animationDelay: "100ms" }}>
            Create, import, and study flashcards with a beautiful, intuitive interface designed to make your learning experience seamless and effective.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-in" style={{ animationDelay: "200ms" }}>
            <Button size="lg" asChild>
              <Link to="/create">Create Flashcards</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/import">Import Flashcards</Link>
            </Button>
          </div>
          
          {/* Example Card */}
          <div className="max-w-md mx-auto animate-slide-in" style={{ animationDelay: "300ms" }}>
            <Flashcard card={exampleCard} />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-6 bg-secondary/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover how FlashLearn can transform your study experience with these powerful features.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Create Flashcards</h3>
              <p className="text-muted-foreground">
                Easily create customized flashcards with terms, definitions, and examples.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Import Sets</h3>
              <p className="text-muted-foreground">
                Import flashcards from text files with our simple format parser.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Study Mode</h3>
              <p className="text-muted-foreground">
                Focus on learning with our distraction-free study mode and progress tracking.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Begin your journey to more effective learning today. No account required - your flashcards are stored securely in your browser.
          </p>
          <Button size="lg" asChild>
            <Link to="/import">Import Your First Flashcards</Link>
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-6 border-t">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <svg className="w-5 h-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="font-medium">FlashLearn</span>
          </div>
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} FlashLearn. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
