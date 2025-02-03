import DOMPurify from "isomorphic-dompurify";

type QuestionContentViewProps = {
  content: string;
};

export const QuestionContentView = ({ content }: QuestionContentViewProps) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
    ></div>
  );
};
