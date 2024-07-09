import { ExitQuestionIcon } from "@/components/shared/flashcard/ExitQuestionIcon";
import { MultipleChoiceRadioButtons } from "@/components/shared/flashcard/MultipleChoiceRadioButtons";
import { QuestionContentCompactView } from "@/components/shared/flashcard/QuestionContentCompactView";
import { RadialProgress } from "@/components/shared/flashcard/RadialProgress";
import { checkAuthAsync } from "@/lib/auth/checkAuthAsync";
import { getQuestionTitleAndContent } from "@/lib/leetcode/graphql/getQuestionTitleAndContent";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

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

  const progressValue = Math.floor(Math.random() * 101);
  const {
    questionContent,
    questionTitle,
    questionDifficulty,
    questionFrontendId,
  } = await getQuestionTitleAndContent(searchParams?.slug);

  return (
    <>
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
          {" "}
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
        <MultipleChoiceRadioButtons />
      </div>
    </>
  );
}
