import * as React from "react";

type BodyProps = {
  children: React.ReactNode;
};
export const Body: React.FC<BodyProps> = ({ children }) => {
  return (
    <main className="flex flex-col w-full max-w-screen-lg p-4">{children}</main>
  );
};
