import { promises as fs } from "fs";

export const fetcher = (url: RequestInfo) =>
  fetch(url).then((res) => res.json());

export async function readIfExists(path: string) {
  try {
    await fs.stat(path);
    return fs.readdir(path);
  } catch (e) {
    return Promise.resolve([]);
  }
}

export const extractFirstFolder = (path: string) => {
  return path.split("/")[0];
};

export const flatten = (str: string | string[]) => {
  if (typeof str === "string") return str;
  else return str.reduce((a, b) => a + b);
};
