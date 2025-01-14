import express from "express";
import {
  getCommunityAnswerSingle,
  getLeetCodeCookies,
} from "../../utils/leetcode";

const router = express.Router();

router.get("/", async (req, res) => {
  const response = await getCommunityAnswerSingle(
    getLeetCodeCookies(req),
    530693
  );
  return res.json(response);
});

export default router;
