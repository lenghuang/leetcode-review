import express from "express";
import { getBestCommunityAnswers } from "../../utils/leetcode";

const router = express.Router();

router.get("/", async (req, res) => {
  const response = await getBestCommunityAnswers("patching-array", 1);
  return res.json(response);
});

export default router;
