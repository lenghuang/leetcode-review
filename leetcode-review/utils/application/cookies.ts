import { cookies } from "next/headers";

const lcSessionCookieName = "LEETCODE_SESSION";
const csrftokenCookieName = "csrftoken";

export const setCookieFromFormData = (
  cookieName: string,
  formData: FormData,
) => {
  const cookieFromFormData = formData.get(cookieName) as string;
  cookies().set(cookieName, cookieFromFormData);
};

export const isSyncedToLeetCode = () => {
  const cookieStore = cookies();
  return (
    !!cookieStore.get(lcSessionCookieName) &&
    !!cookieStore.get(csrftokenCookieName)
  );
};

const getCookieString = (cookieName: string) => {
  const requestCookie = cookies().get(cookieName);
  if (requestCookie) return `${requestCookie?.name}=${requestCookie?.value}`;
  return "";
};

export const getLeetcodeCookieString = () => {
  const cookieList: string[] = [];
  cookieList.push(getCookieString(lcSessionCookieName));
  cookieList.push(getCookieString(csrftokenCookieName));
  return cookieList.join("; ");
};
