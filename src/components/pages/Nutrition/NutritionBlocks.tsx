/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BlockProps } from "@/components/shared/PaginationWrapper";
import { Badge } from "@/components/ui/badge";
import { CircleAlertIcon, LightbulbIcon } from "lucide-react";
import { forwardRef } from "react";

export const NutritionTitleBlock = forwardRef<HTMLDivElement, BlockProps>(
  ({ data, blockId, setRef }, ref) => (
    <div ref={setRef ? setRef(blockId) : ref} className="title-block">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        {data?.summary?.title}
      </h2>
    </div>
  )
);

export const DietaryConsumptionTitleBlock = forwardRef<
  HTMLDivElement,
  BlockProps
>(({ data, blockId, setRef }, ref) => (
  <div ref={setRef ? setRef(blockId) : ref} className="title-block">
    <h2 className="text-3xl font-bold text-gray-900 mb-8 mt-5">
      {data?.consumption?.title}
    </h2>
  </div>
));
export const DietaryConsumptionInsightBlock = forwardRef<
  HTMLDivElement,
  BlockProps
>(({ data, blockId, setRef }, ref) => (
  <div ref={setRef ? setRef(blockId) : ref} className="bg-purple-800 p-4 mb-5">
    <div className="flex items-start gap-3">
      <LightbulbIcon className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
      <p className="text-sm font-bold text-white">
        {data?.consumption?.advice}
      </p>
    </div>
  </div>
));

export const DietaryWarningBlock = forwardRef<HTMLDivElement, BlockProps>(
  ({ data, blockId, setRef }, ref) => (
    <div
      ref={setRef ? setRef(blockId) : ref}
      className="bg-yellow-600 p-4 mb-5"
    >
      <div className="flex items-start gap-3">
        <CircleAlertIcon className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
        <p className="text-sm font-bold text-white">{data.summary.warning}</p>
      </div>
    </div>
  )
);

export const DietaryConsumptionHeaderBlock = forwardRef<
  HTMLDivElement,
  BlockProps
>(({ blockId, setRef }, ref) => {
  const headers = ["Food Group", "Reported Intake", "Note"];
  return (
    <div
      className="medication-table-header p-4 flex flex-row text-xs font-bold bg-gray-100 border-b-2 border-gray-300"
      ref={setRef ? setRef(blockId) : ref}
    >
      {headers.map((header, index) => (
        <div key={index} className="flex-1">
          {header}
        </div>
      ))}
    </div>
  );
});

export const DietaryConsumptionRow = forwardRef<HTMLDivElement, BlockProps>(
  ({ section: entry, blockId, setRef }, ref) => {
    const { group, intake, note } = entry;

    return (
      <div
        className="medication-row flex flex-row border border-gray-200"
        ref={setRef ? setRef(blockId) : ref}
      >
        {/* Food Group */}
        <div className="p-4 flex-1 text-xs border-r">
          <p className="font-medium">{group}</p>
        </div>

        {/* Intake */}
        <div className="p-4 flex-1 text-xs border-r">
          <p>{intake}</p>
        </div>

        {/* Note */}
        <div className="p-4 flex-1 text-xs border-r">
          <p>{note}</p>
        </div>
      </div>
    );
  }
);

export const DeficienciesHeader = forwardRef<HTMLDivElement, BlockProps>(
  ({ blockId, setRef }, ref) => (
    <div
      className="medication-table-header p-4 flex flex-row text-xs font-bold bg-gray-100 border-b-2 border-gray-300"
      ref={setRef ? setRef(blockId) : ref}
    >
      <div className="flex-1">Nutrient</div>
      <div className="flex-1">Your Result</div>
    </div>
  )
);

export const DeficienciesRow = forwardRef<HTMLDivElement, BlockProps>(
  ({ section: deficiency, blockId, setRef }, ref) => {
    const {
      nutrient,
      nutrient_sub,
      normal_range,
      result: { severity, desc, reading },
    } = deficiency;
    // const isEven = idx % 2 === 0;

    // Alternate background color for rows
    // const rowClass = isEven ? "bg-white" : "bg-gray-100";
    // const isLastRow = idx === deficiencies.length - 1;
    // const lastRowClass = !isLastRow ? "border-b border-gray-300" : "";
    const severityClassMap = {
      "very high": "text-red-700",
      high: "text-yellow-700",
      normal: "text-green-700",
      low: "text-yellow-700",
      "very low": "text-red-700",
    };
    const severityTextClass =
      severityClassMap[
        severity.toLowerCase() as keyof typeof severityClassMap
      ] || "text-gray-800";

    return (
      <div
        className="medication-row flex flex-row border border-gray-200"
        ref={setRef ? setRef(blockId) : ref}
      >
        {/* Food Group */}
        <div className="p-4 flex-1 text-xs border-r">
          <div className="font-semibold text-medium">{nutrient}</div>
          {nutrient_sub && (
            <div className="text-sm text-gray-600">{nutrient_sub}</div>
          )}
        </div>

        {/* Frequency */}
        <div className="p-4 flex-1 text-xs">
          <div className="flex items-center">
            <p className="text-sm font-medium text-gray-700 mr-1">Currently</p>
            <Badge
              variant="outline"
              className={`flex items-center text-medium font-semibold p-1 rounded justify-center bg-accent border-r-0 rounded-tr-none rounded-br-none ${severityTextClass}`}
            >
              {severity
                .toLowerCase()
                .replace(/\b\w/g, (char: any) => char.toUpperCase())}
            </Badge>
            {desc && (
              <Badge
                variant="outline"
                className="flex items-center text-medium font-semibold p-1 border-r-0 bg-accent rounded-none justify-center"
              >
                {desc}
              </Badge>
            )}
            {reading && (
              <Badge
                variant="outline"
                className="flex items-center text-medium font-semibold p-1 rounded justify-center bg-accent rounded-tl-none rounded-bl-none"
              >
                {reading}
              </Badge>
            )}
          </div>
          {normal_range && (
            <p className="text-xs text-gray-600 mt-1">
              Normal Range: {normal_range}
            </p>
          )}
        </div>
      </div>
    );
  }
);
