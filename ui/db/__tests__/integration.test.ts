import path from "path";
import { makeDB } from "../";
import { buildSampleDB } from "../filemodel";
import { deleteIfExists } from "../filemodel/generator";

const TEMP_DIR = path.join(process.cwd(), "/temp");

beforeAll(async function buildFileStructure() {
  await deleteIfExists(TEMP_DIR);
  await buildSampleDB(TEMP_DIR);
});

afterAll(async function cleanup() {
  await deleteIfExists(TEMP_DIR);
});

test("db integration test", async () => {
  const db = await makeDB(TEMP_DIR);
  const data = await db.read();
  // console.log(data[0]);
  expect(data).toHaveProperty("length");
  expect(data.length).not.toBe(0);
});
