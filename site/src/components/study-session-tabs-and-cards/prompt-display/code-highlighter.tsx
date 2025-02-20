import { Highlight, themes } from 'prism-react-renderer';

const extractCode = (markdown: string) => {
  const lines = markdown.trim().split('\n');
  if (lines.length < 2) return ''; // Handle cases with no code fences or just language specifier.
  const codeLines = lines.slice(1, -2); // Remove the first and last lines (fences).
  return codeLines.join('\n');
};

export const CodeHighlighter = ({
  markdown,
  language,
}: {
  markdown: string;
  language: string;
}) => (
  <div className="overflow-auto">
    <Highlight
      theme={themes.oneLight}
      code={extractCode(markdown)}
      language={language}
    >
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre className="overflow-x-auto rounded-xl px-4 py-2" style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  </div>
);
