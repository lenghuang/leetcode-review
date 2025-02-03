import supabase from "../supabase";

const TABLE_NAME = "UserQuestionDataFromLeetcode";

export const insertLeetcodeQuestion = async ({
  id,
  title,
  titleSlug,
  lang,
  langName,
  url,
  timestamp,
  topicTags,
  code,
}: {
  id: String;
  title: String;
  titleSlug: String;
  lang: String;
  langName: String;
  url: String;
  timestamp: any;
  topicTags: Array<String>;
  code: String;
}) => {
  try {
    const { error } = await supabase.from(TABLE_NAME).insert({
      leetcode_submission_id: id,
      leetcode_title: title,
      leetcode_title_slug: titleSlug,
      leetcode_lang: lang,
      leetcode_lang_name: langName,
      leetcode_code: code,
      leetcode_topic_tags: topicTags,
    });

    if (error) {
      console.error("Supabase Error -- insertLeetcodeQuestion", error);
    } else {
      return true;
    }
  } catch (e) {
    console.error("Supabase Exception -- insertLeetcodeQuestion", e);
  }
  return false;
};
