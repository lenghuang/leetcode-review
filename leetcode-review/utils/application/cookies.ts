import { cookies } from "next/headers";

export const setCookieFromFormData = (
  cookieName: string,
  formData: FormData,
) => {
  const cookieFromFormData = formData.get(cookieName) as string;
  cookies().set(cookieName, cookieFromFormData);
};
