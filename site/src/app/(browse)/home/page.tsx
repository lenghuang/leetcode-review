import NotesComponentClient from '@/components/layout/notes-page';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function HomePage() {
  const supabase = await createClient();
  const response = await supabase.from('GeneratedQuestions').select();

  if (response.error) {
    console.error(response.error);
    return <>something went wrong</>;
  }

  return (
    <div className="flex flex-col gap-2 items-start">
      <Button>
        <Link href="/study-session">Get started</Link>
      </Button>
      <h2 className="font-bold text-2xl mb-4">Theme switcher</h2>

      <h2 className="font-bold text-2xl mb-4">Your sql (server) response</h2>
      <pre
        className="text-xs font-mono p-3 rounded border max-h-[40vh] w-full max-w-[80vw]
          overflow-auto"
      >
        {JSON.stringify(response.data, null, 2)}
      </pre>
      <h2 className="font-bold text-2xl mb-4">Your SQL (client) response</h2>
      <NotesComponentClient />
    </div>
  );
}
