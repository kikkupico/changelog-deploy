import { promises as fs } from "fs";
import path from "path";

export default async function handler(req, res) {
  const items = await fs.readdir(process.cwd());

  res.status(200).json(items.map((item) => path.basename(item)));
}
