'use client';

import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Json } from '@/types/database.types';
import { ArrowLeft, NotebookPen } from 'lucide-react';
import { DescriptionTab, GameTab, PromptTab } from './tab-components';
import { useState } from 'react';

const TabComponents = {
  description: {
    title: () => 'Description',
    component: (data) => <DescriptionTab data={data} />,
  },
  solution: { title: () => 'Solution', component: GameTab },
  scrap: {
    // TODO: add a notebook / whiteboard feature here / ai assistant
    title: () => (
      <div className="flex flex-col justify-center h-[1.25rem]">
        <NotebookPen size={'14px'} />
      </div>
    ),
    component: () => null,
  },
};

const PromptDisplay = ({
  data,
}: {
  data: {
    promptKey: number;
    promptKind: string;
    promptData: Json;
  };
}) => (
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
        {value.component(data)}
      </TabsContent>
    ))}
  </Tabs>
);

interface StudySessionDataObject {
  prompt: {
    promptKey: number;
    promptKind: string;
    promptData: Json;
  };
  answer: {
    answerKey: number;
    answerKind: string;
    answerData: Json;
  };
}
interface StudySessionClientProps {
  data: StudySessionDataObject[];
}

export function StudySessionClient({ data }: StudySessionClientProps) {
  const [dataIndex, setDataIndex] = useState<number>(0);

  return (
    <>
      <div className="flex gap-2 items-center mb-4">
        <ArrowLeft />
        <Progress value={20} />
      </div>
      <PromptDisplay data={data[dataIndex].prompt} />
    </>
  );
}
