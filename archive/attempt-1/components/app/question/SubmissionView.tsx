import { SubmissionListSubmissions } from "@/lib/leetcode";
import { SubmissionViewDetail } from "./SubmissionViewDetail";

type SumbissionViewProps = {
  submissions: SubmissionListSubmissions;
};

export const SubmissionView = async ({ submissions }: SumbissionViewProps) => {
  return (
    <div className="flex flex-col gap-4">
      {submissions.map((sub) => {
        const dateObject = new Date(sub.timestamp * 1000);
        const status = sub.statusDisplay;
        return (
          <details
            className="collapse collapse-arrow rounded border"
            key={sub.id}
          >
            <summary className="collapse-title justify-between">
              <p>
                [{dateObject.toLocaleDateString()}{" "}
                {dateObject.toLocaleTimeString()}] [{sub.langName}]
              </p>
              {status === "Accepted" ? (
                <p className="text-green-700">{status}</p>
              ) : (
                <p>{status}</p>
              )}
            </summary>
            <div className="collapse-content">
              <SubmissionViewDetail submissionId={sub.id} />{" "}
            </div>
          </details>
        );
      })}
    </div>
  );
};
