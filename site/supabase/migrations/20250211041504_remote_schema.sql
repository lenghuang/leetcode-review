drop policy "Enable read access for all users" on "public"."GeneratedQuestions";

create policy "Enable read access for all users"
on "public"."GeneratedQuestions"
as permissive
for select
to public
using (true);



