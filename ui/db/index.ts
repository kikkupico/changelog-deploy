import path from "path";
import { DATA_DIRS } from "../constants";
import { cached } from "./cache";
import { loadDB } from "./filemodel";
import { queryStrToFilterFn } from "./query";
import { ChangelogDBItem, DBType } from "./types";

/*
INTERFACE
- read - reads the entire changelog from all the files in the changelog directories.
- query - queries the changelog for entries with the special query DSL; internally uses 'read'.

CACHING
Each of these functions are cached. 'read' is cached to avoid re-reading the file system every time.
'query' is also cached to avoid re-running the querying logic during pagination.

QUERY DSL
We use a special DSL based on the query string syntax to query the changelog.
Apart from the usual query string syntax, we also support the following:
- '*' at the end of a key means that the item must contain the given string.
- - also works for array values.
- '|' at the end of a key means that the item must be one of the given strings.
- - also works for array values, in which case set intersection is checked.
- 'from' and 'to' are used to filter by date. 'item.created_at' is tested against.
Examples
- '?product|=cloud|ee&version=1.0.0' - returns all entries with product 'cloud' or 'ee' and version '1.0.0'
- '?markdown*=bug' - returns all entries having a markdown containing 'bug'

NOTE: unknown keys are ignored.
*/

export function makeDB(dir: string): DBType {
  const db: DBType = {
    read: cached<void, ChangelogDBItem[]>(async function readAllJson() {
      return await loadDB(dir);
    }),
    query: cached<string, ChangelogDBItem[]>(async function query(str: string) {
      return (await db.read()).filter(queryStrToFilterFn(str));
    }),
  };

  return db;
}

const mainDirPath = path.join(process.cwd(), process.env.DATA_DIR_RUNTIME as string);

export default makeDB(mainDirPath);
