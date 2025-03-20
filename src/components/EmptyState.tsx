
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Plus, Import } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  createPath: string;
  importPath: string;
}

export function EmptyState({ title, description, createPath, importPath }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
      <div className="w-24 h-24 mb-6 rounded-full bg-primary/10 flex items-center justify-center animate-float">
        <svg
          className="w-12 h-12 text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      </div>
      
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-8 max-w-md">{description}</p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button asChild>
          <Link to={createPath}>
            <Plus className="w-4 h-4 mr-2" />
            Create Flashcards
          </Link>
        </Button>
        
        <Button variant="outline" asChild>
          <Link to={importPath}>
            <Import className="w-4 h-4 mr-2" />
            Import Flashcards
          </Link>
        </Button>
      </div>
    </div>
  );
}
