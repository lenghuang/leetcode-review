import clsx from "clsx";
import DOMPurify from "isomorphic-dompurify";
import { QuestionExampleModal } from "./QuestionExampleModal";

type QuestionContentViewProps = {
  content: string;
  title: string;
  difficulty: string;
  questionId: string;
};

type QuestionContentSplitObject = {
  questionHtmlString: string;
  otherInfoHtmlString?: string;
};

export const QuestionContentCompactView = ({
  content,
  title,
  difficulty,
  questionId,
}: QuestionContentViewProps) => {
  const { questionHtmlString, otherInfoHtmlString } =
    breakStringAtExamples(content);

  return (
    <div className="mx-4">
      <h1 className="mb-2 text-xl font-bold">{`${questionId}. ${title}`}</h1>
      <div className="relative h-fit rounded-lg border bg-base-200 p-4 text-base-content">
        <div
          className="[&_*]:text-pretty [&_*]:break-words [&_code]:mx-0.5 [&_code]:rounded [&_code]:bg-base-300 [&_code]:p-1 [&_code]:text-xs [&_li]:m-1 [&_pre]:my-2 [&_pre]:border-l-2 [&_pre]:pl-2 [&_pre]:text-sm [&_pre]:text-neutral"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(questionHtmlString),
          }}
        ></div>
        <DifficultyBadge difficulty={difficulty} />
      </div>
      {!!otherInfoHtmlString && (
        <QuestionExampleModal content={otherInfoHtmlString} />
      )}
    </div>
  );
};

const breakStringAtExamples = (content: string): QuestionContentSplitObject => {
  const separator = "\n\n<p>&nbsp;</p>\n";

  // Find the index of the first occurrence of the separator
  const separatorIndex = content.indexOf(separator);

  // If separator is not found, return the whole content as questionHtmlString
  if (separatorIndex === -1) {
    return {
      questionHtmlString: content,
    };
  }

  // Extract questionHtmlString and otherInfoHtmlString
  const questionHtmlString = content.slice(0, separatorIndex);
  const otherInfoHtmlString = content.slice(separatorIndex + separator.length);
  return {
    questionHtmlString,
    otherInfoHtmlString,
  };
};

const DifficultyBadge = ({ difficulty }: { difficulty: string }) => {
  const badgeColor = clsx({
    "badge-success": difficulty === "Easy",
    "badge-warning": difficulty === "Medium",
    "badge-error": difficulty === "Hard",
    "badge-accent": !["Easy", "Medium", "Hard"].includes(difficulty), // Fallback color
  });
  return (
    <div className={clsx("badge absolute -right-2 -top-2 shadow", badgeColor)}>
      {difficulty}
    </div>
  );
};
