import {
  ProblemsetQuestionListResponse,
  getProblemsetQuestionListVariables,
  problemsetQuestionListQuery,
} from "../graphql/problemset-question-list";
import { leetCodeRequest } from "../leetCodeClient";

export const getQuestions =
  async (): Promise<ProblemsetQuestionListResponse> => {
    const data = await leetCodeRequest(
      problemsetQuestionListQuery,
      getProblemsetQuestionListVariables(),
    );
    return (data ?? {
      problemsetQuestionList: null,
    }) as ProblemsetQuestionListResponse;
  };
