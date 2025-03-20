
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { StudySession } from '@/components/StudySession';
import { getFlashcardSet } from '@/lib/flashcard-utils';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const StudyPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [set, setSet] = useState(id ? getFlashcardSet(id) : undefined);

  useEffect(() => {
    if (id) {
      const foundSet = getFlashcardSet(id);
      setSet(foundSet);
      
      if (!foundSet) {
        toast.error('Flashcard set not found');
        navigate('/library');
      }
    } else {
      navigate('/library');
    }
  }, [id, navigate]);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-28 pb-16 px-6">
        {!set ? (
          <div className="max-w-3xl mx-auto text-center py-16">
            <p className="text-muted-foreground mb-4">
              The flashcard set you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate('/library')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Library
            </Button>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <StudySession cards={set.cards} setTitle={set.title} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyPage;
