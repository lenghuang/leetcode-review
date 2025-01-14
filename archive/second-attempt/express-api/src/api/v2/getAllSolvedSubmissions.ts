import express from "express";
import {
  getAllSolvedSubmissions,
  getLeetCodeCookies,
} from "../../utils/leetcode";

const router = express.Router();

router.get("/", async (req, res) => {
  const response = await getAllSolvedSubmissions(getLeetCodeCookies(req));
  return res.json(response);
});

export default router;
