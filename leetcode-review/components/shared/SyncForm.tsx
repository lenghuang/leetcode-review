import { SubmitButton } from "@/components/shared";
import { setCookieFromFormData } from "@/lib/auth/cookies";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const lcSessionCookieName = "LEETCODE_SESSION";
const csrftokenCookieName = "csrftoken";

export function SyncForm() {
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
      <form className="flex flex-col justify-center gap-2">
        {lcSessionCookie && csrftokenCookie && (
          <ValuesTable
            lcSessionCookie={lcSessionCookie}
            csrftokenCookie={csrftokenCookie}
          />
        )}
        <SubmitButton
          formAction={redirectToDashboard}
          className="mb-2 rounded-md bg-primary px-4 py-2 text-background"
          pendingText="Loading..."
        >
          Go To Dashboard
        </SubmitButton>
        <SubmitButton
          formAction={deleteCookieAction}
          className="mb-2 rounded-md bg-secondary px-4 py-2 text-foreground"
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

const ValuesTable1 = ({
  lcSessionCookie,
  csrftokenCookie,
}: {
  lcSessionCookie: RequestCookie;
  csrftokenCookie: RequestCookie;
}) => {
  return (
    <div className="mb-6 rounded-md border bg-base-300 px-4 py-6">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div className="flex flex-col sm:flex-row sm:gap-2">
          <div className="truncate text-pretty break-words text-primary">
            {lcSessionCookie.name}:
          </div>
          <div className="truncate text-pretty">{lcSessionCookie.value}</div>
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-2">
          <span className="truncate text-pretty text-primary">
            {csrftokenCookie.name}:
          </span>
          <span className="truncate text-pretty">{csrftokenCookie.value}</span>
        </div>
      </div>
      <hr className="my-4" />
    </div>
  );
};

const ValuesTable = ({
  lcSessionCookie,
  csrftokenCookie,
}: {
  lcSessionCookie: RequestCookie;
  csrftokenCookie: RequestCookie;
}) => {
  return (
    <div className="mb-6 rounded-md border bg-base-300 px-4 py-6">
      <div className="flex flex-row gap-2">
        <div className="text-pretty break-words text-primary">
          {lcSessionCookie.name}:
        </div>
        <div className="w-full text-pretty break-words">
          blahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblah
        </div>
      </div>
    </div>
  );
};
