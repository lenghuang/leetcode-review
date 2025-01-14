import {
  SubmissionListQueryResponse,
  getSubmissionListVariables,
  submissionListQuery,
} from "../graphql/submission-list";
import { leetCodeRequest } from "../leetCodeClient";

export const getSubmissions = async (
  slug: string,
): Promise<SubmissionListQueryResponse> => {
  const data = await leetCodeRequest(
    submissionListQuery,
    getSubmissionListVariables(slug),
  );
  return data as SubmissionListQueryResponse;
};
