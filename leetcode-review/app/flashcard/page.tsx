import { ExitQuestionIcon } from "@/components/shared/flashcard/ExitQuestionIcon";
import { MultipleChoiceRadioButtons } from "@/components/shared/flashcard/MultipleChoiceRadioButtons";
import { QuestionContentCompactView } from "@/components/shared/flashcard/QuestionContentCompactView";
import { RadialProgress } from "@/components/shared/flashcard/RadialProgress";
import { getQuestionTitleAndContent } from "@/lib/leetcode/graphql/getQuestionTitleAndContent";

export default async function QuestionPage({
  searchParams,
}: {
  searchParams: { slug: string };
}) {
  const progressValue = Math.floor(Math.random() * 101);
  const { questionContent, questionTitle, questionDifficulty } =
    await getQuestionTitleAndContent(searchParams?.slug);

  return (
    <>
      {/* Progress Bar */}
      <div className="flex w-full items-center justify-between p-4">
        <ExitQuestionIcon slug={searchParams?.slug} />
        <RadialProgress value={progressValue} />
      </div>

      {/* Question */}
      <div className="flex w-full flex-1 flex-col">
        <QuestionContentCompactView
          title={questionTitle}
          content={questionContent}
          difficulty={questionDifficulty}
        />
      </div>

      {/* Answer */}
      <div className="flex w-full flex-1 flex-col">
        <MultipleChoiceRadioButtons />
      </div>
    </>
  );
}
