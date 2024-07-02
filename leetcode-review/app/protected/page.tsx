import { checkAuthAsync } from "@/utils/application/checkAuthAsync";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import BackLink from "../../components/shared/BackLink";
import QuestionForm from "../../components/shared/QuestionForm";

export default async function ProtectedPage() {
  const supabase = createClient();

  const user = await checkAuthAsync(supabase);
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation or Header */}
      <header className="px-8 py-12">
        <BackLink />
      </header>

      {/* Title */}
      <section className="py-12 text-center">
        <h1 className="text-3xl font-bold leading-tight text-white lg:text-4xl">
          LeetCode Review
        </h1>
        <p className="mt-4 text-lg text-white lg:text-xl">
          The best way to review solved LeetCode questions, on the go.
        </p>
      </section>

      {/* Main Content */}
      <main className="flex-1 flex-col items-center justify-center">
        <div className="max-w-4xl px-3">
          <QuestionForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center">
        <p className="text-sm">Work in progress by lendevelops</p>
      </footer>
    </div>
  );
}
