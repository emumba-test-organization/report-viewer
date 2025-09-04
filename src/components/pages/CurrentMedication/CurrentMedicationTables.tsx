/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect } from "react";
import Header from "../../shared/Header"; // Assuming you have a Header component
import { paginate } from "@/utils/common"; // Assuming you have this utility function

export default function CurrentMedicationTables({
  data,
  preContentHeightPx,
  preContentHeightMm,
}: {
  data: any;
  preContentHeightPx: number;
  preContentHeightMm: number;
}) {
  console.log("CurrentMedicationTables data:", data);
  const { medications } = data;

  // Refs to measure each row and the container height
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);

  const [pages, setPages] = useState<number[][]>([]);
  const [measured, setMeasured] = useState(false);

  useEffect(() => {
    if (measured || !containerRef.current) return;

    // Get the height of each measured row
    const heights = rowRefs.current.map((r) => r?.clientHeight || 0);

    // Use the paginate utility to chunk rows into pages
    const newPages = paginate(heights, preContentHeightPx);
    setPages(newPages);
    setMeasured(true);
  }, [measured, preContentHeightPx]);

  // While measuring, render the full table to capture row heights
  if (!measured) {
    return (
      <div ref={containerRef} className={`w-[210mm] mx-auto p-6 bg-white`}>
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="p-4 text-left border-b">Medication</th>
              <th className="p-4 text-left border-b">Class / Indication</th>
              <th className="p-4 text-left border-b">Date Started</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((med: any, idx: number) => (
              <tr
                key={idx}
                ref={(el) => {
                  rowRefs.current[idx] = el;
                }}
              >
                <td className="p-4 align-top text-xs border-b">
                  {med.medication}
                  <div className="text-gray-600">{med.dosageDetails}</div>
                </td>
                <td className="p-3 align-top text-xs border-r-1 border-gray-400">
                  {med.indication}
                </td>
                <td className="p-3 align-top text-xs">{med.dateStarted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Once measured, render the content in paginated format
  return (
    <>
      {pages.map((pageRows, pageIndex) => (
        <div
          key={pageIndex}
          className={`w-[210mm] mx-auto p-6 bg-white overflow-hidden`}
          style={{
            height: pageIndex === 0 ? `${297 - preContentHeightMm}mm` : "297mm",
          }}
        >
          {pageIndex !== 0 && <Header />}
          <table className="w-full border-collapse border-1 border-gray-400">
            <thead className="bg-gray-300 font-bold text-xs text-gray-900">
              <tr>
                <th className="p-3 text-left border-r-1 border-gray-400 w-[41.66%]">
                  Medication
                </th>
                <th className="p-3 text-left border-r-1 border-gray-400 w-[41.66%]">
                  Indication
                </th>
                <th className="p-3 text-left w-[16.66%]">Date Started</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((idx) => {
                const med = medications[idx];
                const isEven = idx % 2 === 0;
                const rowClass = isEven ? "bg-white" : "bg-gray-100";
                return (
                  <tr key={idx} className={`${rowClass} print-table-row`}>
                    <td className="p-3 align-top text-xs border-r-1 border-gray-400">
                      <p className="font-bold">{med.medication}</p>
                      <p>{med.dosageDetails}</p>
                    </td>
                    <td className="p-3 align-top text-xs border-r-1 border-gray-400">
                      {med.indication}
                    </td>
                    <td className="p-3 align-top text-xs">{med.dateStarted}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
}
