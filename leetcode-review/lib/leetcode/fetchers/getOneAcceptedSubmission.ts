import { getSubmissionDetail } from "./getSubmissionDetail";
import { getSubmissions } from "./getSubmissions";

export const getOneAcceptedSubmission = async (slug: string) => {
  const data = await getSubmissions(slug);

  const submission = data.questionSubmissionList?.submissions?.find(
    (x) => x.status == 10,
  );

  // Empty submission id
  if (!submission?.id) {
    console.error("Failed to find one accepted submission");
    return {
      submissionDetails: null,
    };
  }

  return await getSubmissionDetail(submission.id);
};
