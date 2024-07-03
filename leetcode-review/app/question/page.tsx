import { BackLink } from "@/components/shared/BackLink";
import { checkAuthAsync } from "@/utils/application/checkAuthAsync";
import {
  SubmissionListQueryResponse,
  getSubmissionListVariables,
  submissionListQuery,
} from "@/utils/leetcode/graphql/submission-list";

import { leetCodeRequest } from "@/utils/leetcode/leetCodeClient";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const getSubmissions = async (
  slug: string,
): Promise<SubmissionListQueryResponse> => {
  const data = await leetCodeRequest(
    submissionListQuery,
    getSubmissionListVariables(slug),
  );
  return data as SubmissionListQueryResponse;
};

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
    questionSubmissionList: { lastKey, hasNext, submissions },
  } = await getSubmissions(searchParams?.slug);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation or Header */}
      <header className="px-8 py-12">
        <BackLink href="/dashboard" />
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
          {!!searchParams?.slug && (
            <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">
              {searchParams.slug}
            </p>
          )}
          <p className="mb-2 mt-4 text-lg text-white lg:text-xl">
            5 of your submissions for this question.
          </p>
          <ul>
            {submissions.map((sub) => {
              const dateObject = new Date(sub?.timestamp * 1000);
              const status = sub?.statusDisplay;
              return (
                <li key={sub?.id}>
                  [{dateObject.toLocaleDateString()}{" "}
                  {dateObject.toLocaleTimeString()}] [{sub?.langName}] --{" "}
                  {status === "Accepted" ? (
                    <span className="text-green-700">{status}</span>
                  ) : (
                    status
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center">
        <p className="text-sm">Work in progress by lendevelops</p>
      </footer>
    </div>
  );
}
