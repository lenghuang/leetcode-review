import { z } from 'zod';
import { KaggleDatasetQuestionMetadata } from '@/zod/kaggle_dataset_v0';
import { MultipleChoiceV0 } from '@/zod/multiple_choice_v0';

export type KaggleDatasetQuestionMetadataType = z.infer<
  typeof KaggleDatasetQuestionMetadata
>;

export type MultipleChoiceV0Type = z.infer<typeof MultipleChoiceV0>;
