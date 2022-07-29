import * as React from "react";
import { FaFilter } from "react-icons/fa";
import { GoSearch } from "react-icons/go";

export type IconProps = {
  kind: "search" | "filter";
  id: string;
};

export const Icon: React.FC<IconProps> = ({ kind, id }) => {
  const props = {
    className: "fill-gray-500",
    id,
    "data-testid": id,
  };
  switch (kind) {
    case "search":
      return <GoSearch {...props} />;
    case "filter":
      return <FaFilter {...props} />;
  }
};
