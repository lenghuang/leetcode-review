// Generate a random question based on one of the user's solved questions
// This will be really inefficient for now, for a POC
// First, fetch all questions
// Then, select a random one
// Then, get its corresponding submission
// Then, make a Duolingo UI based on it
// www.youtube.com/watch?v=dP75Khfy4s4

import { ExitQuestionIcon } from "@/components/shared/ExitQuestionIcon";

export default async function QuestionPage({
  searchParams,
}: {
  searchParams: { slug: string };
}) {
  return (
    <>
      {/* Progress Bar */}
      <div className="flex w-full bg-red-50 p-4">
        <ExitQuestionIcon slug={searchParams?.slug} />
      </div>
      {/* Question */}
      <div className="flex w-full flex-1 bg-yellow-50 p-4">
        {" "}
        this is question content
      </div>
      {/* Hint */}
    </>
  );
}
