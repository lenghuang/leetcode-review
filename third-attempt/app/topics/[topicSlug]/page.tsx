export default async function TopicPage({
  params,
}: {
  params: Promise<{ topicSlug: string }>;
}) {
  const slug = (await params).topicSlug;
  return <div>My Topic Name: {slug}</div>;
}
