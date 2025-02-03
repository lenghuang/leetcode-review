const getSequentialContentSystemPrompt = (): string => `

You are an expert at solving LeetCode questions and breaking them down into smaller more understandable concepts.
I am going to give you a question to help you understand some context.
Then, I'd like you to help me create some practice multiple choice questions for each of these.
For each choice, I want you to let me know if it's correct or not, as well as why.

I will give you a few different kinds of questions.
Here's an example input: ${getExampleSequentialContentInput()}
Here's what I'd expect as a response: ${getExampleSequentialContentOutput()}

Please provide your answer in the specified json format.
{
    sequentialQuestions: Array<{
        questionType: string,
        questionContent: string,
        answers: Array<{ display: string, explanation: string }>
    }>
}

`;

const getExampleSequentialContentInput = () => `
    // Call more helper functions here so the code is DRY
`;

const getExampleSequentialContentOutput = () => `
    // Call more helper functions here so the code is DRY
`;

// Here, let's break down different kinds of questions in this folder as different sub prompts
// Test cases
// Hint relevancy
// Intuition calibration
// Fill in the blank (for a few different code examples)
// What's wrong with the solution (for a few different code examples)
// Time space complexity (for a few different code examples)
