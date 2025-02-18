import { DescriptionTabProps } from '@/types/study-session.types';
import { PromptDisplayWithTabs } from './prompt-display-with-tabs';
import { KaggleDatasetQuestionMetadata } from '@/zod/kaggle_dataset_v0';

export const PromptDisplay = ({ data }: DescriptionTabProps) => {
  // Handle version control and data schema validation here
  if (data.promptKind === 'kaggle/erichartford/leetcode-solutions-combined') {
    const {
      data: parsedData,
      success: parseSuccess,
      error: parseError,
    } = KaggleDatasetQuestionMetadata.safeParse(data.promptData);

    if (parseError || !parseSuccess) {
      console.error(parseError);
      return <div>Something went wrong parsing DescriptionTab</div>;
    }

    return <PromptDisplayWithTabs data={parsedData} />;
  }

  return <div>Version match failed</div>;
};
