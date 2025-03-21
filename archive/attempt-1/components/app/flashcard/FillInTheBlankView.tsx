import { cleanSubmission, FillInTheBlankProblem } from "@/lib/chatgpt";
import { MissingLineCodeSubmissionView } from "./MissingLineCodeSubmissionView";

export const FillInTheBlankView = async ({
  multipleChoice,
  submissionCode,
}: {
  multipleChoice: FillInTheBlankProblem;
  submissionCode: string;
}) => {
  const submissionCodeClean = await cleanSubmission(submissionCode);

  return (
    <>
      <div className="max-w-full rounded-xl bg-base-200 p-4">
        <MissingLineCodeSubmissionView
          multipleChoice={multipleChoice}
          submissionCode={submissionCodeClean ?? submissionCode}
        />
      </div>
      <ul>
        <li key={0} className="my-4">
          <pre className="mb-1 w-full text-pretty break-words text-success">
            {multipleChoice.correctAnswer?.code}
          </pre>
          {multipleChoice.correctAnswer?.explanation}
        </li>
        {multipleChoice.alternativeAnswers?.map((x, i) => (
          <li key={i + 1} className="my-4">
            <pre className="mb-1 w-full text-pretty break-words text-error">
              {x.code}
            </pre>
            {x.explanation}
          </li>
        ))}
      </ul>
    </>
  );
};
