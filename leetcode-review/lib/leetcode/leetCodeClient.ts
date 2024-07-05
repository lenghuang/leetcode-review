// leetCodeClient.ts

import { GraphQLClient, RequestDocument } from "graphql-request";
import { getLeetcodeCookieString, isSyncedToLeetCode } from "../auth/cookies";

// Define your GraphQL endpoint
const endpoint = "https://leetcode.com/graphql";

export const leetCodeRequest = async (
  query: RequestDocument,
  variables?: any,
) => {
  if (!isSyncedToLeetCode()) {
    console.error("Not logged in to leetcode");
  }

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      Cookie: getLeetcodeCookieString() ?? "",
    },
  });

  try {
    const data = await graphQLClient.request(query, variables);
    return data;
  } catch (error) {
    console.error("GraphQL request error:", error);
  }

  return null;
};
