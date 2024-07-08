import { leetCodeRequest } from "../leetCodeClient";
import {
  QuestionContentQueryResponse,
  getQuestionContentVariables,
  questionContentQuery,
} from "./question-content";
import { QuestionTitleQuery } from "./question-title/questionTitle.query";
import { QuestionTitleQueryResponse } from "./question-title/questionTitle.types";
import { getQuestionTitleVariables } from "./question-title/questionTitle.variables";

const getQuestionContent = async (
  slug: string,
): Promise<QuestionContentQueryResponse> => {
  const data = await leetCodeRequest(
    questionContentQuery,
    getQuestionContentVariables(slug),
  );
  return data as QuestionContentQueryResponse;
};

const getQuestionTitle = async (
  slug: string,
): Promise<QuestionTitleQueryResponse> => {
  const data = await leetCodeRequest(
    QuestionTitleQuery,
    getQuestionTitleVariables(slug),
  );
  return data as QuestionTitleQueryResponse;
};

export const getQuestionTitleAndContent = async (
  slug: string,
): Promise<{
  questionContent: string;
  questionTitle: string;
  questionDifficulty: string;
}> => {
  const {
    question: { content },
  } = await getQuestionContent(slug);
  const {
    question: { title, difficulty },
  } = await getQuestionTitle(slug);
  return {
    questionContent: content,
    questionTitle: title,
    questionDifficulty: difficulty,
  };
};
