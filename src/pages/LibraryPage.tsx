
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { SetCard } from '@/components/SetCard';
import { FlashcardSet } from '@/types';
import { getFlashcardSets } from '@/lib/flashcard-utils';
import { EmptyState } from '@/components/EmptyState';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const LibraryPage = () => {
  const [sets, setSets] = useState<FlashcardSet[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadSets();
  }, []);

  const loadSets = () => {
    const loadedSets = getFlashcardSets();
    setSets(loadedSets);
  };

  const filteredSets = searchTerm 
    ? sets.filter(set => 
        set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (set.description && set.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : sets;

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-28 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Library</h1>
              <p className="text-muted-foreground">
                Manage your flashcard sets and start studying.
              </p>
            </div>
            
            {sets.length > 0 && (
              <div className="relative w-full md:w-auto min-w-[240px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search sets..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}
          </div>
          
          {sets.length === 0 ? (
            <EmptyState
              title="Your library is empty"
              description="Create your first set of flashcards or import them from a text file."
              createPath="/create"
              importPath="/import"
            />
          ) : filteredSets.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No sets match your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {filteredSets.map(set => (
                <SetCard 
                  key={set.id} 
                  set={set} 
                  onDelete={loadSets} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;
