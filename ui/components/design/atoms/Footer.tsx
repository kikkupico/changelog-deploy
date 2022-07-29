import * as React from "react";

type FooterProps = {
  children: React.ReactNode;
};
export const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <footer className="flex w-full h-auto max-w-screen-lg p-4">
      {children}
    </footer>
  );
};
