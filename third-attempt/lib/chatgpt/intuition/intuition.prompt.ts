export const getIntuitionPrompt = (
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
