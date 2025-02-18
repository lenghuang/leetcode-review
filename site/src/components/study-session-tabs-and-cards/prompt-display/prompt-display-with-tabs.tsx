import { FC, ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DescriptionTabDisplayProps } from '@/types/study-session.types';
import { ExternalLink } from 'lucide-react';

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
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value={'description'}>Description</TabsTrigger>
        <TabsTrigger value={'solution'}>Solution</TabsTrigger>
      </TabsList>
      <TabsContent value={'description'}>
        <Card>
          <CardContent className="space-y-2">{data.content}</CardContent>
        </Card>
      </TabsContent>
      <TabsContent value={'solution'}>
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
            <CardDescription>
              Read up on the original question before reviewing.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">{data.answer}</CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
);

const CustomBadgeContainer: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="text-sm flex gap-2 mb-4">{children}</div>
);

const CustomBadge: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="flex justify-center gap-1 items-center bg-slate-200 rounded px-1">
    {children}
  </div>
);
