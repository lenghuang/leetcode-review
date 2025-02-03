import { openai } from '../openai';
import {
  getExampleQuestionContent,
  getExampleSubmissionContent,
} from './multipleChoice.debug';
import {
  getMultipleChoiceSystemPrompt,
  getMultipleChoiceUserPrompt,
} from './multipleChoice.prompt';

const errorObject = {
  correctAnswer: { code: '', explanation: '' },
  alternativeAnswers: [],
};

export const getMultipleChoiceQuestions = async (
  question?: string,
  submission?: string,
) => {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: getMultipleChoiceSystemPrompt(),
      },
      {
        role: 'user',
        content: getMultipleChoiceUserPrompt(
          question ?? getExampleQuestionContent(),
          submission ?? getExampleSubmissionContent(),
        ),
      },
    ],
    model: 'gpt-3.5-turbo',
  });

  if (chatCompletion?.choices.length < 1) {
    console.error('Missing chat completion choices');
    return errorObject;
  }

  const messages = chatCompletion?.choices[0]?.message?.content;
  if (!messages) {
    return errorObject;
  }

  try {
    const messagesObj = JSON.parse(messages);
    return messagesObj;
  } catch (error) {
    console.error('Error in getMultipleChoiceQuestions', messages, error);
    return errorObject;
  }
};
