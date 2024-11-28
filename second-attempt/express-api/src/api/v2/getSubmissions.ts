import express from 'express';
import { getLeetCodeCookies, getSubmissionList } from '../../utils/leetcode';

const router = express.Router();

router.get('/', async (req, res) => {
  const submissionList = await getSubmissionList(
    getLeetCodeCookies(req),
    'median-of-two-sorted-arrays',
  );

  return res.json(submissionList);
});

export default router;
