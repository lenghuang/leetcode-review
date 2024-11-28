import { QuestionForm } from "@/components/app/dashboard";
import { NavBar } from "@/components/shared";
import { checkAuthAsync } from "@/lib/auth/checkAuthAsync";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

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
      <footer className="min-w-full bg-neutral py-4 text-center text-neutral-content">
        <p className="text-sm">Work in progress by lendevelops</p>
      </footer>
    </div>
  );
}
