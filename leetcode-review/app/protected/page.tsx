import { SubmitButton } from "@/components/tutorial/SubmitButton";
import { checkAuthAsync } from "@/utils/application/checkAuthAsync";
import { getProblemSetQuestionList } from "@/utils/leetcode/queries/getProblemSetQuestionList";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = createClient();

  const user = await checkAuthAsync(supabase);
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>

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
          formAction={getProblemSetQuestionList}
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Loading..."
        >
          Get 10 of Your Solved LeetCode Questions
        </SubmitButton>
      </form>
    </div>
  );
}
