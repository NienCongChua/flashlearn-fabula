
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, BookOpen, Library } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ease-in-out",
        scrolled 
          ? "bg-background/80 backdrop-blur-md border-b shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-semibold tracking-tight transition-colors flex items-center gap-2"
        >
          <BookOpen className="w-6 h-6 text-primary" />
          <span className="animate-fade-in">FlashLearn</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1">
          <Button variant="ghost" asChild>
            <Link to="/" className="text-sm font-medium transition-colors">
              Home
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/library" className="text-sm font-medium transition-colors">
              My Library
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/study" className="text-sm font-medium transition-colors">
              Study
            </Link>
          </Button>
        </nav>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/create" className="gap-1">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Create</span>
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/import" className="gap-1">
              <Library className="w-4 h-4" />
              <span className="hidden sm:inline">Import</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
