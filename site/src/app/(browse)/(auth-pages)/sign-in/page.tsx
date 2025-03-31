import { signInAction, signInChromeExtension } from '@/app/actions';
import {
  FormMessage,
  Message,
} from '@/components/auth-components/form-message';
import { SubmitButton } from '@/components/buttons/submit-button';
import { BrowseHeader } from '@/components/typography/browse-header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default async function Login(props: { searchParams: Promise<Message> }) {
  // pass in isExtension as query param
  const searchParams = await props.searchParams;
  const submitAction = !!searchParams.isExtension
    ? signInChromeExtension
    : signInAction;

  return (
    <form className="flex flex-col min-w-64 max-w-64 mx-auto">
      <BrowseHeader>Sign in</BrowseHeader>
      <p className="text-sm text-foreground">
        Don't have an account?{' '}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Sign up
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <SubmitButton pendingText="Signing In..." formAction={submitAction}>
          Sign in
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
