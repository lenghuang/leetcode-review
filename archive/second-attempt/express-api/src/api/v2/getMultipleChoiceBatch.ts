import express from 'express';
import { getMultipleChoiceBatch } from '../../utils/chatgpt/multiple-choice-batch/multipleChoiceBatch';

const router = express.Router();

router.get('/', async (req, res) => {
  const response = await getMultipleChoiceBatch();
  res.json(response);
});

export default router;
