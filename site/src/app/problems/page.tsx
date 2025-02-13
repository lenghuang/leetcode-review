import NotesComponentClient from '@/components/notes-page';

export default async function ProblemsPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your sql (server) response</h2>
        <NotesComponentClient />
      </div>
    </div>
  );
}
