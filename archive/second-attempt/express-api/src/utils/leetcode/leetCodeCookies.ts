const cookieName = "LEETCODE_SESSION";

const getLeetCodeCookies = (req: any): string => {
  try {
    const session = req.cookies[cookieName];
    if (!session) {
      console.error("No session value found");
      return "";
    }
    return `${cookieName}=${session};`;
  } catch (e) {
    console.error("Error while parsing leetcode cookies", e);
    return "";
  }
};

export default getLeetCodeCookies;
