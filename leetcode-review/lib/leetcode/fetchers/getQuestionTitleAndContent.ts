import {
  QuestionContentQueryResponse,
  getQuestionContentVariables,
  questionContentQuery,
} from "../graphql/question-content";
import { QuestionTitleQuery } from "../graphql/question-title/questionTitle.query";
import { QuestionTitleQueryResponse } from "../graphql/question-title/questionTitle.types";
import { getQuestionTitleVariables } from "../graphql/question-title/questionTitle.variables";
import { leetCodeRequest } from "../leetCodeClient";

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
  questionContent: string | null;
  questionTitle: string | null;
  questionDifficulty: string | null;
  questionFrontendId: string | null;
}> => {
  try {
    const contentResponse = await getQuestionContent(slug);
    const questionContent = contentResponse?.question?.content || null;

    const titleResponse = await getQuestionTitle(slug);
    const questionTitle = titleResponse?.question?.title || null;
    const questionDifficulty = titleResponse?.question?.difficulty || null;
    const questionFrontendId =
      titleResponse?.question?.questionFrontendId || null;

    return {
      questionContent,
      questionTitle,
      questionDifficulty,
      questionFrontendId,
    };
  } catch (error) {
    console.error("Error fetching question data:", error);
    return {
      questionContent: null,
      questionTitle: null,
      questionDifficulty: null,
      questionFrontendId: null,
    };
  }
};
