import * as React from "react";

type LabelKind = "active" | "default";
type LabelProps = {
  id: string;
  text: string;
  kind: LabelKind;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const getLabelStyles = (kind: LabelKind) => {
  switch (kind) {
    case "active":
      return {
        bg: " bg-brandBlue-100 border border-brandBlue-400",
        text: "text-brandBlue-400",
      };
    case "default":
    default:
      return {
        bg: " border border-gray-400 bg-gray-100",
        text: "text-gray-400",
      };
  }
};

export const Label: React.FC<LabelProps> = ({ text, kind, id, onClick }) => {
  const labelStyles = getLabelStyles(kind);
  return (
    <div
      id={id}
      data-testid={id}
      className={`flex items-center h-8 px-4 rounded-full cursor-pointer ${labelStyles.bg}`}
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
      }}
    >
      <p className={`text-sm font-semibold ${labelStyles.text}`}>{text}</p>
    </div>
  );
};
