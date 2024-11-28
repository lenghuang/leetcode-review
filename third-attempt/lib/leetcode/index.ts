import { getOneAcceptedSubmission } from "./fetchers/getOneAcceptedSubmission";
import { getQuestionContent } from "./fetchers/getQuestionContent";
import { getQuestionTitleAndContent } from "./fetchers/getQuestionTitleAndContent";
import { getQuestions } from "./fetchers/getQuestions";
import { getSingleQuestionTopicTags } from "./fetchers/getSingleQuestionTopicTags";
import { getSubmissionDetail } from "./fetchers/getSubmissionDetail";
import { getSubmissions } from "./fetchers/getSubmissions";
import { SubmissionListSubmissions } from "./graphql/submission-list";

export {
  getOneAcceptedSubmission,
  getQuestionContent,
  getQuestions,
  getQuestionTitleAndContent,
  getSingleQuestionTopicTags,
  getSubmissionDetail,
  getSubmissions,
  type SubmissionListSubmissions,
};
