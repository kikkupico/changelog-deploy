import { promises as fs } from "fs";
import {
  ChangelogFile,
  Domain_FileTypes,
  Domain_ItemComponents,
  Domain_ItemTypes,
  FileType,
  ItemComponent,
  ItemType,
} from "../types";

export async function buildReleaseFolders(dir: string, count = 1) {
  await deleteIfExists(dir);
  await fs.mkdir(dir, { recursive: true });
  for (let majorVersion = 0; majorVersion <= count; majorVersion++) {
    for (let minorVersion = 0; minorVersion <= count; minorVersion++) {
      for (let patchVersion = 0; patchVersion <= count; patchVersion++) {
        const version = `${majorVersion}.${minorVersion}.${patchVersion}`;
        await fs.mkdir(`${dir}/v${version}`, { recursive: true });
        await fs.writeFile(
          `${dir}/v${version}/changelog.json`,
          JSON.stringify(makeSampleChangelog()),
          { flag: "a+" }
        );
        await fs.writeFile(
          `${dir}/v${version}/changelog.md`,
          "#### Changelog\n\nThis is a changelog for this release",
          { flag: "a+" }
        );
      }
    }
  }
}

export async function buildReleaseFiles(dir: string, count = 1) {
  await deleteIfExists(dir);
  await fs.mkdir(dir, { recursive: true });
  for (let majorVersion = 0; majorVersion <= count; majorVersion++) {
    for (let minorVersion = 0; minorVersion <= count; minorVersion++) {
      for (let patchVersion = 0; patchVersion <= count; patchVersion++) {
        const version = `${majorVersion}.${minorVersion}.${patchVersion}`;
        await fs.writeFile(
          `${dir}/v${version}.json`,
          JSON.stringify(makeSampleChangelog()),
          { flag: "a+" }
        );
      }
    }
  }
}

function makeSampleChangelog(): ChangelogFile {
  return {
    release_date: randomDate(),
    type: randomOf<FileType>(Domain_FileTypes),
    changelogs: new Array(Math.floor(Math.random() * 10) + 1)
      .fill(0)
      .map(() => {
        const component = randomOf<ItemComponent>(Domain_ItemComponents);
        const type = randomOf<ItemType>(Domain_ItemTypes);
        return {
          created_at: randomDate(),
          component,
          type,
          short_description: `${type}: This is a short description of the ${component} change`,
          long_description: `This is a long description of the change\n.This is a long description of the change\nThis is a long description of the change\nThis is a long description of the change\nThis is a long description of the change\nThis is a long description of the change\nThis is a long description of the change\nThis is a long description of the change\nThis is a long description of the change\nThis is a long description of the change\nThis is a long description of the change\nThis is a long description of the change\nThis is a long description of the change\nThis is a long description of the change\nThis is a long description of the change\nThis is a long description of the change\nThis is a long description of the change\nThis is a long description of the change\nThis is a long description of the change\nThis is a long description of the change\nThis is a long description of the change\nThis is a long description of the change\nThis is a long description of the change\nThis is a long description of the change\nThis is a long description of the change\n`,
        };
      }),
  };
}

function randomOf<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate() {
  return new Date().getTime() - Math.floor(Math.random() * 1000000);
}

export async function deleteIfExists(dir: string) {
  if (await exists(dir)) await fs.rm(dir, { recursive: true, force: true });
}

async function exists(path: string) {
  try {
    await fs.stat(path);
    return true;
  } catch (e) {
    return false;
  }
}
