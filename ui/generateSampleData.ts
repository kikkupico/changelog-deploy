import path from "path";
import { buildSampleDB } from "./db/filemodel";

(async () => await buildSampleDB(path.join(process.cwd(), "/temp")))();
