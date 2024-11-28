import { SubmitButton } from "@/components";
import { checkAuthAsync } from "@/lib/auth/checkAuthAsync";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const redirectToDashboard = async () => {
  "use server";
  const supabase = createClient();
  const user = await checkAuthAsync(supabase);
  if (!user) {
    redirect("/home/login");
  } else {
    redirect("/app");
  }
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
