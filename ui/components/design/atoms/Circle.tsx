import * as React from "react";

export type Props = {
  color: "indigo-500" | "green-500" | "amber-500" | "brandCyan-400";
};

const getBGClassname = (color: Props["color"]) => {
  switch (color) {
    case "indigo-500":
      return "bg-indigo-500";
    case "green-500":
      return "bg-green-500";
    case "amber-500":
      return "bg-amber-500";
    case "brandCyan-400":
      return "bg-brandCyan-400";
  }
};

export const Circle: React.FC<Props> = ({ color }) => {
  return (
    <div
      className={`${getBGClassname(
        color
      )} border-4 border-white circle-sm rounded-full`}
    />
  );
};
