import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const supabase = await createClient();

  const response = await supabase.from('GeneratedQuestions').select('*');

  if (response.error) {
    console.error(response.error);
    return;
  }

  return NextResponse.json(response.data);
}
