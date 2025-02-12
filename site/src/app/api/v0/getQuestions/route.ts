import { GeneratedQuestion } from '@/types/short-db.types';
import { createClient } from '@/utils/supabase/server';
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

  const { data, error } = await supabase.from('GeneratedQuestions').select('*');

  if (error) {
    console.error(error);
    return [];
  }

  return data as GeneratedQuestion[];
}
