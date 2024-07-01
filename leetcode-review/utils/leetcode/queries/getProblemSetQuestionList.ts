"use server";

import { formDataToCookies } from "../cookieUtils";
import { problemsetQuestionListQuery } from "../graphql/problemsetQuestionList";
import { leetCodeRequest } from "../leetCodeClient";

export const getProblemSetQuestionList = async (formData: FormData) => {
  const data = await leetCodeRequest(
    problemsetQuestionListQuery,
    {
      categorySlug: "all-code-essentials",
      skip: 0,
      limit: 10,
      filters: {
        status: "AC",
      },
    },
    formDataToCookies(formData),
  );
  return data;
};
