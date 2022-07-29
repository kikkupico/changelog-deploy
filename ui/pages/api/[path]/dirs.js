import { promises as fs } from "fs";
import path from "path";

export default async function handler(req, res) {
  const items = await fs.readdir(path.join(process.cwd(), req.params.path));

  res.status(200).json(items.map((item) => path.basename(item)));
}
