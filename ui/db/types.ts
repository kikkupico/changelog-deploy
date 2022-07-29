export type DBType = {
  read: () => Promise<ChangelogDBItem[]>;
  query: (queryStr: string) => Promise<ChangelogDBItem[]>;
};

export type ItemComponent = typeof _ItemComponents[number];
export type ItemType = typeof _ItemTypes[number];
export type FileType = typeof _FileTypes[number];
// we use these internal consts to generate types and domains
const _ItemComponents = ["server", "cli", "console", "build"] as const;
const _ItemTypes = ["bug-fix", "feature", "enhancement"] as const;
const _FileTypes = [
  "update",
  "stable-release",
  "pre-release",
  "patch-release",
] as const;

export const Domain_ItemComponents = _ItemComponents.slice();
export const Domain_ItemTypes = _ItemTypes.slice();
export const Domain_FileTypes = _FileTypes.slice();

export interface ChangelogFileItem {
  created_at: number;
  component: ItemComponent;
  type: ItemType;
  short_description: string;
  long_description: string;
}

export interface ChangelogDBItem {
  components: ItemComponent[];
  types: ItemType[];
  short_descriptions: string[];
  long_descriptions: string[];
  markdown: string | null; // null for cloud/control-plane; string otherwise
  version: string;
  product: string;
  release_date: number;
  kind: FileType;
}

export interface ChangelogFile {
  release_date: number;
  type: FileType;
  changelogs: ChangelogFileItem[];
}
