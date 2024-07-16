import { getQuestionContent, getSingleQuestionTopicTags } from "@/lib/leetcode";
import { getOneAcceptedSubmission } from "@/lib/leetcode/fetchers/getOneAcceptedSubmission";
import openai from "../../openai";
import { getIntuitionPrompt } from "./intuition.prompt";

export const getIntuition = async (slug: string): Promise<string> => {
  // Get Topic Tags
  const { question } = await getSingleQuestionTopicTags(slug);
  if (!question?.topicTags) {
    return "Error while retrieving content.";
  }
  const topicTags = question.topicTags.map((x) => x.name);

  // Get Question Content
  const {
    question: { content },
  } = await getQuestionContent(slug);
  const questionContent = content;

  // Get A Submission
  const { submissionDetails } = await getOneAcceptedSubmission(slug);
  if (!submissionDetails?.code) {
    return "Error while retrieving content.";
  }
  const submissionCode = submissionDetails.code;

  const prompt = getIntuitionPrompt(topicTags, questionContent, submissionCode);

  // Real code
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  if (chatCompletion?.choices.length < 1) {
    console.error("Missing chat completion choices");
    return "";
  }

  const messages = chatCompletion?.choices
    .map((x) => x.message.content)
    .join(" | ");
  return messages;
};
