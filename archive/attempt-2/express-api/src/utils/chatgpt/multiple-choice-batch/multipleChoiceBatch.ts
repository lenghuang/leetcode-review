import { openaiBatchFileUpload, openaiCreateBatch } from "../openai";

import { getExampleJsonlData } from "./multipleChoiceBatch.debug";

// Shows up here https://platform.openai.com/storage

export const getMultipleChoiceBatch = async () => {
  const fileContent = getExampleJsonlData();
  try {
    const fileName = `testLenFile-${Date.now()}.jsonl`;
    const fileRes = await openaiBatchFileUpload(fileContent, fileName);
    const batchRes = await openaiCreateBatch(fileRes.id);
    return batchRes;
  } catch (err) {
    console.error("Error in getMultipleChoiceBatch", err);
    return {};
  }
};
