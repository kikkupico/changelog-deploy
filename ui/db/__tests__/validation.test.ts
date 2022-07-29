import { validateChangelogJSON } from "../filemodel/validator";
import { ChangelogFile, ChangelogFileItem } from "../types";

describe("validateChangelogJSON", () => {
  it("should not throw an error for a valid json", () => {
    const fileJson: ChangelogFile = {
      changelogs: [
        {
          created_at: 1588888888,
          component: "server",
          type: "bug-fix",
          short_description: "short_description",
          long_description: "long_description",
        },
      ],
    };
    expect(() => validateChangelogJSON(fileJson)).not.toThrow();
  });
  it("should throw an error for missing changelog", () => {
    const fileJson: ChangelogFile = {} as ChangelogFile;
    expect(() => validateChangelogJSON(fileJson)).toThrow();
  });
  it("should throw an error for wrong changelog type", () => {
    const fileJson: ChangelogFile = {
      changelogs: true,
    } as unknown as ChangelogFile;
    expect(() => validateChangelogJSON(fileJson)).toThrow();
  });
  it("should throw an error for a missing props", () => {
    const fileJson: ChangelogFile = {
      changelogs: [
        {
          created_at: 1588888888,
          component: "server",
          type: "bug-fix",
          short_description: "short_description",
        } as ChangelogFileItem,
      ],
    };
    expect(() => validateChangelogJSON(fileJson)).toThrow();
  });
  it("should throw an error for wrong prop type", () => {
    const fileJson: ChangelogFile = {
      changelogs: [
        {
          created_at: "1588888888",
          component: "server2",
          type: "",
          short_description: "short_description",
          long_description: "long_description",
        } as unknown as ChangelogFileItem,
      ],
    };
    expect(() => validateChangelogJSON(fileJson)).toThrow();
  });
});
