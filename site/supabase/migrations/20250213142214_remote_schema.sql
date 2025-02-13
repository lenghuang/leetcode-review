create policy "Enable read access for all users"
on "public"."ImportedQuestionsAndSolutions"
as permissive
for select
to public
using (true);



