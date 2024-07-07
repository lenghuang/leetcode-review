import { SubmitButton } from "@/components/shared/SubmitButton";
import { redirect } from "next/navigation";

const redirectToDashboard = async () => {
  "use server";
  redirect("/dashboard");
};

export default async function Index() {
  return (
    <div className="flex max-w-4xl flex-1 flex-col gap-20 px-3">
      leetcode, work in progress{" "}
      <form>
        <SubmitButton
          formAction={redirectToDashboard}
          className="mb-2 rounded-md bg-green-700 px-4 py-2 text-background"
          pendingText="Loading..."
        >
          Go To Dashboard
        </SubmitButton>
      </form>
    </div>
  );
}
