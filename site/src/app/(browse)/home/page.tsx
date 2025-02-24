import { BrowseHeader } from '@/components/typography/BrowseHeader';

export default async function HomePage() {
  return (
    <div className="flex flex-col gap-2 items-start">
      <BrowseHeader>Go to study page</BrowseHeader>
    </div>
  );
}
