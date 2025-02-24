'use client';

import { Progress } from '@/components/ui/progress';
import {
  ActivityProps,
  StudySessionClientProps,
} from '@/types/study-session.types';
import { useState } from 'react';
import { PromptDisplay } from './prompt-display/prompt-display';
import { MultipleChoiceV0 } from '@/zod/multiple_choice_v0';
import { ActivityDisplayForMultipleChoiceV0 } from './answer-display/activity-display';
import { BackButton } from '../buttons/back-button';

export function StudySessionClient({ data }: StudySessionClientProps) {
  const [promptIndex, setPromptIndex] = useState<number>(0);
  const progressValue = (promptIndex / data.length) * 100;

  if (promptIndex >= data.length) {
    return (
      <div className="flex flex-col gap-2 items-center">
        <p>Invalid index</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-2 items-center mb-4">
        <BackButton />
        <Progress value={progressValue} />
      </div>
      <PromptDisplay data={data[promptIndex].prompt} />
      <ActivityDisplay
        data={data[promptIndex].answer}
        onActivityCompleted={() => setPromptIndex((i) => i + 1)}
      />
    </>
  );
}

const ActivityDisplay = ({ data, onActivityCompleted }: ActivityProps) => {
  // Handle version control and data schema validation here
  if (data.answerKind === 'lh_manual_upload_multiplechoicev0') {
    const {
      data: parsedData,
      success: parseSuccess,
      error: parseError,
    } = MultipleChoiceV0.safeParse(data.answerData);

    if (parseError || !parseSuccess) {
      console.error(parseError);
      return <div>Something went wrong parsing ActivityDisplay</div>;
    }

    return (
      <ActivityDisplayForMultipleChoiceV0
        data={parsedData}
        onActivityCompleted={onActivityCompleted}
      />
    );
  }

  return <div>Version match failed</div>;
};
