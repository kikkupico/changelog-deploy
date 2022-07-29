import * as React from "react";
import { IconProps, Icon } from "../atoms";

type Props = {
  kind: "active" | "default";
  id: string;
  iconKind: IconProps["kind"];
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const IconButton: React.FC<Props> = ({
  onClick,
  iconKind,
  kind,
  id,
}) => {
  return (
    <button
      id={id}
      data-testid={id}
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
      }}
      className={`
                flex items-center justify-center
                h-8 px-2 rounded
                border ${
                  kind === "active"
                    ? "border-brandBlue-200 bg-brandBlue-100"
                    : "border-gray-400"
                }
                hover:border-gray-500
            `}
    >
      <Icon kind={iconKind} id={`${id}-icon`} />
    </button>
  );
};
