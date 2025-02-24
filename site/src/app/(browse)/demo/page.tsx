import NotesComponentClient from '@/components/layout/notes-page';
import { ThemeSwitcher } from '@/components/theme-switcher/theme-switcher';
import { BrowseHeader } from '@/components/typography/BrowseHeader';
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
      <BrowseHeader>Demo page of random stuff</BrowseHeader>
      <Button>
        <Link href="/study-session">Get started</Link>
      </Button>
      <BrowseHeader>Theme switcher</BrowseHeader>
      <ThemeSwitcher />
      <BrowseHeader>Your sql (server) response</BrowseHeader>
      <pre
        className="text-xs font-mono p-3 rounded border max-h-[40vh] w-full max-w-[80vw]
          overflow-auto"
      >
        {JSON.stringify(response.data, null, 2)}
      </pre>
      <BrowseHeader>Your SQL (client) response</BrowseHeader>
      <NotesComponentClient />
    </div>
  );
}
