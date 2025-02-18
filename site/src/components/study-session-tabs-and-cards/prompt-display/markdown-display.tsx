import { Fragment } from 'react';

const renderTextWithInlineCode = (text: string) => {
  const parts = text.split(/(`[^`]+`)|(\*\*[^`]+?\*\*)/);
  return parts.map((part, index) => {
    if (!part) return null; // Handle empty parts

    if (part?.startsWith('`') && part?.endsWith('`')) {
      const code = part.slice(1, -1);
      return (
        <code key={index} className="bg-gray-100 px-2 py-1 rounded">
          {code}
        </code>
      );
    } else if (part?.startsWith('**') && part?.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return <strong key={index}>{boldText}</strong>;
    } else if (part?.startsWith('* ')) {
      const itemText = part.trim().slice(2);
      return `\u2022\t\t${itemText}`;
    }

    return part;
  });
};

export const MarkdownDisplay = ({ markdown }: { markdown: string }) => {
  const paragraphs = markdown.split('\\n');

  const renderParagraph = (paragraph: string, index: number) => {
    if (paragraph === '') {
      return <br key={index} />;
    }

    return (
      <p key={index}>
        {renderTextWithInlineCode(paragraph)}
        {index < paragraphs.length - 1 && (
          <Fragment>
            <br />
          </Fragment>
        )}
      </p>
    );
  };

  return (
    <div className="prose lg:prose-xl">
      {paragraphs.map((paragraph, index) => renderParagraph(paragraph, index))}
    </div>
  );
};
