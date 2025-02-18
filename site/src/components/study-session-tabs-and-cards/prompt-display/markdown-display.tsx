import { Fragment } from 'react';

const renderTextWithInlineCode = (text: string) => {
  const parts = text.split(/(`[^`]+`)|(\*\*[^`]+?\*\*)/);
  return parts.map((part, index) => {
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
    }

    const textParts = part?.split(/\n/);
    return textParts?.map((textPart, textIndex) => (
      <Fragment key={textIndex}>
        {textPart}
        {textIndex < textParts.length - 1 && <br />}
      </Fragment>
    ));
  });
};

export const MarkdownDisplay = ({ markdown }: { markdown: string }) => {
  const paragraphs = markdown.split('\\n');

  const renderParagraph = (paragraph: string, index: number) => {
    if (paragraph.trim().startsWith('* ')) {
      console.log(paragraph);
      const listItems = paragraph.trim().split(/\n\* /); // Correct split
      console.log(listItems);
      return (
        <ul key={index}>
          {listItems.map((item, listItemIndex) => {
            // Check if the item is not empty before rendering it.
            if (item.trim() !== '') {
              return (
                <li key={listItemIndex}>{renderTextWithInlineCode(item)}</li>
              );
            }
            return null; // Return null for empty items to avoid rendering empty <li> tags
          })}
        </ul>
      );
    } else if (paragraph.trim() === '') {
      return <br key={index} />;
    } else {
      return <p key={index}>{renderTextWithInlineCode(paragraph)}</p>;
    }
  };

  return (
    <div className="prose lg:prose-xl">
      {paragraphs.map((paragraph, index) => renderParagraph(paragraph, index))}
    </div>
  );
};
