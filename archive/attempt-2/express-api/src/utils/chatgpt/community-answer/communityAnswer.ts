import { openai } from "../openai";
import {
  getCommunityAnswerSystemPrompt,
  getCommunityAnswerUserPrompt,
} from "./communityAnswer.prompt";

export const getCommunityAnswerParsed = async (content: string) => {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: getCommunityAnswerSystemPrompt(),
      },
      {
        role: "user",
        content: getCommunityAnswerUserPrompt(content),
      },
    ],
    model: "gpt-3.5-turbo",
  });

  if (chatCompletion?.choices.length < 1) {
    console.error("Missing chat completion choices");
    return null;
  }

  const messages = chatCompletion?.choices[0]?.message?.content;
  if (!messages) {
    return null;
  }

  try {
    const messagesObj = JSON.parse(messages);
    return messagesObj;
  } catch (error) {
    console.error("Error in getCommunityAnswerParsed", messages, error);
    return null;
  }
};
