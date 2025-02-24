import ProblemsPageClient from '@/components/layout/problems-page';
import { BrowseHeader } from '@/components/typography/BrowseHeader';

export default async function SearchPage() {
  return (
    <div className="flex flex-col gap-2 items-start">
      <BrowseHeader>Your sql (server) response</BrowseHeader>
      <ProblemsPageClient />
    </div>
  );
}
