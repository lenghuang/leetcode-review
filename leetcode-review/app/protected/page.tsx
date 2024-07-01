import { checkAuthAsync } from "@/utils/application/checkAuthAsync";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import BackLink from "./BackLink";
import QuestionForm from "./QuestionForm";

export default async function ProtectedPage() {
  const supabase = createClient();

  const user = await checkAuthAsync(supabase);
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation or Header */}
      <header className="px-8 py-12">
        <BackLink />
      </header>

      {/* Title */}
      <section className="text-center py-12">
        <h1 className="text-3xl lg:text-4xl leading-tight font-bold text-white">
          LeetCode Review
        </h1>
        <p className="text-lg lg:text-xl text-white mt-4">
          The best way to review solved LeetCode questions, on the go.
        </p>
      </section>

      {/* Main Content */}
      <main className="flex-1 flex-col justify-center items-center">
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
