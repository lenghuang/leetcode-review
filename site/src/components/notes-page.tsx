'use client';

import { createClient as createClientClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export default function NotesComponentClient() {
  const [notes, setNotes] = useState<any[] | null>(null);
  const supabase = createClientClient();

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase
        .from('GeneratedQuestions')
        .select();

      if (error) {
        console.error('Supabase error:', error);
        return;
      }

      setNotes(data);
    };
    getData();
  }, []);

  return (
    <>
      <h2 className="font-bold text-2xl mb-4">Your SQL (client) response</h2>
      <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
        {JSON.stringify(notes, null, 2)}
      </pre>
    </>
  );
}
