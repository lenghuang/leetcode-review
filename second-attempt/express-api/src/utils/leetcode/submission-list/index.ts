import leetCodeRequest from "../leetCodeRequest";
import submissionListQuery from "./submissionList.query";
import {
  SubmissionListQueryResponse,
  SubmissionListSubmissions,
} from "./submissionList.types";

const offsetAmount = 50;

const getSubmissionList = async (
  cookies: any,
  slug: string
): Promise<SubmissionListSubmissions> => {
  let delay = 1000;
  let offset = 0;
  let submissions: any = [];
  for (let i = 0; i < 10; i++) {
    try {
      const data: SubmissionListQueryResponse = await leetCodeRequest(
        cookies,
        submissionListQuery,
        {
          questionSlug: slug,
          offset: offset,
          limit: offsetAmount,
          lastKey: null,
        },
        750
      );
      if (data?.questionSubmissionList?.hasNext == false) {
        return submissions.concat(data.questionSubmissionList.submissions); // Return early
      } else if (data?.questionSubmissionList?.submissions) {
        // Add new submissions and queue up another call
        submissions = submissions.concat(
          data.questionSubmissionList.submissions
        );
        offset += offsetAmount;
      }
      console.log("getSubmissionList returned incorrect format or empty.");
    } catch (e) {
      console.log("getSubmissionList had an exception", e);
    }

    // Wait and try again
    await new Promise((resolve) => setTimeout(resolve, delay));
    delay *= 1.2;
  }
  console.error("getSubmissionList  -- all attempts failed");
  return [];
};

export default getSubmissionList;
