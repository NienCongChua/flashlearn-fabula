
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, BookOpen, Library, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

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
        
        {/* Desktop Navigation */}
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
        
        {/* Mobile Navigation */}
        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <div className="flex flex-col space-y-4 mt-8">
                <SheetClose asChild>
                  <Button variant="ghost" asChild className="justify-start">
                    <Link to="/" className="flex items-center">
                      Home
                    </Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant="ghost" asChild className="justify-start">
                    <Link to="/library" className="flex items-center">
                      My Library
                    </Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant="ghost" asChild className="justify-start">
                    <Link to="/study" className="flex items-center">
                      Study
                    </Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant="ghost" asChild className="justify-start">
                    <Link to="/create" className="flex items-center">
                      Create
                    </Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant="ghost" asChild className="justify-start">
                    <Link to="/import" className="flex items-center">
                      Import
                    </Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        )}
        
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
