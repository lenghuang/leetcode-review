import openai from "../openai";
import { getCleanSubmissionPrompt } from "./cleanSubmission.prompt";

export const cleanSubmission = async (submission: string): Promise<string> => {
  const prompt = getCleanSubmissionPrompt(submission);

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

  // Handle the response
  const messages = chatCompletion?.choices
    .map((x) => x.message.content)
    .join(" | ");
  return messages;
};
