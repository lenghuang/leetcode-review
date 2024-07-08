// Generate a random question based on one of the user's solved questions
// This will be really inefficient for now, for a POC
// First, fetch all questions
// Then, select a random one
// Then, get its corresponding submission
// Then, make a Duolingo UI based on it
// www.youtube.com/watch?v=dP75Khfy4s4

import { ExitQuestionIcon } from "@/components/shared/flashcard/ExitQuestionIcon";
import { QuestionContentCompactView } from "@/components/shared/flashcard/QuestionContentCompactView";
import { RadialProgress } from "@/components/shared/flashcard/RadialProgress";
import {
  QuestionContentQueryResponse,
  getQuestionContentVariables,
  questionContentQuery,
} from "@/lib/leetcode/graphql/question-content";
import { leetCodeRequest } from "@/lib/leetcode/leetCodeClient";

const getQuestionContent = async (
  slug: string,
): Promise<QuestionContentQueryResponse> => {
  const data = await leetCodeRequest(
    questionContentQuery,
    getQuestionContentVariables(slug),
  );
  return data as QuestionContentQueryResponse;
};

export default async function QuestionPage({
  searchParams,
}: {
  searchParams: { slug: string };
}) {
  const progressValue = Math.floor(Math.random() * 101);
  const {
    question: { content },
  } = await getQuestionContent(searchParams?.slug);

  return (
    <>
      {/* Progress Bar */}
      <div className="flex w-full items-center justify-between p-4">
        <ExitQuestionIcon slug={searchParams?.slug} />
        <RadialProgress value={progressValue} />
      </div>

      {/* Question */}
      <div className="flex w-full flex-1 flex-col">
        <QuestionContentCompactView content={content} />
      </div>

      {/* Hint */}
    </>
  );
}
