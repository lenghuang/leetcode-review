import { gql } from "graphql-request";

export const singleQuestionTopicTagsQuery = gql`
  query singleQuestionTopicTags($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
      topicTags {
        name
        slug
      }
    }
  }
`;
