import {
  QuestionContentQueryResponse,
  getQuestionContentVariables,
  questionContentQuery,
} from "../graphql/question-content";
import { leetCodeRequest } from "../leetCodeClient";

export const getQuestionContent = async (
  slug: string,
): Promise<QuestionContentQueryResponse> => {
  const data = await leetCodeRequest(
    questionContentQuery,
    getQuestionContentVariables(slug),
  );
  return data as QuestionContentQueryResponse;
};
