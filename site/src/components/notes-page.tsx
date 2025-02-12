'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import useSwr from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function LoadingFallback() {
  return <Skeleton className="h-4 w-[200px]" />;
}

function NotesComponentData() {
  const { data, error, isLoading } = useSwr('/api/v0/getQuestions', fetcher);

  if (error) {
    return <>something went wrong</>;
  }

  if (isLoading) {
    return <LoadingFallback />;
  }

  return <>{JSON.stringify(data, null, 2)}</>;
}

export default function NotesComponentClient() {
  return (
    <>
      <h2 className="font-bold text-2xl mb-4">Your SQL (client) response</h2>
      <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
        <Suspense fallback={<LoadingFallback />}>
          <NotesComponentData />
        </Suspense>
      </pre>
    </>
  );
}
