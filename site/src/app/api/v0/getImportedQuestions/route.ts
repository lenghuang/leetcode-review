import { ImportedQuestion } from '@/types/short-db.types';
import { createClient } from '@/utils/supabase/server';
import { KaggleDatasetQuestionMetadata } from '@/zod/kaggle_dataset_v0';
import { NextResponse } from 'next/server';

const PAGE_SIZE = 5;

// api/v0/getImportedQuestions
export async function GET(request: Request) {
  // Doing this at BE layer for now, but what if someone refreshes and are on page 20?
  // They should prob stay so maybe need to add query param or something.
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') ?? '0');

  console.log(page);

  return getImportedQuestions(page)
    .then((data) => NextResponse.json(data))
    .catch((err) => console.error('api/v0/getImportedQuestions', err));
}

// Separate logic from network layer
async function getImportedQuestions(page: number = 0) {
  const supabase = await createClient();

  const { data: allData, error: allError } = await supabase
    .from('ImportedQuestionsAndSolutions')
    .select('*')
    .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

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
