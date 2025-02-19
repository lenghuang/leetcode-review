import NotesComponentClient from '@/components/notes-page';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { createClient } from '@/utils/supabase/server';

export default async function NotesPage() {
  const supabase = await createClient();
  const response = await supabase.from('GeneratedQuestions').select();

  if (response.error) {
    console.error(response.error);
    return <>something went wrong</>;
  }

  return (
    <div className="w-full max-w-7xl flex flex-col gap-20 p-5">
      <div className="flex-1 w-full flex flex-col gap-12">
        <div className="flex flex-col gap-2 items-start">
          <h2 className="font-bold text-2xl mb-4">Theme switcher</h2>
          <ThemeSwitcher />
          <h2 className="font-bold text-2xl mb-4">
            Your sql (server) response
          </h2>
          <pre
            className="text-xs font-mono p-3 rounded border max-h-[40vh] w-full max-w-[80vw]
              overflow-auto"
          >
            {JSON.stringify(response.data, null, 2)}
          </pre>
          <h2 className="font-bold text-2xl mb-4">
            Your SQL (client) response
          </h2>
          <NotesComponentClient />
        </div>
      </div>
    </div>
  );
}
