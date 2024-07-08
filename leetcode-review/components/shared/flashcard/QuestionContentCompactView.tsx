import DOMPurify from "isomorphic-dompurify";
import { QuestionExampleModal } from "./QuestionExampleModal";

type QuestionContentViewProps = {
  content: string;
};

type QuestionContentSplitObject = {
  questionHtmlString: string;
  otherInfoHtmlString?: string;
};

export const QuestionContentCompactView = ({
  content,
}: QuestionContentViewProps) => {
  const { questionHtmlString, otherInfoHtmlString } =
    breakStringAtExamples(content);

  return (
    <div className="m-4">
      <div className="bg-base-300 text-base-content h-fit rounded-lg border p-4">
        <div
          className="[&_*]:text-pretty [&_*]:break-words"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(questionHtmlString),
          }}
        ></div>
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
