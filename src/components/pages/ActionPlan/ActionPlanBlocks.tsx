/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertCircle } from "lucide-react";
import { forwardRef } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import type { BlockProps } from "@/components/shared/PaginationWrapper";
import { Badge } from "@/components/ui/badge";
import type { MedicationType } from "./types";

export const ActionPlanBlock = forwardRef<
  HTMLDivElement,
  BlockProps<MedicationType>
>(({ data, blockId, setRef }, ref) => {
  const { title, intro, steps } = data;

  const formattedSteps = steps
    .map((s: any) =>
      s
        .replace(/,$/, "")
        .trim()
        .replace(/^./, (c: any) => c.toUpperCase())
    )
    .join(", ")
    .replace(/, ([^,]*)$/, " & $1");
  return (
    <div
      ref={setRef ? setRef(blockId) : ref}
      className="action-plan-main-block mb-8"
    >
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
      {/* Introduction with inline steps */}
      <div className="mb-8 text-xs text-gray-700 leading-relaxed">
        {intro[0] && (
          <p className="mb-4">
            {intro[0]} <strong>{formattedSteps}</strong>
          </p>
        )}
        {intro[1] && <p>{intro[1]}</p>}
      </div>
      {/* Medication Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
          Medication
        </h3>
        <p className="text-xs text-gray-700 mb-6">
          Your doctor will indicate if any changes in treatment are needed.
          Obtain the following medications and start taking them using the
          "Instructions" column for assistance.
        </p>
        {/* Warning Box */}
        <div className="bg-yellow-700 p-4 mb-5">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />

            <div className="text-xs">
              <p className="font-semibold text-white mb-1">
                Potential Drug-Drug Interactions (DDIs) have been identified
                between your current medications.
              </p>
              <p className="text-white">
                Ask your physician if any medications should be changed before
                prescribing the three pharmaceuticals newly recommended here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export const MedicationTableHeader = forwardRef<HTMLDivElement, BlockProps>(
  ({ blockId, setRef }, ref) => (
    <div
      className="medication-table-header p-4 flex flex-row text-xs font-bold bg-gray-300 border-b-2 border-gray-300"
      ref={setRef ? setRef(blockId) : ref}
    >
      <div className="flex-1">Medication</div>
      <div className="flex-1">Purpose</div>
      <div className="flex-1">Instructions</div>
      <div className="flex-1">Already Taking?</div>
    </div>
  )
);

export const MedicationRow = forwardRef<
  HTMLDivElement,
  BlockProps<MedicationType["medications"][number]>
>(({ index, section: med, blockId, setRef }, ref) => {
  const isEven = index ? index % 2 === 0 : true;
  const rowClass = isEven ? "bg-white" : "bg-gray-100";

  return (
    <div
      className={`medication-row flex flex-row border border-gray-200 ${rowClass}`}
      ref={setRef ? setRef(blockId) : ref}
    >
      <div className="p-4 flex-1 text-xs">
        <div className="font-semibold">{med?.medication}</div>
        <div className="text-xs text-gray-600">{med?.dosageDetails}</div>
      </div>
      <div className="p-4 flex-1 text-xs">
        {med?.reasoning?.map((action, j: number) => {
          return (
            <div key={j}>
              <div className="mb-1">{action?.action}</div>
              <div className="flex flex-wrap items-baseline gap-0.5">
                {action.reasons.length ? (
                  <p className="text-gray-600">Currently</p>
                ) : null}
                {action.reasons.map((reason, j: number) => {
                  if (reason.currentLevel) {
                    return (
                      <div className="flex" key={j}>
                        <Badge
                          variant="outline"
                          className="flex items-center text-xs p-0.5 rounded justify-center border-r-0 rounded-tr-none rounded-br-none"
                        >
                          {reason.name}
                        </Badge>
                        {reason.currentLevel && (
                          <Badge
                            key={j}
                            variant="outline"
                            className="flex items-center text-xs p-0.5 rounded justify-center rounded-tl-none rounded-bl-none"
                          >
                            {reason.currentLevel}
                          </Badge>
                        )}
                      </div>
                    );
                  } else if (reason.action) {
                    return <div className="mb-1">{reason?.action}</div>;
                  }
                })}
              </div>
            </div>
          );
        }) || null}
      </div>
      <div className="p-4 flex-1 text-xs">{med?.guidance}</div>
      <div className="p-4 flex-1 text-xs">
        <label className="flex items-center gap-2 mb-1">
          <Checkbox defaultChecked={med?.alreadyTaking === "Yes"} />
          <span>Yes</span>
        </label>
        <label className="flex items-center gap-2">
          <Checkbox defaultChecked={med?.alreadyTaking === "No"} />
          <span>No</span>
        </label>
      </div>
    </div>
  );
});
