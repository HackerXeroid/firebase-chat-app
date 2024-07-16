import React from "react";
import { AppLayoutProps } from "../../types";

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return <div className="flex h-screen bg-gray-100">{children}</div>;
};

export default AppLayout;
