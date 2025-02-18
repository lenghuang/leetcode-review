set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_study_session_test_function_v0()
 RETURNS TABLE(gq_id bigint, iqs_id bigint, gq_data json, iqs_data json)
 LANGUAGE plpgsql
 STABLE
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    gq.id as gq_id, 
    iqs.id as iqs_id, 
    gq.data as gq_data, 
    iqs.data as iqs_data
  FROM "GeneratedQuestions" gq
  JOIN "ImportedQuestionsAndSolutions" iqs 
    ON gq.imported_questions_and_solutions_id = iqs.id
  LIMIT 100;
END;
$function$
;


