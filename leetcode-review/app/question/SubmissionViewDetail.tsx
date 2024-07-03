import {
  SubmissionDetailQueryResponse,
  getSubmissionDetailVariables,
  submissionDetailQuery,
} from "@/utils/leetcode/graphql/submission-detail";
import { leetCodeRequest } from "@/utils/leetcode/leetCodeClient";

const getSubmission = async (
  submissionId: string,
): Promise<SubmissionDetailQueryResponse> => {
  const data = await leetCodeRequest(
    submissionDetailQuery,
    getSubmissionDetailVariables(submissionId),
  );

  return data as SubmissionDetailQueryResponse;
};

type SubmissionViewDetailProps = {
  submissionId: string;
};

export const SubmissionViewDetail = async ({
  submissionId,
}: SubmissionViewDetailProps) => {
  const { submissionDetails } = await getSubmission(submissionId);
  return (
    <div className="m-8 flex grow-0 overflow-x-auto rounded-xl bg-zinc-200 py-4 pl-2 pr-6">
      <pre> {submissionDetails.code} </pre>
    </div>
  );
};
