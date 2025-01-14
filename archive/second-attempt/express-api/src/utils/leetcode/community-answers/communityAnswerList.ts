import leetCodeRequest from "../leetCodeRequest";
import communitySolutionsQuery from "./communityAnswerList.query";

const getCommunityAnswerList = async (
  cookies: any,
  titleSlug: string,
  limit: number = 1
) => {
  try {
    const data = await leetCodeRequest(cookies, communitySolutionsQuery, {
      questionSlug: titleSlug,
      skip: 0,
      first: limit,
      languageTags: ["python3"],
      topicTags: [],
      orderBy: "most_votes",
    });

    const solutions = data.questionSolutions;
    return solutions?.solutions.map((s: any) => ({
      topicId: s.id,
      title: s.title,
      postId: s.post?.id,
      authorUrl: `https://leetcode.com/u/${s?.post?.author?.username}`,
      postUrl: `https://leetcode.com/problems/${titleSlug}/solutions/${
        s.id
      }/${toUrlFriendlyText(s.title)}`,
    }));
  } catch (e) {
    console.error("Exception in CommunityAnswerList", e);
    return null;
  }
};

const toUrlFriendlyText = (text: string) =>
  text
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9\s]/g, "") // Remove non-alphanumeric characters except spaces
    .trim() // Remove leading and trailing spaces
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
export default getCommunityAnswerList;
