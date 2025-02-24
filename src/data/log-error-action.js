"use server";

import path from "node:path";
import { createWriteStream } from "node:fs";

const directoryPath = `${process.cwd()}/data/logs`;

export default async function logError(error) {
  const currentDate = new Date(Date.now()).toISOString();

  const fileName = path.join(directoryPath, `${currentDate.split("T")[0]}-error.txt`);

  const fileStream = createWriteStream(fileName, { flags: "a" });

  fileStream.write(`${currentDate} ${error.digest ?? 0} ${error.name}: ${error.message}\n`);
  fileStream.write(`${currentDate} ${error.digest ?? 0} ${error.name}: ${error.stack}\n`);
  
  fileStream.end();
}
