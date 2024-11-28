import express from "express";

import MessageResponse from "../../interfaces/MessageResponse";
import getAllSolvedSubmissions from "./getAllSolvedSubmissions";
import getAllSolvedSubmissionsWithDatabaseInsertion from "./getAllSolvedSubmissionsWithInsertion";
import getBestCommunityAnswers from "./getBestCommunityAnswers";
import getCommunityAnswerList from "./getCommunityAnswerList";
import getCommunityAnswerSingle from "./getCommunityAnswerSingle";
import multipleChoice from "./getMultipleChoice";
import multipleChoiceBatch from "./getMultipleChoiceBatch";
import multipleChoiceBatchStatus from "./getMultipleChoiceBatchStatus";
import getProblemSetQuestionList from "./getProblemSetQuestionList";
import getSubmissions from "./getSubmissions";
import testInsertSupabase from "./testInsertSupabase";

const router = express.Router();

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "This is an API used for LeetCode Recall.",
  });
});

router.use("/multipleChoice", multipleChoice);
router.use("/multipleChoiceBatch", multipleChoiceBatch);
router.use("/multipleChoiceBatchStatus", multipleChoiceBatchStatus);
router.use("/getSubmissions", getSubmissions);
router.use("/getProblemSetQuestionList", getProblemSetQuestionList);
router.use("/getAllSolvedSubmissions", getAllSolvedSubmissions);
router.use(
  "/getAllSolvedSubmissionsWithDatabaseInsertion",
  getAllSolvedSubmissionsWithDatabaseInsertion
);
router.use("/testInsertSupabase", testInsertSupabase);
router.use("/getCommunityAnswerList", getCommunityAnswerList);
router.use("/getCommunityAnswerSingle", getCommunityAnswerSingle);
router.use("/getBestCommunityAnswers", getBestCommunityAnswers);

export default router;
