// cookieUtils.ts

export const formDataToCookies = (formData: FormData): string => {
  const cookies: string[] = [];

  console.log(formData);

  // Iterate over FormData entries
  for (const [key, value] of formData.entries()) {
    // Concatenate key-value pair
    cookies.push(`${key}=${value}`);
  }

  // Join cookies with '; ' to form the cookie string
  return cookies.join("; ");
};
