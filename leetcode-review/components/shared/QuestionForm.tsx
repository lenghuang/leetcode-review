"use client";

import { SubmitButton } from "@/components/shared/SubmitButton";
import { getProblemSetQuestionList } from "@/utils/leetcode/queries/getProblemSetQuestionList";
import Link from "next/link";
import { useState } from "react";

export default function QuestionForm() {
  const [questions, setQuestions] = useState<unknown>(null);

  const formActionInternal = async (formData: FormData) => {
    const data = await getProblemSetQuestionList(formData);
    if (!!data?.problemsetQuestionList) {
      setQuestions(data.problemsetQuestionList);
    } else {
      console.error("QuestionForm() failure");
    }
  };

  if (!!questions?.total && !!questions?.questions) {
    return (
      <div className="flex w-full flex-1 flex-col justify-center gap-2 rounded-md border-2 border-inherit p-8 text-foreground">
        <p className="text-md text-white">
          You&apos;ve got {questions.total} total questions solved! Including
          but not not limited to...
        </p>
        <ul>
          {questions.questions.map((q, index) => (
            <li key={index}>
              {q.title}, a question with {q.difficulty} difficulty.{" "}
              <Link
                className="text-green-700 underline"
                href={`/protected/question?slug=${q.titleSlug}`}
              >
                {" "}
                See more.{" "}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <form className="flex w-full flex-1 flex-col justify-center gap-2 text-foreground">
      <label className="text-md" htmlFor="text">
        LEETCODE_SESSION
      </label>
      <input
        className="mb-6 rounded-md border bg-inherit px-4 py-2"
        name="LEETCODE_SESSION"
        placeholder="some really long garbled text"
        required
      />
      <label className="text-md" htmlFor="text">
        csrftoken
      </label>
      <input
        className="mb-6 rounded-md border bg-inherit px-4 py-2"
        name="csrftoken"
        placeholder="some slightly less long garbled text"
        required
      />
      <SubmitButton
        formAction={formActionInternal}
        className="mb-2 rounded-md bg-green-700 px-4 py-2 text-foreground"
        pendingText="Loading..."
      >
        Get 10 of Your Solved LeetCode Questions
      </SubmitButton>
    </form>
  );
}
