import { BackLink } from "@/components/shared/BackLink";
import { checkAuthAsync } from "@/lib/auth/checkAuthAsync";
import { getQuestionContent, getSubmissions } from "@/lib/leetcode";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { QuestionContentView } from "../../components/shared/QuestionContentView";
import { SubmissionView } from "../../components/shared/SubmissionView";

export default async function QuestionPage({
  searchParams,
}: {
  searchParams: { slug: string };
}) {
  const supabase = createClient();

  const user = await checkAuthAsync(supabase);
  if (!user) {
    redirect("/login");
  }

  const {
    questionSubmissionList: { submissions },
  } = await getSubmissions(searchParams?.slug);

  const {
    question: { content },
  } = await getQuestionContent(searchParams?.slug);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation or Header */}
      <header className="px-8 py-12">
        <BackLink href="/dashboard" />
      </header>

      {/* Title */}
      <section className="py-12 text-center">
        <h1 className="text-3xl font-bold leading-tight lg:text-4xl">
          LeetCode Review
        </h1>
        <p className="e mt-4 text-lg lg:text-xl">
          The best way to review solved LeetCode questions, on the go.
        </p>
      </section>

      {/* Main Content */}
      <main className="flex-1 flex-col items-center justify-center">
        <div className="max-w-4xl px-3">
          {!!searchParams?.slug && (
            <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">
              {searchParams.slug}
            </p>
          )}
          <div className="flex-none">
            <QuestionContentView content={content} />
          </div>
          <p className="mb-2 mt-4 text-lg lg:text-xl">
            5 of your submissions for this question.
          </p>
          <div className="flex-none">
            <SubmissionView submissions={submissions} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center">
        <p className="text-sm">Work in progress by lendevelops</p>
      </footer>
    </div>
  );
}
