import BackLink from "@/components/shared/BackLink";
import { checkAuthAsync } from "@/utils/application/checkAuthAsync";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function QuestionPage({
  searchParams,
}: {
  searchParams: { slug: string };
}) {
  const supabase = createClient();
  const user = await checkAuthAsync(supabase);
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      {/* Navigation or Header */}
      <header className="px-8 py-12">
        <BackLink href="/protected" />
      </header>
      {!!searchParams?.slug && (
        <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">
          {searchParams.slug}
        </p>
      )}
    </div>
  );
}
