import { StudySessionClient } from '@/components/study-session-tabs-and-cards/study-session';
import { createClient } from '@/utils/supabase/server';

export default async function StudySession() {
  // This page does not need to be SEO performant and rather should be
  // optimized for PWA, so we make everything a big client component.

  // TODO: Move this to a standalone API endpoint and use SWR to fetch it.
  const supabase = await createClient();
  const { data, error } = await supabase.rpc(
    'get_study_session_test_function_v1'
  );

  if (error) {
    console.error(error);
    return <div> sum thing wrong</div>;
  }

  const clientData = data.map((row) => ({
    prompt: {
      promptKey: row.iqs_id, // To determine if rerender is needed
      promptData: row.iqs_data,
      promptKind: row.iqs_source, // To determine what UI to show
    },
    answer: {
      answerKey: row.gq_id, // To determine if rerender is needed
      answerData: row.gq_data,
      answerKind: row.gqs_source, // To determine what UI to show
    },
  }));

  return <StudySessionClient data={clientData} />;
}
