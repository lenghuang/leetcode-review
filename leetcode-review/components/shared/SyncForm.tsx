import { SubmitButton } from "@/components/shared/SubmitButton";
import { setCookieFromFormData } from "@/utils/application/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const lcSessionCookieName = "LEETCODE_SESSION";
const csrftokenCookieName = "csrftoken";

export default function SyncForm() {
  const upsertCookieAction = async (formData: FormData) => {
    "use server";
    setCookieFromFormData(lcSessionCookieName, formData);
    setCookieFromFormData(csrftokenCookieName, formData);
  };

  const deleteCookieAction = async () => {
    "use server";
    cookies().delete(lcSessionCookieName);
    cookies().delete(csrftokenCookieName);
    redirect("/sync");
  };

  const redirectToDashboard = async () => {
    "use server";
    redirect("/dashboard");
  };

  const synced =
    cookies().has(csrftokenCookieName) && cookies().has(lcSessionCookieName);

  if (synced) {
    const lcSessionCookie = cookies().get(lcSessionCookieName);
    const csrftokenCookie = cookies().get(csrftokenCookieName);

    return (
      <form className="flex w-full flex-1 flex-col justify-center gap-2 text-foreground">
        <div className="mb-6 rounded-md border bg-inherit px-4 py-6">
          <div className="truncate">
            <span className="truncate text-green-700">
              {lcSessionCookie?.name}:
            </span>{" "}
            {lcSessionCookie?.value}
          </div>
          <hr className="my-4" />
          <div className="truncate">
            <span className="truncate text-green-700">
              {csrftokenCookie?.name}:
            </span>{" "}
            {csrftokenCookie?.value}
          </div>{" "}
        </div>
        <SubmitButton
          formAction={redirectToDashboard}
          className="mb-2 rounded-md bg-green-700 px-4 py-2 text-background"
          pendingText="Loading..."
        >
          Go To Dashboard
        </SubmitButton>
        <SubmitButton
          formAction={deleteCookieAction}
          className="mb-2 rounded-md bg-green-200 px-4 py-2 text-foreground"
          pendingText="Loading..."
        >
          Delete Your Cookies
        </SubmitButton>
      </form>
    );
  }

  return (
    <form className="flex w-full flex-1 flex-col justify-center gap-2 text-foreground">
      <label className="text-md" htmlFor="text">
        {lcSessionCookieName}
      </label>
      <input
        className="mb-6 rounded-md border bg-inherit px-4 py-2"
        name="LEETCODE_SESSION"
        placeholder="some really long garbled text"
        required
      />
      <label className="text-md" htmlFor="text">
        {csrftokenCookieName}
      </label>
      <input
        className="mb-6 rounded-md border bg-inherit px-4 py-2"
        name="csrftoken"
        placeholder="some slightly less long garbled text"
        required
      />
      <SubmitButton
        formAction={upsertCookieAction}
        className="mb-2 rounded-md bg-green-700 px-4 py-2 text-foreground"
        pendingText="Loading..."
      >
        Set Your Cookies
      </SubmitButton>
    </form>
  );
}
