import { Fragment } from 'react';
import Markdown from 'react-markdown';

export const MarkdownDisplay = ({ markdown }: { markdown: string }) => {
  console.log(formatMarkdown(markdown));
  console.log(formatMarkdown(markdown).split('\\n'));
  console.log(formatMarkdown(markdown).split('\\n\\n'));

  return formatMarkdown(markdown)
    .split('\\n\\n')
    .map((p, pi) => (
      <Fragment key={`Paragraph_Index_${pi}`}>
        {p.split('\\n').map((l, li) => (
          <Markdown key={`Line_Index_${li}`}>{l}</Markdown>
        ))}
        <br />
      </Fragment>
    ));
};

function formatMarkdown(markdown: string) {
  const formatted = markdown
    .replace(/\\\[/g, '[') // Replace \[ with [
    .replace(/\\]/g, ']'); // Replace \] with ]

  return formatted;
}
