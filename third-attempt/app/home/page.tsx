import { SubmitButton } from "@/components/shared";
import { redirect } from "next/navigation";

const redirectToDashboard = async () => {
  "use server";
  redirect("/app");
};

export default async function Index() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-20 px-3">
      <h1 className="text-3xl font-bold leading-tight lg:text-4xl">
        WIP Landing Page
      </h1>
      <form>
        <SubmitButton
          formAction={redirectToDashboard}
          className="btn btn-primary mb-2 rounded-md px-4 py-2 text-primary-content"
          pendingText="Loading..."
        >
          Get Started
        </SubmitButton>
      </form>
    </div>
  );
}
