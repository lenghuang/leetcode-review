import { GeneratedQuestion } from '@/types/short-db.types';
import { createClient } from '@/utils/supabase/server';
import { MultipleChoiceV0 } from '@/zod/multiple_choice_v0';
import { NextResponse } from 'next/server';

// api/v0/getQuestions
export async function GET(request: Request) {
  return getQuestions()
    .then((data) => NextResponse.json(data))
    .catch((err) => console.error('api/v0/getQuestions', err));
}

// Separate logic from network layer
async function getQuestions() {
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

  console.log('Dynamic JSON Data Validated');

  return allData as GeneratedQuestion[];
}
