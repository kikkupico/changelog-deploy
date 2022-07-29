import { ChangelogFile } from "../types";

export function validateChangelogJSON(fileJson: ChangelogFile) {
  const fileValidator = (f: ChangelogFile) => {
    if (!f.changelogs) throw new Error("File does not have changelogs");
    if (!Array.isArray(f.changelogs))
      throw new Error("Changelog is not an array");
  };
  const itemValidators = {
    type: (t: string) => {
      if (typeof t !== "string") throw new Error("Type is not a string");
      if (!["bug-fix", "feature", "enhancement"].includes(t))
        throw new Error(
          "Expected to be one of bug-fix , feature , enhancment but got " + t
        );
    },
    component: (c: string) => {
      if (typeof c !== "string") throw new Error("Component is not a string");
      if (
        ![
          "server",
          "cli",
          "console",
          "build",
          "cli-migrations",
          "integrations",
          "monitoring",
        ].includes(c)
      )
        throw new Error(
          // TODO FIXME
          "Expected to be one of server , cli , console , build but got " + c
        );
    },
    created_at: (t: number) => {
      if (typeof t !== "number") throw new Error("Created_at is not a number");
    },
    short_description: (s: string) => {
      if (typeof s !== "string")
        throw new Error("Short_description is not a string");
    },
    long_description: (l: string) => {
      if (typeof l !== "string")
        throw new Error("Long_description is not a string");
    },
  };

  fileValidator(fileJson);
  fileJson.changelogs.forEach((item) => {
    Object.keys(itemValidators).forEach((key) => {
      if ((item as any)[key] === undefined)
        throw new Error(`Item does not have ${key}`);
      (itemValidators as any)[key]((item as any)[key]);
    });
  });
}
