/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BlockProps } from "@/components/shared/PaginationWrapper";
import { QrCode } from "lucide-react";
import { forwardRef } from "react";

export const MedicationPlannerOverview = forwardRef<HTMLDivElement, BlockProps>(
  ({ blockId, setRef }, ref) => {
    return (
      // <div ref={setRef ? setRef(blockId) : ref}>
      <div
        ref={setRef ? setRef(blockId) : ref}
        className="flex justify-between items-start mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900">
          Your Medication Planner
        </h2>
        <div className="flex items-center gap-4">
          <div className="text-right text-xs text-gray-600">
            <p>Scan to download your next month's planner</p>
            <p className="text-blue-600">
              https://umethod.com/planner/medication
            </p>
          </div>
          <div className="w-16 h-16 border-2 border-gray-300 flex items-center justify-center">
            <QrCode className="w-12 h-12" />
          </div>
        </div>
      </div>
    );
  }
);

export const MedicationPlannerDatesHeader = forwardRef<
  HTMLDivElement,
  BlockProps
>(({ data, blockId, setRef }, ref) => {
  return (
    <div ref={setRef ? setRef(blockId) : ref}>
      <div className="flex text-center font-semibold">
        <div className="border border-r-0 border-gray-400 bg-gray-200 w-50 flex-shrink-0"></div>
        {data.slice(0, 13).map((item: any, index: number) => (
          <div
            key={index}
            style={{ minWidth: "42px", maxWidth: "42px" }}
            className={`${
              index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
            } border border-r-0 border-gray-400 ${
              index === 0 ? "border-r-1" : ""
            } p-2 [writing-mode:vertical-rl] rotate-180 whitespace-nowrap`}
          >
            {item.date}
          </div>
        ))}
      </div>
    </div>
  );
});

export const MedicationPlannerTimeHeader = forwardRef<
  HTMLDivElement,
  BlockProps
>(({ data, blockId, setRef }, ref) => (
  <div ref={setRef ? setRef(blockId) : ref}>
    <div className="flex text-center font-semibold">
      <div className="border-l border-b border-gray-400 bg-gray-200 w-50 flex items-center pl-4 flex-shrink-0 justify-start">
        {data.dayTime}
      </div>
      {data.originalData.slice(0, 13).map((_: any, index: number) => (
        <div
          key={index}
          style={{
            minWidth: "42px",
            maxWidth: "42px",
            minHeight: "42px",
            maxHeight: "42px",
          }}
          className={`${
            index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
          } border border-gray-400 border-l-0 border-t-0 ${
            index === 0 ? "border-l-1" : ""
          } p-2`}
        ></div>
      ))}
    </div>
  </div>
));

export const MedicationPlannerTimeRow = forwardRef<HTMLDivElement, BlockProps>(
  ({ data, blockId, setRef }, ref) => {
    // Create a Set for faster lookup of medicine dates
    const medicineDatesSet = new Set(data.dates);
    return (
      <div ref={setRef ? setRef(blockId) : ref}>
        <div className="flex text-center">
          <div className="border border-r-0 border-t-0 border-gray-400 bg-gray-100 w-50 flex items-center pl-4 text-left min-w-0 flex-shrink-0">
            <span className="truncate">{data.medicineName}</span>
          </div>

          {data.originalData.slice(0, 13).map((item: any, index: number) => {
            // Check if this date is in the medicine's scheduled dates
            const isScheduled = medicineDatesSet.has(item.date);

            return (
              <div
                key={index}
                style={{
                  minWidth: "42px",
                  maxWidth: "42px",
                  minHeight: "42px",
                  maxHeight: "42px",
                }}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                } border border-gray-400 border-l-0 border-t-0 ${
                  index === 0 ? "border-l-1" : ""
                } p-2 flex justify-center items-center`}
              >
                {isScheduled ? (
                  // Tick mark for scheduled dates
                  <span className="text-green-600 text-lg font-bold">✓</span>
                ) : (
                  // Cross mark for non-scheduled dates
                  <span className="text-red-500 text-lg font-bold">✗</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
