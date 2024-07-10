export interface SingleQuestionTopicTagsQueryResponse {
  question: {
    topicTags: {
      name: string;
      slug: string;
    }[];
  };
}
