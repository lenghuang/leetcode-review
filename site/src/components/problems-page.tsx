'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { ImportedQuestion } from '@/types/short-db.types';
import { KaggleDatasetQuestionMetadata } from '@/zod/kaggle_dataset_v0';
import { useState } from 'react';
import useSwr from 'swr';

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

  return false;
}

function LoadingFallback() {
  return <Skeleton className="h-8 w-[200px]" />;
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
    return <>something went wrong</>;
  }

  return problems
    ?.map((p, i) => <ProblemsRow key={i} problem={p} />)
    .filter(Boolean);
}

function ProblemsRow({ problem }: { problem: ImportedQuestion }) {
  if (problem.source === 'kaggle/erichartford/leetcode-solutions-combined') {
    return <TryGetKaggleV0Data problem={problem} />;
  }

  return false;
}

export default function ProblemsPageClient() {
  const [page, setPageNumber] = useState<number>(0);

  return (
    <div className="container mx-auto p-4">
      <DataFetchingComponent page={page} />
    </div>
  );
}
