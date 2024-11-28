import { checkAuthAsync } from "@/lib/auth/checkAuthAsync";
import { createClient } from "@/lib/supabase/server";

import { redirect } from "next/navigation";

export default async function Index() {
  const supabase = createClient();

  const user = await checkAuthAsync(supabase);
  if (!user) {
    redirect("home");
  }

  return (
    <div>
      Here will be my app. Here we'll put different tiles for lessons you could
      explore. Array, trees, graphs, strings, etc. Here, we'll probably need a
      table for possible topics with our internal representation. As well as a
      mapping from leetcode topics to our own topics Once user clickes in to
      something here, we'll be able to go to a new page that has more specific
      info on that topic.
      <div className="m-8 flex max-w-96 flex-col gap-8 rounded-xl bg-neutral p-8 text-neutral-content">
        <div className="flex-1">todo make this a tile component </div>
        <div className="flex justify-end">
          <div className="btn btn-circle btn-accent rounded"> Go </div>
        </div>
      </div>
    </div>
  );
}
