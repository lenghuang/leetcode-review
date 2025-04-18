import { NavBar } from "@/components/NavBar";
import { checkAuthAsync } from "@/lib/auth/checkAuthAsync";
import { AppRouterPath } from "@/lib/enums";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Leetcode Review",
  description: "Quickly refresh your memory on LeetCode problems.",
};

export default async function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const user = await checkAuthAsync(supabase);
  if (!user) {
    redirect(AppRouterPath.Home);
  }

  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
