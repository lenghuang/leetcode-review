export default async function QuestionsPage({
  params,
}: {
  params: Promise<{ questionSlug: string }>;
}) {
  const slug = (await params).questionSlug;
  return (
    <div>
      My Topic Name: {slug}
      <p>
        from here, i think we'll want some sort of generic "start a study
        session" function. this can take in a few parameters. Maybe a "root", so
        I can start a study session based on a question or based on a topic.
        Question will be shorter than topics so maybe I can start with that
        first. For example, start with "two-sum", and then i will go to my chat
        gpt generated database of "two-sum" questions, pull a few, sequence
        them, and return as a list of data to the user. One big call, may be
        slow but fine for v0. To extend this further in the future, could send a
        topic, where it will randomly pick a few questions, and then generate
        based on that.
      </p>
    </div>
  );
}
