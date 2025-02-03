import { Batch } from "openai/resources";
import { openai, parseJsonlString } from ".";

export const openaiCreateBatch = async (
  input_file_id: string
): Promise<Batch> => {
  try {
    const batch = await openai.batches.create({
      input_file_id: input_file_id,
      endpoint: "/v1/chat/completions",
      completion_window: "24h",
    });
    return batch;
  } catch (err) {
    console.error("openaiCreateBatch error", err);
    throw err;
  }
};

// batch_qOkEHrUeGLGpFveKUb9F8Wkh
export const openaiCheckAndDeleteBatch = async (batch_id: string) => {
  try {
    const batch = await openai.batches.retrieve(batch_id);
    if (batch.status == "completed" && batch.output_file_id) {
      const fileResponse = await openai.files.content(batch.output_file_id);
      const fileContents = await fileResponse.text();
      return parseJsonlString(fileContents);
    } else {
      return {
        status: batch.status,
      };
    }
  } catch (err) {
    console.error("openaiCheckAndDeleteBatch error", err);
    throw err;
  }
};
