
import { Header } from '@/components/Header';
import { ImportForm } from '@/components/ImportForm';

const ImportPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-28 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Import Flashcards</h1>
          <p className="text-muted-foreground mb-8">
            Import your flashcards from a text file or paste them directly.
          </p>
          
          <ImportForm />
        </div>
      </div>
    </div>
  );
};

export default ImportPage;
