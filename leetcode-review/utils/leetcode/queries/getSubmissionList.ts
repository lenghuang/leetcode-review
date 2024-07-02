"use server";

import { formDataToCookies } from "../cookieUtils";
import { submissionListQuery } from "../graphql/submissionList";
import { leetCodeRequest } from "../leetCodeClient";

export const getProblemSetQuestionList = async (
  questionSlug: string,
  formData: FormData,
) => {
  const data = await leetCodeRequest(
    submissionListQuery,
    {
      questionSlug: questionSlug,
      offset: 0,
      limit: 20,
      lastKey: null,
    },
    formDataToCookies(formData),
  );
  return data;
};
