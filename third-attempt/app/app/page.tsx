import { checkAuthAsync } from "@/lib/auth/checkAuthAsync";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

export default async function Index() {
  const supabase = createClient();

  const user = await checkAuthAsync(supabase);
  if (!user) {
    redirect("home");
  }

  return <div>Here will be my app</div>;
}
