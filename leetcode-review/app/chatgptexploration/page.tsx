import { ExitQuestionIcon } from "@/components/shared/flashcard/ExitQuestionIcon";
import { QuestionContentCompactView } from "@/components/shared/flashcard/QuestionContentCompactView";
import { RadialProgress } from "@/components/shared/flashcard/RadialProgress";
import { checkAuthAsync } from "@/lib/auth/checkAuthAsync";
import { getIntuition } from "@/lib/chatgpt/functions/intuition";
import { getQuestionTitleAndContent } from "@/lib/leetcode";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function QuestionPage({
  searchParams,
}: {
  searchParams: { slug: string; ai: boolean };
}) {
  const supabase = createClient();

  const user = await checkAuthAsync(supabase);
  if (!user) {
    redirect("/login");
  }

  const progressValue = Math.floor(Math.random() * 101);
  const {
    questionContent,
    questionTitle,
    questionDifficulty,
    questionFrontendId,
  } = await getQuestionTitleAndContent(searchParams?.slug);

  const intuition = !!searchParams?.ai
    ? await getIntuition(searchParams?.slug)
    : "Avoiding ChatGPT call. Add [ &ai=true ] to trigger it";

  return (
    <div className="flex min-h-screen max-w-screen-lg flex-col">
      {/* Progress Bar */}
      <div className="flex w-full items-center justify-between p-4">
        <ExitQuestionIcon />
        <RadialProgress value={progressValue} />
      </div>

      {/* Question */}
      {!!questionContent &&
      !!questionTitle &&
      !!questionDifficulty &&
      !!questionFrontendId ? (
        <div className="flex w-full flex-col">
          <QuestionContentCompactView
            title={questionTitle}
            content={questionContent}
            difficulty={questionDifficulty}
            questionId={questionFrontendId}
          />
        </div>
      ) : (
        <div role="alert" className="alert alert-error">
          <span>Error -- Failed to retrieve data.</span>
        </div>
      )}

      {/* Answer */}
      <div className="flex w-full flex-1 flex-col p-4">
        <h1 className="mb-2 text-xl font-bold">Problem Intuition</h1>
        <p>{intuition}</p>
      </div>
    </div>
  );
}
