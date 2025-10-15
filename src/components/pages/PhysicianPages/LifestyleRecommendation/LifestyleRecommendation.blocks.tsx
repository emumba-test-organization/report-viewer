import type { BlockProps } from "@/components/shared/PaginationWrapper";
import { forwardRef } from "react";
import type { LifestyleRecommendationsData } from "./types";

export const MainHeading = forwardRef<HTMLDivElement, BlockProps>(
  ({ blockId, setRef }, ref) => (
    <div ref={setRef ? setRef(blockId) : ref} className="mb-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 pb-2">
        Recommended Lifestyle & Diet
      </h1>
    </div>
  )
);

export const Title = forwardRef<
  HTMLDivElement,
  BlockProps<LifestyleRecommendationsData>
>(({ data, blockId, setRef }, ref) => (
  <div ref={setRef ? setRef(blockId) : ref} className="mb-4">
    <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
      {data?.title || "Current Comorbidities sss"}
    </h3>
  </div>
));

export const Preface = forwardRef<
  HTMLDivElement,
  BlockProps<LifestyleRecommendationsData>
>(({ data, blockId, setRef }, ref) => (
  <div ref={setRef ? setRef(blockId) : ref} className="mb-6">
    <p>{data?.preface || ""}</p>
  </div>
));

export const RecommendationsHeaderBlock = forwardRef<
  HTMLDivElement,
  BlockProps<LifestyleRecommendationsData>
>(({ data, blockId, setRef }, ref) => {
  const headers = data.headers;
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

export const RecommendationTableRowBlock = forwardRef<
  HTMLDivElement,
  BlockProps<LifestyleRecommendationsData["recommendations"][number]>
>(({ index, data: entry, blockId, setRef }, ref) => {
  const { topic, details, comments } = entry;
  const isEven = index ? index % 2 === 0 : true;
  const rowClass = isEven ? "bg-white" : "bg-gray-100";

  return (
    <div
      className={`flex flex-row border border-gray-200 ${rowClass}`}
      ref={setRef ? setRef(blockId) : ref}
    >
      <div className="p-2 flex-1 text-xs border-r">
        <p className="font-medium">{topic}</p>
      </div>

      <div className="p-2 flex-1 text-xs border-r">
        <p className="font-medium">{details}</p>
      </div>

      <div className="p-2 flex-1 text-xs border-r">
        <p className="font-medium">{comments}</p>
      </div>
    </div>
  );
});
