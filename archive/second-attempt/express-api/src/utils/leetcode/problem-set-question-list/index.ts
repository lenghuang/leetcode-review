import leetCodeRequest from "../leetCodeRequest";
import problemSetQuestionListQuery from "./problemSetQuestionList.query";
import { ProblemSetQuestionListResponse } from "./problemSetQuestionList.types";

const getProblemSetQuestionList = async (
  cookies: any,
  skip: number = 0,
  limit: number = 10
): Promise<ProblemSetQuestionListResponse> => {
  try {
    const data: ProblemSetQuestionListResponse = await leetCodeRequest(
      cookies,
      problemSetQuestionListQuery,
      {
        categorySlug: "all-code-essentials",
        skip: skip,
        limit: limit,
        filters: {
          status: "AC",
        },
      }
    );

    if (!data || !data.problemsetQuestionList) {
      console.error(
        "getProblemSetQuestionList request returned incorrect format."
      );
      return { problemsetQuestionList: { total: 0, questions: [] } };
    }
    return data;
  } catch (e) {
    console.error("getProblemSetQuestionList had an exception", e);
    return { problemsetQuestionList: { total: 0, questions: [] } };
  }
};

export default getProblemSetQuestionList;
