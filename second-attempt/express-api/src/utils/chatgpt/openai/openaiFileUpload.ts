import { createReadStream, createWriteStream } from "fs";
import { ensureDir } from "fs-extra";
import { unlink } from "fs/promises";
import { FileObject } from "openai/resources";
import os from "os";
import path from "path";
import { openai } from ".";

// Shows up here https://platform.openai.com/storage

export const openaiBatchFileUpload = async (
  fileContent: string,
  fileName: string
): Promise<FileObject> => {
  const dirPath = path.join(os.tmpdir(), "leetcode-recall-batch-jsonl-files");
  const filePath = path.join(dirPath, fileName);

  try {
    await ensureDir(dirPath);

    const writer = createWriteStream(filePath);
    writer.write(fileContent); // Can probably be streamed/chunked out
    writer.end();
    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    const file = await openai.files.create({
      file: createReadStream(filePath),
      purpose: "batch",
    });

    await unlink(filePath);

    return file;
  } catch (err) {
    // Bubble up the error
    console.error("Error in openaiFileUpload:", err);
    throw err;
  }
};
