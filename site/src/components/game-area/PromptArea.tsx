'use client';

import { ImportedQuestion } from '@/types/short-db.types';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PromptArea() {
  const { data, error, isLoading } = useSWR<ImportedQuestion>(
    '/api/v0/getSingleImportedQuestion',
    fetcher
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Instructions</h2>
      <p className="text-gray-700">{data.id}</p>{' '}
      <p className="text-gray-700">{JSON.stringify(data.data)}</p>{' '}
    </div>
  );
}
