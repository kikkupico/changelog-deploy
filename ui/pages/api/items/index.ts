import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../db";
import { stringifyQuery } from "../../../db/query";
import { ChangelogDBItem } from "../../../db/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChangelogDBItem[]>
) {
  const [offset, limit] = [
    req.query.offset ? Number(req.query.offset) : 0,
    req.query.limit ? Number(req.query.limit) : 100,
  ];

  console.log(req.query);

  const items = (
    await db.query(
      stringifyQuery(req.query as Record<string, string | string[]>)
    )
  )
    .map((e: ChangelogDBItem) => e)
    .slice(offset, offset + limit);

  res.status(200).json(items);
}

export const config = {
  unstable_includeFiles: [process.env.DATA_DIR],
};
