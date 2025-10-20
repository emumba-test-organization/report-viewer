import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import type { Report } from "@/ParticipantReport";

interface A4PageProps {
  children?: React.ReactNode;
}

const A4Page: React.FC<A4PageProps> = ({ children }) => {
  const [report, setReport] = useState<Report | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/report_participant.json")
      .then((res) => res.json())
      .then(setReport)
      .catch((err) => console.error("Failed to load report:", err));
  }, []);

  if (!report) return <p>Loading report…</p>;
  
  const a4MaxHeight = containerRef?.current?.clientHeight;
  console.log("A4 Max Height:", a4MaxHeight);
  return (
    <div
      ref={containerRef}
      className="w-[210mm] h-[297mm] mx-auto p-6 bg-white"
    >
      <Header data={report.header} />
      {children}
    </div>
  );
};

export default A4Page;
