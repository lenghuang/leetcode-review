import { LinkWithLoadingText } from "@/components/shared";
import { getQuestions } from "@/lib/leetcode";
import { redirect } from "next/navigation";

export const QuestionForm = async () => {
  const { problemsetQuestionList } = await getQuestions();
  const total = problemsetQuestionList?.total;
  const questions = problemsetQuestionList?.questions;

  if (total && questions) {
    return (
      <div className="mx-4 my-8 flex flex-col justify-center gap-2 rounded-xl bg-base-200 p-4">
        <p className="font-semibold">
          You&apos;ve got {total} total questions solved! Including but not not
          limited to...
        </p>
        <ul className="list-disc pl-4">
          {questions.map((q, index) => (
            <li key={index}>
              <span className="font-semibold text-neutral">{q.title}</span>, a
              question with {q.difficulty} difficulty.{" "}
              <LinkWithLoadingText
                href={`/chatgptexploration?slug=${q.titleSlug}`}
              >
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
