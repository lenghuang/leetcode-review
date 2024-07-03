import {
  ProblemsetQuestionListResponse,
  getProblemsetQuestionListVariables,
  problemsetQuestionListQuery,
} from "@/utils/leetcode/graphql/problemset-question-list";
import { leetCodeRequest } from "@/utils/leetcode/leetCodeClient";
import Link from "next/link";
import { redirect } from "next/navigation";

const getQuestions = async (): Promise<ProblemsetQuestionListResponse> => {
  const data = await leetCodeRequest(
    problemsetQuestionListQuery,
    getProblemsetQuestionListVariables(),
  );
  return data as ProblemsetQuestionListResponse;
};

export const QuestionForm = async () => {
  const {
    problemsetQuestionList: { total, questions },
  } = await getQuestions();

  if (total && questions) {
    return (
      <div className="flex w-full flex-1 flex-col justify-center gap-2 rounded-md border-2 border-inherit p-8 text-foreground">
        <p className="text-md">
          You&apos;ve got {total} total questions solved! Including but not not
          limited to...
        </p>
        <ul>
          {questions.map((q, index) => (
            <li key={index}>
              {q.title}, a question with {q.difficulty} difficulty.{" "}
              <Link
                className="text-green-700 underline"
                href={`/question?slug=${q.titleSlug}`}
              >
                {" "}
                See more.
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return redirect("/sync");
};
