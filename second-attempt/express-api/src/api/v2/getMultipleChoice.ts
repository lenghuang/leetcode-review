import express from 'express';
import { getMultipleChoiceQuestions } from '../../utils/chatgpt/multiple-choice/multipleChoice';

const router = express.Router();

router.get('/', async (req, res) => {
  const response = await getMultipleChoiceQuestions();
  res.json(response);
});

export default router;
