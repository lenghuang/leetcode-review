import { gql } from "graphql-request";

export const questionTitleQuery = gql`
  query questionTitle($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
      questionId
      questionFrontendId
      title
      titleSlug
      isPaidOnly
      difficulty
      likes
      dislikes
      categoryTitle
    }
  }
`;
