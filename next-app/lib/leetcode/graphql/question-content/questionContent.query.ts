import { gql } from "graphql-request";

export const questionContentQuery = gql`
  query questionContent($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
      content
      mysqlSchemas
      dataSchemas
    }
  }
`;
