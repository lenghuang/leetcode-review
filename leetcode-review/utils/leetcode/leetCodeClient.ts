// leetCodeClient.ts

import { GraphQLClient, RequestDocument } from "graphql-request";

// Define your GraphQL endpoint
const endpoint = "https://leetcode.com/graphql";

export const leetCodeRequest = async (
  query: RequestDocument,
  variables?: any,
  cookies?: string,
) => {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      Cookie: cookies ?? "",
    },
  });

  try {
    const data = await graphQLClient.request(query, variables);
    return data;
  } catch (error) {
    console.error("GraphQL request error:", error);
    throw new Error("Failed to fetch data");
  }
};
