'use client';

import { Progress } from '@/components/ui/progress';

import { StudySessionClientProps } from '@/types/study-session.types';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { PromptDisplay } from './prompt-display/prompt-display';

export function StudySessionClient({ data }: StudySessionClientProps) {
  const [dataIndex, setDataIndex] = useState<number>(1);
  const progressValue = (dataIndex / data.length) * 100;

  if (dataIndex >= data.length) {
    return (
      <div className="flex flex-col gap-2 items-center">
        <p>Invalid index</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-2 items-center mb-4">
        <ArrowLeft />
        <Progress value={progressValue} />
      </div>
      <PromptDisplay data={data[dataIndex].prompt} />
    </>
  );
}
