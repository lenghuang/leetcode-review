'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { ImportedQuestion } from '@/types/short-db.types';
import useSwr from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function LoadingFallback() {
  return <Skeleton className="h-8 w-[200px]" />;
}

function DataFetchingComponent() {
  const { data, error, isLoading } = useSwr<ImportedQuestion[]>(
    '/api/v0/getImportedQuestions',
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

export default function ProblemsPageClient() {
  return (
    <pre className="text-xs font-mono p-3 rounded border max-h-[40vh] w-full max-w-[80vw] overflow-auto">
      <DataFetchingComponent />
    </pre>
  );
}
