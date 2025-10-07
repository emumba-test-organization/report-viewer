import type { BlockProps } from "@/components/shared/PaginationWrapper";
import { Badge } from "@/components/ui/badge";
import { OctagonAlert } from "lucide-react";
import { forwardRef } from "react";

export const MainTitleBlock = forwardRef<HTMLDivElement, BlockProps>(
  ({ data, blockId, setRef }, ref) => (
    <div ref={setRef ? setRef(blockId) : ref} className="mb-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 pb-2">
        {data?.title || "Medication Management"}
      </h1>
    </div>
  )
);

export const CurrentMedicationsTitle = forwardRef<HTMLDivElement, BlockProps>(
  ({ data, blockId, setRef }, ref) => (
    <div ref={setRef ? setRef(blockId) : ref} className="mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
        {data?.currentMedicationstitle || "Current Comorbidities sss"}
      </h3>
    </div>
  )
);

export const CurrentMedicationsTableHeaderBlock = forwardRef<
  HTMLDivElement,
  BlockProps
>(({ blockId, setRef }, ref) => {
  const headers = ["Medication", "Concerns", "Class/Indication", "Notes"];
  return (
    <div
      className="medication-table-header flex flex-row text-xs font-bold bg-gray-300 border-b-2 border-gray-300"
      ref={setRef ? setRef(blockId) : ref}
    >
      {headers.map((header, index) => (
        <div key={index} className="flex-1 p-3">
          {header}
        </div>
      ))}
    </div>
  );
});

export const CurrentMedicationsTableRowBlock = forwardRef<
  HTMLDivElement,
  BlockProps
>(({ index, data: entry, blockId, setRef }, ref) => {
  const {
    medication,
    dosage,
    class_indication: classIndication,
    risks,
  } = entry;
  const isEven = index ? index % 2 === 0 : true;
  const rowClass = isEven ? "bg-gray-100" : "bg-white";

  return (
    <div
      className={`flex flex-row border border-gray-200 ${rowClass}`}
      ref={setRef ? setRef(blockId) : ref}
    >
      <div className="p-2 flex-1 text-xs border-r">
        <p className="font-medium">{medication}</p>
        <p>{dosage}</p>
      </div>

      <div className="p-2 flex-1 flex flex-col gap-1 text-xs border-r">
        {risks?.fall_risk_score && (
          <div className="flex">
            <Badge
              className={`${
                risks.fall_risk_score > 1 ? "bg-red-800" : "bg-yellow-700"
              } flex items-center font-light text-xs p-0.5 rounded justify-center border-r-0 rounded-tr-none rounded-br-none`}
            >
              <div className="flex text-xs items-center gap-1 px-1">
                <OctagonAlert className="h-3 w-3" />
                <p>Fall Risk</p>
              </div>
            </Badge>

            <Badge
              className={`${
                risks.fall_risk_score > 1 ? "bg-red-800" : "bg-yellow-700"
              } flex text-xs font-light items-center p-0.5 rounded justify-center rounded-tl-none rounded-bl-none`}
            >
              <p className="px-1">{risks.fall_risk_score}</p>
            </Badge>
          </div>
        )}
        {risks?.acb_score && (
          <div className="flex">
            <Badge
              className={`${
                risks.acb_score > 2 ? "bg-red-800" : "bg-yellow-700"
              } flex items-center font-light text-xs p-0.5 rounded justify-center border-r-0 rounded-tr-none rounded-br-none`}
            >
              <div className="flex text-xs items-center gap-1 px-1">
                <OctagonAlert className="h-3 w-3" />
                <p>ACB Score</p>
              </div>
            </Badge>

            <Badge
              className={`${
                risks.acb_score > 2 ? "bg-red-800" : "bg-yellow-700"
              } flex text-xs font-light items-center p-0.5 rounded justify-center rounded-tl-none rounded-bl-none`}
            >
              <p className="px-1">{risks.acb_score}</p>
            </Badge>
          </div>
        )}
      </div>

      <div className="p-2 flex-1 text-xs border-r">{classIndication}</div>
      <div className="p-2 flex-1 text-xs border-r">---</div>
    </div>
  );
});
