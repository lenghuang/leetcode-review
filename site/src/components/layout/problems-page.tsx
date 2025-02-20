'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { ImportedQuestion } from '@/types/short-db.types';
import { KaggleDatasetQuestionMetadata } from '@/zod/kaggle_dataset_v0';
import { useState } from 'react';
import useSwr from 'swr';
import { Button } from '@/components/ui/button';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function TryGetKaggleV0Data({ problem }: { problem: ImportedQuestion }) {
  const { success, data } = KaggleDatasetQuestionMetadata.safeParse(
    problem.data
  );
  if (success) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
        <p>Difficulty: {data.difficulty}</p>
        <p>ID: {data.id}</p>
      </div>
    );
  }

  console.log('Failed to parse kaggle data');

  return false;
}

function LoadingFallback() {
  return (
    <div className="container mx-auto p-4">
      <div className="container mx-auto p-4">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-8 w-full w-max-[500px]" />
          <Skeleton className="h-4 w-full w-max-[300px]" />
          <Skeleton className="h-4 w-full w-max-[300px]" />
        </div>
      </div>
      <div className="container mx-auto p-4">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-8 w-full w-max-[500px]" />
          <Skeleton className="h-4 w-full w-max-[300px]" />
          <Skeleton className="h-4 w-full w-max-[300px]" />
        </div>
      </div>
      <div className="container mx-auto p-4">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-8 w-full w-max-[500px]" />
          <Skeleton className="h-4 w-full w-max-[300px]" />
          <Skeleton className="h-4 w-full w-max-[300px]" />
        </div>
      </div>
    </div>
  );
}

function DataFetchingComponent({ page = 0 }: { page: number }) {
  const {
    data: problems,
    error,
    isLoading,
  } = useSwr<ImportedQuestion[]>(
    `/api/v0/getImportedQuestions?page=${page}`,
    fetcher
  );

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (error) {
    return (
      <>
        <LoadingFallback />
        something went wrong
      </>
    );
  }

  return problems
    ?.map((p, i) => <ProblemsRow key={i} problem={p} />)
    .filter(Boolean);
}

function ProblemsRow({ problem }: { problem: ImportedQuestion }) {
  if (problem.source === 'kaggle/erichartford/leetcode-solutions-combined') {
    return <TryGetKaggleV0Data problem={problem} />;
  }

  console.log('ProblemsRow no match');
  return false;
}

export default function ProblemsPageClient() {
  const [page, setPage] = useState<number>(0);

  return (
    <div className="container mx-auto p-4">
      <DataFetchingComponent page={page} />
      <div className="flex gap-2 mt-4 justify-center">
        <Button
          onClick={() => setPage(Math.max(0, page - 1))}
          disabled={page === 0}
        >
          Previous
        </Button>
        {/* Should do this with query params/server actions instead, and */}
        {/* preload next page to know to disable last button */}
        <Button onClick={() => setPage(page + 1)}>Next</Button>
      </div>
    </div>
  );
}
