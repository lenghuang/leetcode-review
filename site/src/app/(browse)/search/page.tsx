import ProblemsPageClient from '@/components/layout/problems-page';

export default async function SearchPage() {
  return (
    <div className="flex flex-col gap-2 items-start">
      <h2 className="font-bold text-2xl mb-4">Your sql (server) response</h2>
      <ProblemsPageClient />
    </div>
  );
}
