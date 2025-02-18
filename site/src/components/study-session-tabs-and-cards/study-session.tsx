'use client';

import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Json } from '@/types/database.types';
import { ArrowLeft, NotebookPen } from 'lucide-react';
import { GameTab, PromptTab } from './tab-components';

const TabComponents = {
  prompt: { title: () => 'Prompt', component: PromptTab },
  game: { title: () => 'Game', component: GameTab },
  scrap: {
    title: () => (
      <div className="flex flex-col justify-center h-[1.25rem]">
        <NotebookPen size={'14px'} />
      </div>
    ),
    component: () => null,
  },
};

interface StudySessionDataObject {
  promptKey: number;
  promptData: Json;
  answerKey: number;
  answerData: Json;
}
interface StudySessionClientProps {
  data: StudySessionDataObject[];
}

export function StudySessionClient({ data }: StudySessionClientProps) {
  return (
    <>
      <div className="flex gap-2 items-center mb-4">
        <ArrowLeft />
        <Progress value={20} />
      </div>
      <Tabs defaultValue={Object.keys(TabComponents)[0]}>
        <TabsList className="grid w-full grid-cols-[3fr_3fr_1fr]">
          {Object.entries(TabComponents).map(([key, value]) => (
            <TabsTrigger key={`TabsTrigger_${key}`} value={key}>
              {value.title()}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.entries(TabComponents).map(([key, value]) => (
          <TabsContent key={`TabsContent_${key}`} value={key}>
            {value.component()}
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}
