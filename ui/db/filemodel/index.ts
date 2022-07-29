import path from "path";
import { parseReleaseFiles, parseReleaseFolders } from "./parser";
import { ChangelogDBItem } from "../types";
import { buildReleaseFolders, buildReleaseFiles } from "./generator";

const model = [
  {
    product: "cloud",
    reader: async (dir: string) => {
      const dataPlaneFolder = path.join(dir, "/cloud/data-plane/releases");
      const controlPlaneFolder = path.join(dir, "/cloud/control-plane");
      const dataPlaneLogs = await parseReleaseFolders(dataPlaneFolder);
      const controlPlaneLogs = await parseReleaseFiles(controlPlaneFolder);
      return dataPlaneLogs
        .concat(controlPlaneLogs)
        .map((log) => ({ ...log, product: "cloud" }));
    },
    generator: async (parentDir: string) => {
      const dataPlaneFolder = path.join(
        parentDir,
        "/cloud/data-plane/releases"
      );
      const controlPlaneFolder = path.join(parentDir, "/cloud/control-plane");
      await buildReleaseFolders(dataPlaneFolder, 1);
      await buildReleaseFiles(controlPlaneFolder, 1);
    },
  },
  {
    product: "community-edition",
    reader: async (dir: string) => {
      const folder = path.join(dir, "/community-edition/releases");
      return (await parseReleaseFolders(folder)).map((log) => ({
        ...log,
        product: "community-edition",
      }));
    },
    generator: async (parentDir: string) => {
      const folder = path.join(parentDir, "/community-edition/releases");
      await buildReleaseFolders(folder, 1);
    },
  },
  {
    product: "enterprise-edition",
    reader: async (dir: string) => {
      const dataPlaneFolder = path.join(
        dir,
        "/enterprise-edition/data-plane/releases"
      );
      const controlPlaneFolder = path.join(
        dir,
        "/enterprise-edition/control-plane/releases"
      );
      const dataPlaneLogs = await parseReleaseFolders(dataPlaneFolder);
      const controlPlaneLogs = await parseReleaseFolders(controlPlaneFolder);
      return dataPlaneLogs
        .concat(controlPlaneLogs)
        .map((log) => ({ ...log, product: "enterprise-edition" }));
    },
    generator: async (parentDir: string) => {
      const dataPlaneFolder = path.join(
        parentDir,
        "/enterprise-edition/data-plane/releases"
      );
      const controlPlaneFolder = path.join(
        parentDir,
        "/enterprise-edition/control-plane/releases"
      );
      await buildReleaseFolders(dataPlaneFolder, 1);
      await buildReleaseFolders(controlPlaneFolder, 1);
    },
  },
];

export async function buildSampleDB(dir: string) {
  for (const { generator } of model) {
    await generator(dir);
  }
}

export async function loadDB(dir: string) {
  let db: ChangelogDBItem[] = [];
  for (const { reader } of model) {
    const logs = await reader(dir);
    db = db.concat(logs);
  }
  return db;
}
