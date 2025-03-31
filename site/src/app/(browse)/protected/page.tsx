import { signOutAction } from '@/app/actions';
import { ThemeSwitcherCta } from '@/components/theme-switcher/theme-switcher-cta';
import { SubmitButton } from '@/components/buttons/submit-button';
import { BrowseHeader } from '@/components/typography/browse-header';
import { createClient } from '@/utils/supabase/server';
import { InfoIcon } from 'lucide-react';
import { redirect } from 'next/navigation';
import {
  FormMessage,
  Message,
} from '@/components/auth-components/form-message';

export default async function ProtectedPage(props: {
  searchParams: Promise<Message>;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/sign-in');
  }

  const searchParams = await props.searchParams;

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex flex-col gap-2 items-start">
        <BrowseHeader>Your user details</BrowseHeader>
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
        <pre
          className="text-xs font-mono p-3 rounded border max-h-[40vh] w-full max-w-[80vw]
            overflow-auto"
        >
          {JSON.stringify(user, null, 2)}
        </pre>
        <ThemeSwitcherCta />
        <SubmitButton pendingText="Signing Out..." onClick={signOutAction}>
          Sign out
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </div>
  );
}
