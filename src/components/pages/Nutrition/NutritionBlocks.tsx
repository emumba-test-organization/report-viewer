/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BlockProps } from "@/components/shared/PaginationWrapper";
import { Badge } from "@/components/ui/badge";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleXIcon,
  LightbulbIcon,
} from "lucide-react";
import { forwardRef } from "react";

export const NutritionTitleBlock = forwardRef<HTMLDivElement, BlockProps>(
  ({ data, blockId, setRef }, ref) => (
    <div ref={setRef ? setRef(blockId) : ref}>
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
  <div ref={setRef ? setRef(blockId) : ref}>
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

export const BalancedNutritionTitleBlock = forwardRef<
  HTMLDivElement,
  BlockProps
>(({ data, blockId, setRef }, ref) => {
  console.log("BalancedNutritionTitleBlock data:", data);
  return (
    <div ref={setRef ? setRef(blockId) : ref}>
      <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2 mt-5">
        {data.recommendations.header || "Nutrition & Diet"}
      </h2>
    </div>
  );
});

export const BalancedNutritionIntroBlock = forwardRef<
  HTMLDivElement,
  BlockProps
>(({ data, blockId, setRef }, ref) => (
  <div ref={setRef ? setRef(blockId) : ref}>
    <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2 mt-5">
      {data.recommendations.header || "Nutrition & Diet"}
    </h2>
    <p className="text-xs text-gray-700 mb-2">
      {data.recommendations.header_intro || ""}
    </p>
  </div>
));

export const MindDietIntroBlock = forwardRef<HTMLDivElement, BlockProps>(
  ({ data, blockId, setRef }, ref) => (
    <div ref={setRef ? setRef(blockId) : ref}>
      <h3 className="text-md font-semibold text-gray-900 mb-2">
        {data.mind_diet_title || "MIND Diet: Recommendations and Progress"}
      </h3>
      <p className="text-xs text-gray-700 mb-5">
        {data.recommendations.mind_diet_intro || ""}
      </p>
    </div>
  )
);

export const RecommendationsHeaderBlock = forwardRef<
  HTMLDivElement,
  BlockProps
>(({ data, blockId, setRef }, ref) => (
  <div ref={setRef ? setRef(blockId) : ref} className="grid grid-cols-2 gap-4">
    <div className="bg-green-600 flex flex-col justify-between">
      <div className="grid grid-cols-[22px_1fr] gap-x-3 p-3">
        <CircleCheckIcon
          strokeWidth={2.5}
          size={22}
          color="white"
          className=""
        />
        <p className="text-white font-bold leading-none">Recommended</p>
        <p className="text-white text-sm col-start-2">
          {data?.recommendations?.recommended_instructions}
        </p>
      </div>
      <div className="grid grid-cols-2 bg-gray-300 font-bold text-xs text-gray-900">
        {data?.recommendations?.recommended_diet?.headers?.map(
          (header: any, index: any) => {
            return (
              <div
                key={index}
                className={`p-3 ${
                  index === 0
                    ? "border-l-green-600 border-r-gray-400 border-x-1"
                    : "border-r-green-600 border-r-1"
                }`}
              >
                {header}
              </div>
            );
          }
        )}
      </div>
    </div>
    <div className="bg-red-800 flex flex-col justify-between">
      <div className="grid grid-cols-[22px_1fr] gap-x-3 p-3">
        <CircleXIcon strokeWidth={2.5} size={22} color="white" className="" />
        <p className="text-white font-bold leading-none">Not Recommended</p>
        <p className="text-white text-sm col-start-2">
          {data?.recommendations?.discouraged_instructions || ""}
        </p>
      </div>
      <div className="grid grid-cols-2 bg-gray-300 font-bold text-xs text-gray-900">
        {data?.recommendations?.discouraged_diet?.headers?.map(
          (header: any, index: any) => {
            return (
              <div
                key={index}
                className={`p-3 ${
                  index === 0
                    ? "border-l-red-600 border-r-gray-400 border-x-1"
                    : "border-r-red-600 border-r-1"
                }`}
              >
                {header}
              </div>
            );
          }
        )}
      </div>
    </div>
  </div>
));

export const RecommendationsRow = forwardRef<HTMLDivElement, BlockProps>(
  ({ data: recommendation, blockId, setRef }, ref) => {
    return (
      <div
        ref={setRef ? setRef(blockId) : ref}
        className="grid grid-cols-2 gap-4 text-xs"
      >
        {recommendation.recommended.foodGroup && (
          <div className="grid grid-cols-2">
            <div className="p-3 border-gray-300 border-1 border-t-0 border-l-green-600 border-r-gray-300">
              {recommendation.recommended.foodGroup}
            </div>
            <div className="p-3 border-gray-300 border-1 border-t-0 border-r-green-600 border-l-gray-300">
              {recommendation.recommended.frequency}
            </div>
          </div>
        )}
        {recommendation.discouraged?.foodGroup && (
          <div className="grid grid-cols-2">
            <div className="p-3 border-gray-300 border-1 border-t-0 border-l-red-800 border-r-gray-300">
              {recommendation.discouraged?.foodGroup}
            </div>
            <div className="p-3 border-gray-300 border-1 border-t-0 border-r-red-800 border-l-gray-300">
              {recommendation.discouraged?.frequency}
            </div>
          </div>
        )}
      </div>
    );
  }
);
