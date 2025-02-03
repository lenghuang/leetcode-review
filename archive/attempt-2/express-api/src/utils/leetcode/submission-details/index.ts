import leetCodeRequest from "../leetCodeRequest";
import { SubmissionDetailQueryResponse } from "./submissionDetail.types";
import submissionDetailQuery from "./submissionDetails.query";

const getSubmissionDetails = async (
  cookies: any,
  submissionId: string
): Promise<SubmissionDetailQueryResponse> => {
  let delay = 1000;
  for (let i = 0; i < 5; i++) {
    try {
      const data: SubmissionDetailQueryResponse = await leetCodeRequest(
        cookies,
        submissionDetailQuery,
        {
          submissionId: submissionId,
        },
        750
      );

      if (data?.submissionDetails) {
        return data; // If successful return early
      }

      console.log("getSubmissionDetails returned incorrect format or empty.");
    } catch (e) {
      console.log("getSubmissionDetails had an exception", e);
    }

    // Wait and try again
    await new Promise((resolve) => setTimeout(resolve, delay));
    delay *= 1.8;
  }

  // Return error object if failed every time
  console.error("getSubmissionDetails -- all attempts failed");
  return { submissionDetails: null };
};

export default getSubmissionDetails;
