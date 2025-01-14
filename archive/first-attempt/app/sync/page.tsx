import { NavBar, SyncForm } from "@/components/shared";

export default async function SyncPage() {
  return (
    <div className="flex min-h-screen min-w-full flex-col items-center">
      <NavBar />
      <div className="flex max-w-screen-lg flex-1 flex-col gap-4">
        {/* Navigation / Header */}
        <h1 className="mt-8 text-xl font-bold">
          Connect your LeetCode account
        </h1>
        {/* Main Content */}
        <SyncForm />
      </div>
      {/* Footer */}
      <footer className="min-w-full bg-neutral py-4 text-center text-neutral-content">
        <p className="text-sm">Work in progress by lendevelops</p>
      </footer>
    </div>
  );
}
