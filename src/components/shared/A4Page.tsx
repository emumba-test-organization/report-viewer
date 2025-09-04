import React, { useRef } from "react";
import Header from "./Header";

interface A4PageProps {
  children?: React.ReactNode;
}

const A4Page: React.FC<A4PageProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const a4MaxHeight = containerRef?.current?.clientHeight;
  console.log("A4 Max Height:", a4MaxHeight);
  return (
    <div
      ref={containerRef}
      className="w-[210mm] h-[297mm] mx-auto p-6 bg-white"
    >
      <Header />
      {children}
    </div>
  );
};

export default A4Page;
