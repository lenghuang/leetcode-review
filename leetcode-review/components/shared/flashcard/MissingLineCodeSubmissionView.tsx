import { FillInTheBlankProblem } from "@/lib/chatgpt/functions/multiplechoice";
import DOMPurify from "isomorphic-dompurify";

export const MissingLineCodeSubmissionView = ({
  multipleChoice,
  submissionCode,
}: {
  multipleChoice: FillInTheBlankProblem;
  submissionCode: string;
}) => {
  let submissionCodeMissing = submissionCode.trim();

  // Check if the chat gpt returned "correct answer" exists in the original submission
  if (submissionCode.includes(multipleChoice.correctAnswer.code)) {
    submissionCodeMissing = submissionCode.replaceAll(
      multipleChoice.correctAnswer.code,
      `<span class="lcrv-missing-line">MISSING LINE HERE</span>`,
    );
  } else {
    submissionCodeMissing = "Error loading submission.";
    console.error(
      "Could not find correct index for answer",
      multipleChoice.correctAnswer,
    );
  }

  return (
    <pre
      className="block overflow-x-scroll whitespace-pre text-sm [&_.lcrv-missing-line]:font-bold [&_.lcrv-missing-line]:text-primary"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(submissionCodeMissing, {
          ALLOWED_TAGS: ["span"],
          ALLOWED_ATTR: ["class"],
        }),
      }}
    />
  );
};
