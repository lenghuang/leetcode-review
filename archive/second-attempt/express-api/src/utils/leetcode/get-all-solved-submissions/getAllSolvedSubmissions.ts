import getSubmissionDetails from "../submission-details";
import {
  getAllSolvedQuestions,
  getBestSubmission,
  printQueryStats,
} from "./utils";

// Main Logic
const getAllSolvedSubmissions = async (cookies: string) => {
  const time = Date.now(); // Delete later

  const questions = await getAllSolvedQuestions(cookies);
  let accumulator = [];

  for (const q of questions) {
    // Then do business logic
    const s = await getBestSubmission(cookies, q.titleSlug);
    if (s?.id) {
      const sd = await getSubmissionDetails(cookies, s?.id);
      if (sd.submissionDetails) {
        accumulator.push({
          id: s?.id,
          title: s?.title,
          titleSlug: s?.titleSlug,
          lang: s?.lang,
          langName: s?.langName,
          url: s?.url,
          timestamp: s?.timestamp,
          topicTags: q.topicTags.map((tagObj) => tagObj.name),
          code: sd?.submissionDetails?.code,
        });
        console.log("Finished question", q.titleSlug); // Delete later
      } else {
        console.error("Failed to retrieve", q.titleSlug, s.id);
      }
    } else {
      console.error("Failed to retrieve", q.titleSlug);
    }
  }

  const submissions = accumulator.filter((x) => !!x);

  printQueryStats(submissions, questions, time);
  // End, delete later

  return submissions;
};

export default getAllSolvedSubmissions;
