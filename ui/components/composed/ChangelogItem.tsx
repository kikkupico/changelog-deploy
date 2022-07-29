import dynamic from "next/dynamic";
import * as React from "react";
import { Circle, Props as CircleProps } from "../design/atoms/Circle";
import { deduplicate } from "../../utils/helpers";

const ReactMarkdown = dynamic<{ children: React.ReactNode }>(
  () => import("react-markdown") as any,
  { ssr: false }
);

type ChangeType = "bug-fix" | "feature" | "enhancement" | "misc";
const knownChangeTypes: ChangeType[] = ["bug-fix", "feature", "enhancement"];

type Props = {
  kind: string;
  types: string[];
  metadata:
    | {
        kind: "versioned";
        version: string;
        markdown: string;
      }
    | {
        kind: "update";
        version: string;
        shortDescription: string;
        longDescription: string;
      };
  date: Date;
  isLast: boolean;
  product: string;
  index: number;
};

const getReleaseKindText = (kind: Props["kind"]) => {
  switch (kind) {
    case "stable-release":
      return "Release";
    case "pre-release":
      return "Coming Soon";
    case "patch-release":
      return "Patch";
    default:
      return "Update";
  }
};

const getCircleColor = (index: number): CircleProps["color"] => {
  const colors: CircleProps["color"][] = [
    "brandCyan-400",
    "amber-500",
    "green-500",
    "indigo-500",
  ];
  return colors[index % 4] || colors[0];
};

export const getLabelText = (kind: Props["kind"], types: Props["types"]) => {
  return [getReleaseKindText(kind), ...deduplicate(types)].join(" • ");
};

export const getVersionPath = (offering: Props["product"], version: string) => {
  switch (offering) {
    case "cloud":
      return "/cloud/" + version;
    case "community-edition":
      return "/community-edition/" + version;
    case "enterprise-edition":
      return "/community-edition/" + version;
    default:
      return "/";
  }
};

export const ChangelogItem: React.FC<Props> = ({
  kind,
  types,
  metadata,
  date,
  isLast,
  index,
  product,
}) => {
  const changeTypes: ChangeType[] = types.map((t) => {
    if (knownChangeTypes.includes(t as ChangeType)) {
      return t as ChangeType;
    }
    return "misc";
  });

  const renderMarkdown = (text: string) => {
    return (
      <div className="prose prose-headings:text-gray-800 prose-headings:text-lg prose-headings:font-normal prose-headings:font-medium prose-p:text-gray-600 prose-p:font-light">
        <ReactMarkdown>{text}</ReactMarkdown>
        {text}
      </div>
    );
  };

  return (
    <div className="flex w-full">
      <div className="z-10">
        <Circle color={getCircleColor(index)} />
      </div>
      <div
        className={`${
          !isLast ? "border-l-2 border-gray-300" : ""
        } w-full pl-8 pt-1 pb-8 -ml-3`}
      >
        <div className="flex items-center mb-1">
          <p className="font-semibold text-xs">
            {getLabelText(kind, changeTypes)}
          </p>
          <p className="text-xs ml-auto">
            {date.toLocaleString("en-CA", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        {metadata.kind === "versioned" ? (
          <>
            <h2 className="text-lg text-gray-700 mb-2 font-semibold">
              <a
                className="hover:text-brandBlue-600"
                href={getVersionPath(product, metadata.version)}
              >
                {metadata.version}
              </a>
            </h2>
            {renderMarkdown(metadata.markdown)}
          </>
        ) : (
          <>
            <h2 className="text-lg text-gray-700 mb-2 font-semibold">
              <a
                className="hover:text-brandBlue-600"
                href={getVersionPath(product, metadata.version)}
              >
                {metadata.shortDescription}
              </a>
            </h2>
            {renderMarkdown(metadata.longDescription)}
          </>
        )}
      </div>
    </div>
  );
};
