/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { paginate } from "@/utils/common";
import { usePdfLayout } from "@/utils/PdfLayoutHelper/PdfLayoutHook";

export default function ActionPlanTables({
  data,
  preContentHeightPx,
  preContentHeightMm,
}: {
  data: any;
  preContentHeightPx: number;
  preContentHeightMm: number;
}) {
  const { medications } = data;

  // Refs to measure each row and the container height
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);
  const headerRef = useRef<HTMLTableRowElement>(null);

  const [pages, setPages] = useState<number[][]>([]);
  const [measured, setMeasured] = useState(false);
  const heights = useRef<number[]>([]);
  const { setCurrentPageOccupied, currentPageOccupied } = usePdfLayout();

  console.log("preContentHeightPx inside", preContentHeightPx, currentPageOccupied);

  useEffect(() => {
    heights.current = rowRefs.current.map((r) => r?.clientHeight || 0);
  }, []);
  useEffect(() => {
    // if (measured || !containerRef.current) return;

    // now uses the margin-trimmed height
    const newPages = paginate(heights.current, preContentHeightPx);
    setPages(newPages);
    setMeasured(true);
  }, [measured, preContentHeightPx]);
  useEffect(() => {
    const lastPage = pages[pages.length - 1];
    const lastPageHeight = lastPage
      ? lastPage.reduce((a, b) => a + b, 0) +
        (headerRef.current?.clientHeight || 0)
      : 0;
    setCurrentPageOccupied((current) => {
      const newOccupied = [...current];
      newOccupied[3] = lastPageHeight;
      console.log("setting action plan table occupied: ", newOccupied);
      return newOccupied;
    });
  }, [pages.length]);

  console.log("PAGES: ", pages);

  // While measuring, render the full table off-screen
  if (!measured) {
    return (
      <div ref={containerRef} className={`w-[210mm] screen:mx-auto screen:p-6 bg-white`}>
        <table className="table-auto w-full border-collapse">
          <thead ref={headerRef}>
            <tr>
              <th className="p-4 text-left border-b">Medication</th>
              <th className="p-4 text-left border-b">Purpose</th>
              <th className="p-4 text-left border-b">Instructions</th>
              <th className="p-4 text-left border-b">Already Taking?</th>
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
                <td className="p-4 align-top text-xs border-b">
                  {med.reasoning.map((e: any, j: number) => (
                    <div key={j} className="mb-1">
                      {e.action} {e.name}
                      {e.currentValue && (
                        <div className="text-gray-600 text-xs">
                          Currently: <strong>{e.currentValue}</strong>
                        </div>
                      )}
                    </div>
                  ))}
                </td>
                <td className="p-4 align-top text-xs border-b">
                  {med.guidance}
                </td>
                <td className="p-4 align-top text-xs border-b">
                  <label className="flex items-center gap-2">
                    <Checkbox defaultChecked={med.alreadyTaking === "Yes"} />
                    Yes
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox defaultChecked={med.alreadyTaking === "No"} />
                    No
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Once measured, render each page chunk
  return (
    <>
      {pages.map((pageRows, pageIndex) => {
        console.log("table page: ", pageIndex, pageRows);
        return (
          <div
            key={pageIndex}
            className={`w-[210mm] screen:mx-auto screen:p-6 bg-white`}
            style={{
              height:
                pageIndex === 0 ? `${297 - preContentHeightMm}mm` : "297mm",
            }}
          >
            {/* {pageIndex !== 0 && <Header />} */}
            {/* <Header /> */}
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100 font-semibold text-xs text-gray-900">
                <tr>
                  <th className="p-4 text-left border-b">Medication</th>
                  <th className="p-4 text-left border-b">Purpose</th>
                  <th className="p-4 text-left border-b">Instructions</th>
                  <th className="p-4 text-left border-b">Already Taking?</th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map((height, idx) => {
                  const med = medications[idx];
                  return (
                    <tr key={idx} className="print-table-row">
                      <td className="p-4 align-top text-xs border-b">
                        <div className="font-medium">
                          {idx + 1}: {med.medication}
                        </div>
                        <div className="text-gray-600">{med.dosageDetails}</div>
                      </td>
                      <td className="p-4 align-top text-xs border-b">
                        {med.reasoning.map((e: any, j: number) => (
                          <div key={j} className="mb-1">
                            {e.action} {e.name}
                            {e.currentValue && (
                              <div className="text-gray-600 text-xs">
                                Currently: <strong>{e.currentValue}</strong>
                              </div>
                            )}
                          </div>
                        ))}
                      </td>
                      <td className="p-4 align-top text-xs border-b">
                        {med.guidance}
                      </td>
                      <td className="p-4 align-top text-xs border-b">
                        <label className="flex items-center gap-2">
                          <Checkbox
                            defaultChecked={med.alreadyTaking === "Yes"}
                          />
                          Yes
                        </label>
                        <label className="flex items-center gap-2">
                          <Checkbox
                            defaultChecked={med.alreadyTaking === "No"}
                          />
                          No
                        </label>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </>
  );
}
