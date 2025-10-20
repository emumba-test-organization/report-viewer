import React, { useRef } from "react";
import Header from "./Header";
import { useReport } from "@/context";

interface A4PageProps {
  children?: React.ReactNode;
}

const A4Page: React.FC<A4PageProps> = ({ children }) => {
  const { report, isLoading } = useReport();
  const containerRef = useRef<HTMLDivElement>(null);

  if (isLoading) return <p>Loading report…</p>;

  const a4MaxHeight = containerRef?.current?.clientHeight;
  console.log("A4 Max Height:", a4MaxHeight);
  if (report) {
    return (
      <div
        ref={containerRef}
        className="w-[210mm] h-[297mm] mx-auto p-6 bg-white"
      >
        <Header data={report?.header} />
        {children}
      </div>
    );
  } else {
    return <p>No report data available.</p>;
  }
};

export default A4Page;
