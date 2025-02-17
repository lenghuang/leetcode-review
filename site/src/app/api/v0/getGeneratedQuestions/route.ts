import { GeneratedQuestion } from '@/types/short-db.types';
import { createClient } from '@/utils/supabase/server';
import { MultipleChoiceV0 } from '@/zod/multiple_choice_v0';
import { NextResponse } from 'next/server';

// api/v0/getGeneratedQuestions
export async function GET() {
  return getGeneratedQuestions()
    .then((data) => NextResponse.json(data))
    .catch((err) => console.error('api/v0/getGeneratedQuestions', err));
}

// Separate logic from network layer
async function getGeneratedQuestions() {
  const supabase = await createClient();

  const { data: allData, error: allError } = await supabase
    .from('GeneratedQuestions')
    .select('*');

  if (allError) {
    console.error(allError);
    return [];
  }

  // Example server side JsonValidation
  const questions: GeneratedQuestion[] = allData;

  for (const q of questions) {
    const { success, error: mcError } = MultipleChoiceV0.safeParse(q.data);

    if (mcError || !success) {
      console.error(mcError);
      return [];
    }
  }

  console.log('Dynamic JSON Data Validated as MultipleChoiceV0');

  return allData as GeneratedQuestion[];
}
