import {
  SubmissionDetailQueryResponse,
  getSubmissionDetailVariables,
  submissionDetailQuery,
} from "../graphql/submission-detail";
import { leetCodeRequest } from "../leetCodeClient";

export const getSubmissionDetail = async (
  submissionId: string,
): Promise<SubmissionDetailQueryResponse> => {
  const data = await leetCodeRequest(
    submissionDetailQuery,
    getSubmissionDetailVariables(submissionId),
  );

  return data as SubmissionDetailQueryResponse;
};
