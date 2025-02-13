'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { GeneratedQuestion } from '@/types/short-db.types';
import useSwr from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function LoadingFallback() {
  return <Skeleton className="h-8 w-[200px]" />;
}

function NotesComponentData() {
  const { data, error, isLoading } = useSwr<GeneratedQuestion[]>(
    '/api/v0/getQuestions',
    fetcher
  );

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (error) {
    return <>something went wrong</>;
  }

  return <>{JSON.stringify(data, null, 2)}</>;
}

export default function NotesComponentClient() {
  return (
    <pre className="text-xs font-mono p-3 rounded border max-h-[40vh] w-full max-w-[80vw] overflow-auto">
      <NotesComponentData />
    </pre>
  );
}
