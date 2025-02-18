import { FC, ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DescriptionTabDisplayProps } from '@/types/study-session.types';
import { ExternalLink } from 'lucide-react';
import { CodeHighlighter } from './code-highlighter';
import { MarkdownDisplay } from './markdown-display';

export const PromptDisplayWithTabs = ({ data }: DescriptionTabDisplayProps) => (
  <div>
    <div className="px-1">
      <h1 className="text-xl font-bold mb-2">
        {data.id}. {data.title}
      </h1>
      <CustomBadgeContainer>
        <CustomBadge>Difficulty: {data.difficulty}</CustomBadge>
        <a
          className="text-sm"
          target="_blank"
          href={`https://leetcode.com/problems/${data.slug}`}
        >
          <CustomBadge>
            Original Question <ExternalLink size={'0.875rem'} />
          </CustomBadge>
        </a>
      </CustomBadgeContainer>
    </div>
    <Tabs defaultValue={'description'}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value={'description'}>Description</TabsTrigger>
        <TabsTrigger value={'explanation'}>Explanation</TabsTrigger>
        <TabsTrigger value={'solution'}>Code Solution</TabsTrigger>
      </TabsList>
      <TabsContent value={'description'}>
        <Card>
          <CardContent>
            <MarkdownDisplay markdown={data.content} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value={'explanation'}>
        <Card>
          <CardContent>{data.explanation}</CardContent>
        </Card>
      </TabsContent>
      <TabsContent value={'solution'}>
        <Card>
          <CodeHighlighter markdown={data.answer} language={data.language} />
        </Card>
      </TabsContent>
    </Tabs>
  </div>
);

const extractCode = (markdown: string) => {
  const lines = markdown.trim().split('\\n');
  if (lines.length < 2) return ''; // Handle cases with no code fences or just language specifier.
  const codeLines = lines.slice(1, -2); // Remove the first and last lines (fences).
  return codeLines.join('\n');
};

const CustomBadgeContainer: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="text-sm flex gap-2 mb-4">{children}</div>
);

const CustomBadge: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="flex justify-center gap-1 items-center bg-slate-200 rounded px-1">
    {children}
  </div>
);
