import { getQuestionContent, getSingleQuestionTopicTags } from "@/lib/leetcode";
import { getOneAcceptedSubmission } from "@/lib/leetcode/fetchers/getOneAcceptedSubmission";
import openai from "../openai";

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

  const prompt = getPrompt(topicTags, questionContent, submissionCode);

  // Debugging
  const shouldUseChatGpt = true;
  if (shouldUseChatGpt) {
    return "Hardcoded response to avoid calls to chatgpt";
  }

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

  const messages = chatCompletion?.choices
    .map((x) => x.message.content)
    .join(" | ");
  return messages;
};

const getPrompt = (
  topics: Array<string>,
  question: string,
  submission: string,
): string => {
  return `
    I am currently working on solving problems on LeetCode DSA Problems, and I could use your assistance.
    My goal is to understand the solution I provided to you in less than 5 sentences.
    I will first present you the question, and then a solution in code to that question.
    I want to use your response in a flash card, so that I can easily practice the concepts to a question in a brief way.

    Here are the topics:
    ${topics.join(",")}

    Here is the question:
    ${question}

    Here is a solution that works:
    ${submission}

    Can you generate for me a less than 5 sentence explanation / psuedocode for this question?
    Your tone should be as if you're telling me what to do, like an algorithm.
    Return the answer to me in one paragraph.
    Avoid repeating the original question, like saying, "To solve the problem, follow these steps"`;
};
