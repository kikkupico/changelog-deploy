import * as React from "react";
type ButtonSize = "sm" | "md";
type ButtonKind = "primary" | "secondary" | "default" | "default-active";
export type ButtonProps = {
  id: string;
  kind: ButtonKind;
  size: ButtonSize;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const getButtonKindStyles = (kind: ButtonKind) => {
  switch (kind) {
    case "primary":
      return "text-white bg-brandBlue-400 font-semibold focus:bg-brandBlue-600 hover:shadow";
    case "secondary":
      return "text-brandBlue-400 border border-brandBlue-400 hover:bg-brandBlue-100";
    case "default":
      return "font-semibold text-gray-500 border border-gray-400 hover:border-gray-500 hover:bg-brandBlue-100";
    case "default-active":
      return "font-semibold text-gray-500 border border-brandBlue-200 bg-brandBlue-100";
  }
};
const getButtonSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case "sm":
      return "h-8 px-2 text-sm";
    case "md":
      return "h-9 px-2 text-md";
  }
};

export const Button: React.FC<ButtonProps> = ({
  id,
  kind,
  size,
  children,
  onClick,
}) => {
  const kindStyles = getButtonKindStyles(kind);
  const sizeStyles = getButtonSizeStyles(size);
  return (
    <button
      className={`flex items-center w-fit focus:outline-none rounded ${kindStyles} ${sizeStyles}`}
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
      }}
      id={id}
      data-testid={id}
    >
      {children}
    </button>
  );
};
