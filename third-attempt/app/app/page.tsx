import { TopicTile } from "@/components/TopicTile";

export default async function ExplorePage() {
  const dummyData: any = [
    {
      title: "Arrays",
      description: "Learn more about arrays",
      ctaContent: "Start",
      redirectTo: "/app/arrays",
    },
    {
      title: "Strings",
      description: "String together your thoughts",
      redirectTo: "/app/strings",
    },
  ];

  return (
    <div>
      Here will be my app. Here we'll put different tiles for lessons you could
      explore. Array, trees, graphs, strings, etc. Here, we'll probably need a
      table for possible topics with our internal representation. As well as a
      mapping from leetcode topics to our own topics Once user clicks in to
      something here, we'll be able to go to a new page that has more specific
      info on that topic.
      {dummyData.map((topic: any, i: number) => (
        <TopicTile
          key={`topic-tile-${i}`}
          title={topic.title}
          description={topic.description}
          ctaContent={topic.ctaContent}
          redirectTo={topic.redirectTo}
        />
      ))}
    </div>
  );
}
