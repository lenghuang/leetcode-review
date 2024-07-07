// Generate a random question based on one of the user's solved questions
// This will be really inefficient for now, for a POC
// First, fetch all questions
// Then, select a random one
// Then, get its corresponding submission
// Then, make a Duolingo UI based on it
// www.youtube.com/watch?v=dP75Khfy4s4

import { ExitQuestionIcon } from "@/components/shared/ExitQuestionIcon";
import { RadialProgress } from "@/components/shared/RadialProgress";

export default async function QuestionPage({
  searchParams,
}: {
  searchParams: { slug: string };
}) {
  const progressValue = Math.floor(Math.random() * 101);

  return (
    <>
      {/* Progress Bar */}
      <div className="flex w-full items-center justify-between p-4">
        <ExitQuestionIcon slug={searchParams?.slug} />
        <RadialProgress value={progressValue} />
      </div>

      {/* Question */}
      <div className="flex w-full flex-1 p-4"> this is question content</div>

      {/* Hint */}
    </>
  );
}
