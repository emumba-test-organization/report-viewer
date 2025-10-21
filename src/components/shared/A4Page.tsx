import React, { useRef } from "react";
import Header from "./Header";
import { useReport } from "@/context";
import { Footer } from "../pages/Footer";

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
        className="w-[297mm] h-[420mm] mx-auto p-6 bg-white relative"
      >
        <Header data={report?.header} />
        {children}
        <Footer />
      </div>
    );
  } else {
    return <p>No report data available.</p>;
  }
};

export default A4Page;
