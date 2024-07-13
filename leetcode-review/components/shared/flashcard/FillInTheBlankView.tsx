import { FillInTheBlankProblem } from "@/lib/chatgpt/functions/multiplechoice";
import DOMPurify from "isomorphic-dompurify";

export const FillInTheBlankView = ({
  multipleChoice,
}: {
  multipleChoice: FillInTheBlankProblem;
}) => {
  return (
    <>
      <div className="max-w-full rounded-xl bg-base-200 p-4">
        <pre
          className="block overflow-x-scroll whitespace-pre [&_.lcrv-missing-line]:font-bold [&_.lcrv-missing-line]:text-primary"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(multipleChoice.submissionCodeMissing, {
              ALLOWED_TAGS: ["span"],
              ALLOWED_ATTR: ["class"],
            }),
          }}
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
