import express from "express";
import { getLeetCodeCookies } from "../../utils/leetcode";
import getAllSolvedSubmissionsWithDatabaseInsertion from "../../utils/leetcode/get-all-solved-submissions/getAllSolvedSubmissionsWithDatabaseInsertion";

const router = express.Router();

router.get("/", async (req, res) => {
  const response = await getAllSolvedSubmissionsWithDatabaseInsertion(
    getLeetCodeCookies(req)
  );
  return res.json(response);
});

export default router;
