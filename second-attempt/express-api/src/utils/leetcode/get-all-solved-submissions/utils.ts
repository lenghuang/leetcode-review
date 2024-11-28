import { getProblemSetQuestionList, getSubmissionList } from "../";
import { Question } from "../problem-set-question-list/problemSetQuestionList.types";
import { Submission } from "../submission-list/submissionList.types";

// Get most recent / fastest runtime solution
export const getBestSubmission = async (
  cookies: string,
  slug: string
): Promise<Submission | null> => {
  try {
    const submissionList = await getSubmissionList(cookies, slug);
    // Status 10 == Accepted
    // .slice(0, -3) removes the " ms"
    if (submissionList.length <= 0) {
      console.error("getBestSubmission -- 0 submissions");
      return null;
    }
    return submissionList
      .filter((s) => s.status == 10)
      .sort(compareSubmissionByTimeThenMemory)[0];
  } catch (e) {
    console.error("getBestSubmission -- error", e);
    return null;
  }
};

// Choose a good submission randomly
export const compareSubmissionByTimeThenMemory = (
  q1: Submission,
  q2: Submission
) => {
  const time1 = parseInt(q1.runtime.slice(0, -3));
  const time2 = parseInt(q2.runtime.slice(0, -3));
  if (time1 != time2) {
    return time1 - time2;
  }
  // Tiebreak on memory
  const mem1 = parseFloat(q1.memory.slice(0, -3));
  const mem2 = parseFloat(q2.memory.slice(0, -3));
  return mem1 - mem2;
};

// Get all questions in a paginated way
export const getAllSolvedQuestions = async (
  cookies: string
): Promise<Question[]> => {
  try {
    const firstProblem = await getProblemSetQuestionList(cookies, 0, 1);
    if (!firstProblem.problemsetQuestionList) {
      console.error("getAllSolvedSubmissions -- No problems found.");
      return [];
    }

    let questions: any[] = [];
    const total = firstProblem.problemsetQuestionList.total;
    if (total <= 0) {
      console.error("getAllSolvedSubmissions -- 0 solved problems.");
    }

    let questionIndex = 0;
    const step = 100;

    while (questionIndex < total) {
      try {
        const nextProblems = await getProblemSetQuestionList(
          cookies,
          questionIndex,
          step
        );
        const data = nextProblems.problemsetQuestionList;
        if (!data) {
          console.error(
            "getAllSolvedSubmissions -- could not get next set of problems, with skip =",
            questionIndex
          );
          break; // Don't continue if there is an issue.
        }

        questions = questions.concat(data.questions);
        questionIndex += step;

        // Optional: Add delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (innerError) {
        console.error(
          `Failed to fetch problems at index ${questionIndex}`,
          innerError
        );
        // Retry logic or continue based on needs
        break;
      }
    }

    return questions;
  } catch (error) {
    console.error("getAllSolvedSubmissions -- An error occurred:", error);
    return [];
  }
};

export const printQueryStats = (
  submissions: Array<any>,
  questions: Array<any>,
  time: number
) => {
  // Print some stats
  const timeDone = Date.now();
  console.log("Total submissions retrieved", submissions.length);
  console.log(
    "% of submissions retrieved",
    (submissions.length / questions.length) * 1.0
  );
  console.log("Total time", (timeDone - time) / 1000, "seconds");
  console.log(
    "Avg time per question",
    (timeDone - time) / (1000 * questions.length),
    "seconds"
  );
};
