import { Fragment } from 'react';
import Markdown from 'react-markdown';

export const MarkdownDisplay = ({ markdown }: { markdown: string }) => {
  const paragraphs = formatMarkdown(markdown).split('\\n\\n'); // Split by \n\n

  return (
    <>
      {paragraphs.map((p, pi) => (
        <Fragment key={`Paragraph_Index_${pi}`}>
          {p.split('\\n').map((l, li) => (
            <Markdown key={`Line_Index_${li}`}>{l}</Markdown>
          ))}
          {pi < paragraphs.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  );
};

function formatMarkdown(markdown: string) {
  const formatted = markdown
    .replace(/\\\[/g, '[') // Replace \[ with [
    .replace(/\\]/g, ']'); // Replace \] with ]

  return formatted;
}
