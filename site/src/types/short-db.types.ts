import { Database } from './database.types';

export type GeneratedQuestion =
  Database['public']['Tables']['GeneratedQuestions']['Row'];

export type ImportedQuestion =
  Database['public']['Tables']['ImportedQuestionsAndSolutions']['Row'];
