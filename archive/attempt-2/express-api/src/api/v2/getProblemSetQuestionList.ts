import express from "express";
import {
  getLeetCodeCookies,
  getProblemSetQuestionList,
} from "../../utils/leetcode";
getProblemSetQuestionList;

const router = express.Router();

router.get("/", async (req, res) => {
  const submissionList = await getProblemSetQuestionList(
    getLeetCodeCookies(req)
  );

  return res.json(submissionList.problemsetQuestionList);
});

export default router;
