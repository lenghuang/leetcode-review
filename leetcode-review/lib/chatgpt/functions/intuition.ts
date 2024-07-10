import openai from "../openai";

export const getIntuition = async (slug: string): Promise<string> => {
  const prompt = `This is the name of a Leetcode programming question. ${slug} Tell me what you think it's about.`;

  // Debugging
  const shouldUseChatGpt = true;
  if (shouldUseChatGpt) {
    return 'Based on the name "3sum," it is likely that this Leetcode programming question involves finding all unique triplets in an array that sum up to a target value. This may require using different techniques such as sorting the array, two-pointer approach, or hashing.';
  }

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  const messages = chatCompletion?.choices
    .map((x) => x.message.content)
    .join(" | ");
  return messages;
};
