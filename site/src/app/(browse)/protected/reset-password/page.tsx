import { resetPasswordAction } from '@/app/actions';
import {
  FormMessage,
  Message,
} from '@/components/auth-components/form-message';
import { SubmitButton } from '@/components/buttons/submit-button';
import { BrowseHeader } from '@/components/typography/browse-header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className="w-full max-w-7xl flex flex-col gap-20 p-5">
      <form className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4">
        <BrowseHeader>Reset password</BrowseHeader>
        <p className="text-sm text-foreground/60">
          Please enter your new password below.
        </p>
        <Label htmlFor="password">New password</Label>
        <Input
          type="password"
          name="password"
          placeholder="New password"
          required
        />
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          required
        />
        <SubmitButton formAction={resetPasswordAction}>
          Reset password
        </SubmitButton>
        <FormMessage message={searchParams} />
      </form>
    </div>
  );
}
