/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropCircledIcon,
  InhalerIcon,
  MoonIcon,
  MorningIcon,
  PillIcon,
  SunIcon,
  SyringeIcon,
} from "@/components/icons";
import type { BlockProps } from "@/components/shared/PaginationWrapper";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { QrCode } from "lucide-react";
import { forwardRef, type JSX } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const medicineIcons = {
  "Oral tablet": <PillIcon className="w-4 h-4" />,
  "Oral capsule": <PillIcon className="w-4 h-4" />,
  Solution: <DropCircledIcon className="w-4 h-4" />,
  Injection: <SyringeIcon className="w-4 h-4" />,
  Inhaler: <InhalerIcon className="w-4 h-4" />,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const timeSlots = ["morning", "afternoon", "evening"];
const timeSlotIcons: Record<(typeof timeSlots)[number], JSX.Element> = {
  morning: <MorningIcon className="w-5 h-5" />,
  afternoon: <SunIcon className="w-5 h-5" />,
  evening: <MoonIcon className="w-5 h-5" />,
};

export const MedicationPlannerOverview = forwardRef<HTMLDivElement, BlockProps>(
  ({ blockId, setRef }, ref) => {
    return (
      // <div ref={setRef ? setRef(blockId) : ref}>
      <div
        ref={setRef ? setRef(blockId) : ref}
        className="flex justify-between items-start mb-8"
      >
        <h1>Your Medication Planner</h1>
        <div className="flex items-center gap-2">
          <div className="w-16 h-16 border-2 border-gray-300 flex items-center justify-center">
            <QrCode className="w-12 h-12" />
          </div>
          <div className="text-right text-xs text-gray-600">
            <p>Scan to download your next month's planner</p>
            <a
              className="text-blue-600"
              href="https://umethod.com/planner/medication"
            >
              https://umethod.com/planner/medication
            </a>
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
        <div className="border border-r-0 border-border bg-planner-cell-alt w-50 flex-shrink-0"></div>
        {data.slice(0, 13).map((item: any, index: number) => (
          <div
            style={{ minWidth: "42px", maxWidth: "42px", minHeight: "100px" }}
            className={`${
              index % 2 === 0 ? "bg-planner-cell" : "bg-planner-cell-alt"
            } border border-l-0 border-r-1 border-border ${
              index === 0 ? "border-l-1" : ""
            } p-1 flex flex-col justify-end gap-2 align-center`}
            key={index}
          >
            <div
              className={`[writing-mode:vertical-rl] rotate-180 whitespace-nowrap`}
            >
              {new Date(item.date)
                .toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                })
                .replace(/(\w+)\s(\d+)/, "$2 $1")}
            </div>
            <Badge
              variant="outline"
              className="rounded bg-chip-background-alt border-alternate-table-border text-xs py-0 px-1.5"
            >
              {new Date(item.date)
                .toLocaleDateString("en-US", { weekday: "short" })
                .charAt(0)}
            </Badge>
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
      <div className="text-sm border-l border-b border-border bg-alternate-row-dark w-50 flex gap-1 items-center pl-4 flex-shrink-0 justify-start">
        <div className="shrink-0">{timeSlotIcons[data.dayTime]} </div>
        {data.dayTime.charAt(0).toUpperCase() + data.dayTime.slice(1)}
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
            index % 2 === 0 ? "bg-alternate-row-dark" : "bg-alternate-row-dark"
          } border border-border border-l-0 border-t-0 ${
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
    // const medicineDatesSet = new Set(data.dates);
    return (
      <div ref={setRef ? setRef(blockId) : ref}>
        <div className="flex text-center">
          <div className="border border-r-0 border-t-0 border-border bg-white w-50 flex gap-1 items-center pl-4 text-left min-w-0 shrink-0">
            <div className="shrink-0">
              {
                Object.values(medicineIcons)[
                  Math.floor(
                    Math.random() * Object.values(medicineIcons).length
                  )
                ]
              }
            </div>
            <span className="truncate text-sm">{data.medicineName}</span>
          </div>

          {data.originalData.slice(0, 13).map((item: any, index: number) => {
            // Check if this date is in the medicine's scheduled dates
            // const isScheduled = medicineDatesSet.has(item.date);

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
                  index % 2 === 0 ? "bg-white" : "bg-alternate-row-dark"
                } border border-border border-l-0 border-t-0 ${
                  index === 0 ? "border-l-1" : ""
                } p-2 flex justify-center items-center`}
              >
                {/* {isScheduled ? (
                  // Tick mark for scheduled dates
                  <span className="text-green-600 text-lg font-bold">✓</span>
                ) : (
                  // Cross mark for non-scheduled dates
                  <span className="text-red-500 text-lg font-bold">✗</span>
                )} */}
                <Checkbox />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
