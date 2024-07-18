import { BackLink, SyncForm } from "@/components/shared";

export default async function SyncPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation or Header */}
      <header className="px-8 py-12">
        <BackLink />
      </header>

      {/* Title */}
      <section className="text-pretty px-8 py-12 text-center">
        <h1 className="text-3xl font-bold leading-tight lg:text-4xl">
          Leetcode Login
        </h1>
        <p className="mt-4 text-pretty text-lg lg:text-xl">
          Log on to Leetcode.com, then take cookies from there and copy it here.
        </p>
      </section>

      {/* Main Content */}
      <main className="flex-1 flex-col items-center justify-center">
        <div className="max-w-4xl px-3">
          <SyncForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center">
        <p className="text-sm">Work in progress by lendevelops</p>
      </footer>
    </div>
  );
}
