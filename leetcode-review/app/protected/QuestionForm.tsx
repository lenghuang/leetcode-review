"use client";

import { SubmitButton } from "@/components/shared/SubmitButton";
import { getProblemSetQuestionList } from "@/utils/leetcode/queries/getProblemSetQuestionList";
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
      <div className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground rounded-md border-2 border-inherit p-8">
        <p className="text-md text-white">
          You&apos;ve got {questions.total} total questions solved! Including
          but not not limited to...
        </p>
        <ul>
          {questions.questions.map((q, index) => (
            <li key={index}>
              {q.title}, a question with {q.difficulty} difficulty.
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
      <label className="text-md" htmlFor="text">
        LEETCODE_SESSION
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="LEETCODE_SESSION"
        placeholder="some really long garbled text"
        required
      />
      <label className="text-md" htmlFor="text">
        csrftoken
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="csrftoken"
        placeholder="some slightly less long garbled text"
        required
      />
      <SubmitButton
        formAction={formActionInternal}
        className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
        pendingText="Loading..."
      >
        Get 10 of Your Solved LeetCode Questions
      </SubmitButton>
    </form>
  );
}
