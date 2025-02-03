import {
  getOneAcceptedSubmission,
  getQuestionContent,
  getSingleQuestionTopicTags,
} from "@/lib/leetcode";
import openai from "../openai";
import { getMultipleChoicePrompt, jsonExample } from "./multiplechoice.prompt";
import { FillInTheBlankProblem } from "./multiplechoice.types";

const errorObject: FillInTheBlankProblem = {
  correctAnswer: { code: "", explanation: "" },
  alternativeAnswers: [],
};

export const getMultipleChoiceQuestions = async (
  slug: string,
): Promise<FillInTheBlankProblem> => {
  // Just for UI purposes
  const debug = false;
  if (debug) {
    return JSON.parse(jsonExample);
  }

  // Get Topic Tags
  const { question } = await getSingleQuestionTopicTags(slug);
  if (!question?.topicTags) {
    console.error("Topic Tags Missing");
    return errorObject;
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
    console.error("Submission Details missing");
    return errorObject;
  }
  const submissionCode = submissionDetails.code;

  const prompt = getMultipleChoicePrompt(
    topicTags,
    questionContent,
    submissionCode,
  );

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
    return errorObject;
  }

  try {
    const messages = chatCompletion?.choices[0]?.message?.content;
    if (!messages) {
      return errorObject;
    }
    const messagesObj = JSON.parse(messages);
    return messagesObj as FillInTheBlankProblem;
  } catch (error) {
    console.error("Error in MultipleChoiceProblem", error);
    return errorObject;
  }
};
