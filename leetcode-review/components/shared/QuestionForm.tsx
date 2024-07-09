import {
  ProblemsetQuestionListResponse,
  getProblemsetQuestionListVariables,
  problemsetQuestionListQuery,
} from "@/lib/leetcode/graphql/problemset-question-list";
import { leetCodeRequest } from "@/lib/leetcode/leetCodeClient";
import { redirect } from "next/navigation";
import { LinkWithLoadingText } from "./LinkWithLoadingText";

const getQuestions = async (): Promise<ProblemsetQuestionListResponse> => {
  const data = await leetCodeRequest(
    problemsetQuestionListQuery,
    getProblemsetQuestionListVariables(),
  );
  return (data ?? {
    problemsetQuestionList: null,
  }) as ProblemsetQuestionListResponse;
};

export const QuestionForm = async () => {
  const { problemsetQuestionList } = await getQuestions();
  const total = problemsetQuestionList?.total;
  const questions = problemsetQuestionList?.questions;

  if (total && questions) {
    return (
      <div className="bg-base-200 mx-4 my-8 flex flex-col justify-center gap-2 rounded-xl p-4">
        <p className="font-semibold">
          You&apos;ve got {total} total questions solved! Including but not not
          limited to...
        </p>
        <ul className="list-disc pl-4">
          {questions.map((q, index) => (
            <li key={index}>
              <span className="text-neutral font-semibold">{q.title}</span>, a
              question with {q.difficulty} difficulty.{" "}
              <LinkWithLoadingText href={`/flashcard?slug=${q.titleSlug}`}>
                {" "}
                See more.
              </LinkWithLoadingText>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return redirect("/sync");
};
