import leetCodeRequest from "../leetCodeRequest";
import communityAnswerSingleQuery from "./communityAnswerSingle.query";

const getCommunityAnswerSingle = async (cookies: any, topicId: number) => {
  try {
    const data = await leetCodeRequest(cookies, communityAnswerSingleQuery, {
      topicId: topicId,
    });

    return toPost(data?.topic);
  } catch (e) {
    console.error("Exception in CommunityAnswerSingle", e);
    return null;
  }
};

const toPost = (t: any) => ({
  topicId: t.id,
  title: t.title,
  content: t.post.content,
});

export default getCommunityAnswerSingle;
