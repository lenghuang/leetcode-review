import express from "express";
import {
  getCommunityAnswerList,
  getLeetCodeCookies,
} from "../../utils/leetcode";

const router = express.Router();

router.get("/", async (req, res) => {
  const response = await getCommunityAnswerList(
    getLeetCodeCookies(req),
    "increasing-triplet-subsequence"
  );
  return res.json(response);
});

export default router;
