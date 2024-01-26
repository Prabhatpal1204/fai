import React from "react";
import { Button } from "@/components/ui/button";
const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="   w-[90%] mx-auto">{children}</div>;
};

export default layout;
