import { Json } from './database.types';
import {
  KaggleDatasetQuestionMetadataType,
  MultipleChoiceV0Type,
} from './zod.types';

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

export interface ActivityProps {
  data: {
    answerKey: number;
    answerKind: string;
    answerData: Json;
  };
}

export interface ActivityDisplayProps {
  data: MultipleChoiceV0Type;
}
