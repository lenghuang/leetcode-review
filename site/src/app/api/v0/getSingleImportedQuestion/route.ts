import { ImportedQuestion } from '@/types/short-db.types';
import { createClient } from '@/utils/supabase/server';
import { KaggleDatasetQuestionMetadata } from '@/zod/kaggle_dataset_v0';
import { NextResponse } from 'next/server';

// api/v0/getSingleImportedQuestion
export async function GET() {
  return getSingleImportedQuestion()
    .then((data) => NextResponse.json(data))
    .catch((err) => console.error('api/v0/getSingleImportedQuestion', err));
}

// Separate logic from network layer
async function getSingleImportedQuestion() {
  const supabase = await createClient();

  const { data: dbData, error: dbError } = await supabase
    .from('ImportedQuestionsAndSolutions')
    .select('*')
    .eq('id', 11); // Hardcoded for now

  if (dbError || !dbData) {
    console.error({ dbError, dbData });
    return undefined;
  }

  // Example server side JsonValidation
  const questions: ImportedQuestion[] = dbData;

  if (questions.length !== 1) {
    console.error(
      'api/v0/getSingleImportedQuestion expected one question, got',
      questions.length
    );
    return undefined;
  }

  const q = questions[0];
  if (q.source === 'kaggle/erichartford/leetcode-solutions-combined') {
    const { success: parseSuccess, error: parseError } =
      KaggleDatasetQuestionMetadata.safeParse(q.data);

    if (parseError || !parseSuccess) {
      console.error(parseError);
      return undefined;
    }
  }

  return q as ImportedQuestion;
}
