import express from "express";
import { openaiCheckAndDeleteBatch } from "../../utils/chatgpt/openai";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await openaiCheckAndDeleteBatch(
      "batch_qOkEHrUeGLGpFveKUb9F8Wkh"
    );
    res.json(data);
  } catch (err) {
    console.error("getMultipleChoiceBatchStatus error", err);
    res.json({});
  }
});

export default router;
