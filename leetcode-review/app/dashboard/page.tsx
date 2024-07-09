import { NavBar } from "@/components/shared/NavBar";
import { checkAuthAsync } from "@/lib/auth/checkAuthAsync";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { QuestionForm } from "../../components/shared/QuestionForm";

export default async function Dashboard() {
  const supabase = createClient();

  const user = await checkAuthAsync(supabase);
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen min-w-full flex-col items-center">
      <NavBar />
      <div className="flex max-w-screen-lg flex-1 flex-col">
        {/* Navigation / Header */}
        <h1 className="mx-4 mt-8 text-xl font-bold">Your dashboard</h1>
        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          <QuestionForm />
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-neutral text-neutral-content min-w-full py-4 text-center">
        <p className="text-sm">Work in progress by lendevelops</p>
      </footer>
    </div>
  );
}
