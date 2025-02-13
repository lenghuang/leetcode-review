import { ImportedQuestion } from '@/types/short-db.types';
import { createClient } from '@/utils/supabase/server';
import { KaggleDatasetQuestionMetadata } from '@/zod/kaggle_dataset_v0';
import { NextResponse } from 'next/server';

// api/v0/getImportedQuestions
export async function GET(request: Request) {
  return getImportedQuestions()
    .then((data) => NextResponse.json(data))
    .catch((err) => console.error('api/v0/getImportedQuestions', err));
}

// Separate logic from network layer
async function getImportedQuestions() {
  const supabase = await createClient();

  const { data: allData, error: allError } = await supabase
    .from('ImportedQuestionsAndSolutions')
    .select('*');

  if (allError) {
    console.error(allError);
    return [];
  }

  // Example server side JsonValidation
  const questions: ImportedQuestion[] = allData;

  for (const q of questions) {
    if (q.source === 'kaggle/erichartford/leetcode-solutions-combined') {
      const { success: parseSuccess, error: parseError } =
        KaggleDatasetQuestionMetadata.safeParse(q.data);

      if (parseError || !parseSuccess) {
        console.error(parseError);
        return [];
      }
    }
  }

  console.log('Dynamic JSON Data Validated as KaggleDatasetQuestionMetadata');

  return allData as ImportedQuestion[];
}
