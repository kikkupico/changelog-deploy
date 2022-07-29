import * as React from "react";

type PageLayoutProps = {
  children: React.ReactNode;
};
export const Page: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="relative flex flex-col w-full min-h-screen items-center">
      {children}
    </div>
  );
};
