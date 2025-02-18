import { Json } from './database.types';
import { KaggleDatasetQuestionMetadataType } from './zod.types';

export interface StudySessionDataObject {
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

export interface StudySessionClientProps {
  data: StudySessionDataObject[];
}

export interface DescriptionTabProps {
  data: {
    promptKey: number;
    promptKind: string;
    promptData: Json;
  };
}

export interface DescriptionTabDisplayProps {
  data: KaggleDatasetQuestionMetadataType;
}
