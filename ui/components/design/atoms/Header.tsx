import * as React from "react";

type HeaderProps = {
  children: React.ReactNode;
};
export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="flex w-full items-center max-w-screen-lg p-4">
      {children}
    </header>
  );
};
