import { getSubmissionDetail } from "@/lib/leetcode";

type SubmissionViewDetailProps = {
  submissionId: string;
};

export const SubmissionViewDetail = async ({
  submissionId,
}: SubmissionViewDetailProps) => {
  const { submissionDetails } = await getSubmissionDetail(submissionId);
  return (
    <div className="m-8 flex grow-0 overflow-x-auto rounded-xl bg-zinc-200 py-4 pl-2 pr-6">
      <pre> {submissionDetails.code} </pre>
    </div>
  );
};
