import { checkAuthAsync } from "@/lib/auth/checkAuthAsync";
import { AppRouterPath } from "@/lib/enums";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Index() {
  const supabase = createClient();

  const user = await checkAuthAsync(supabase);
  if (!user) {
    redirect(AppRouterPath.Home);
  }

  redirect(AppRouterPath.Explore);
}
