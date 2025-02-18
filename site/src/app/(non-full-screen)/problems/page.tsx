import React from 'react';
import ProblemsPageClient from '@/components/problems-page';

export default async function ProblemsPage() {
  return (
    <div className="w-full max-w-7xl flex flex-col gap-20 p-5">
      <div className="flex-1 w-full flex flex-col gap-12">
        <div className="flex flex-col gap-2 items-start">
          <h2 className="font-bold text-2xl mb-4">
            Your sql (server) response
          </h2>
          <ProblemsPageClient />
        </div>
      </div>
    </div>
  );
}
