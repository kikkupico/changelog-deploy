import { promises as fs } from "fs";
import path from "path";
import { ChangelogDBItem, ChangelogFile } from "../types";
import { validateChangelogJSON } from "./validator";

export async function parseReleaseFolders(
  dirPath: string
): Promise<ChangelogDBItem[]> {
  const contents = await fs.readdir(dirPath, { withFileTypes: true });
  let res: ChangelogDBItem[] = [];
  for (const item of contents) {
    const itemPath = path.join(dirPath, item.name);
    const markdownPath = path.join(dirPath, "changelog.md");
    if (item.isDirectory()) {
      res = res.concat(await parseReleaseFolders(itemPath));
    } else if (item.name.endsWith(".json")) {
      const fileJson: ChangelogFile = await validatedLoad(itemPath);
      const currentItem: ChangelogDBItem = {
        release_date: fileJson.release_date || 0,
        components: [],
        types: [],
        short_descriptions: [],
        kind: fileJson.type || "stable-release",
        long_descriptions: [],
        markdown: await fs.readFile(markdownPath, "utf8"),
        version: path.parse(dirPath).base,
        product: "", // will be filled in by the calling function
      };

      for (const changelog of fileJson.changelogs) {
        currentItem.components.push(changelog.component);
        currentItem.types.push(changelog.type);
        currentItem.short_descriptions.push(changelog.short_description);
        currentItem.long_descriptions.push(changelog.long_description);
      }
      currentItem.components = dedupe(currentItem.components);
      currentItem.types = dedupe(currentItem.types);
      res.push(currentItem);
    }
  }
  return res;
}

export async function parseReleaseFiles(
  dirPath: string
): Promise<ChangelogDBItem[]> {
  const contents = await fs.readdir(dirPath, { withFileTypes: true });
  const res: ChangelogDBItem[] = [];
  for (const item of contents) {
    const itemPath = path.join(dirPath, item.name);
    if (item.name.endsWith(".json")) {
      const fileJson: ChangelogFile = await validatedLoad(itemPath);
      for (const changelog of fileJson.changelogs) {
        res.push({
          release_date: fileJson.release_date || 0,
          components: [changelog.component],
          types: [changelog.type],
          kind: fileJson.type || "stable-release",
          short_descriptions: [changelog.short_description],
          long_descriptions: [changelog.long_description],
          version: path.parse(itemPath).name,
          markdown: null,
          product: "", // will be filled in by the calling function
        });
      }
    }
  }
  return res;
}

function dedupe(arr: any[]) {
  return Array.from(new Set(arr));
}

async function validatedLoad(itemPath: string): Promise<ChangelogFile> {
  const fileContent = await fs.readFile(itemPath, "utf8");
  let fileJson: ChangelogFile;
  try {
    fileJson = JSON.parse(fileContent);
  } catch (e) {
    throw new Error(`Not a valid JSON file: ${itemPath}`);
  }
  try {
    validateChangelogJSON(fileJson);
  } catch (e) {
    throw new Error(
      `Could not validate changelog content in ${itemPath}. Error: ${
        (e as any).message
      }`
    );
  }
  return fileJson;
}
