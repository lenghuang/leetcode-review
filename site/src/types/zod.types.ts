import { z } from 'zod';
import { KaggleDatasetQuestionMetadata } from '@/zod/kaggle_dataset_v0';
import {
  MultipleChoiceV0,
  MultipleChoiceV0Answer,
} from '@/zod/multiple_choice_v0';
import { ChromeExtensionSyncSubmissions } from '@/zod/chrome_extension_sync_submissions';

export type KaggleDatasetQuestionMetadataType = z.infer<
  typeof KaggleDatasetQuestionMetadata
>;

export type MultipleChoiceV0Type = z.infer<typeof MultipleChoiceV0>;

export type MultipleChoiceV0AnswerType = z.infer<typeof MultipleChoiceV0Answer>;

export type ChromeExtensionSyncSubmissionsType = z.infer<
  typeof ChromeExtensionSyncSubmissions
>;
