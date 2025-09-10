/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BlockProps } from "@/components/shared/PaginationWrapper";
import { forwardRef } from "react";
import type { ComorbiditiesData, ComorbidityRow } from "./types";

export const ComorbiditiesTitleBlock = forwardRef<
  HTMLDivElement,
  BlockProps<ComorbiditiesData>
>(({ data, blockId, setRef }, ref) => (
  <div ref={setRef ? setRef(blockId) : ref}>
    <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-600 pb-1 mt-4">
      {data?.title}
    </h2>
  </div>
));

export const ComorbiditiesDescriptionBlock = forwardRef<
  HTMLDivElement,
  BlockProps<ComorbiditiesData>
>(({ data, blockId, setRef }, ref) => (
  <div ref={setRef ? setRef(blockId) : ref}>
    <p className="text-sm leading-tight text-gray-700 mb-4">{data?.description || ""}</p>
  </div>
));

export const ComorbiditiesTableHeaderBlock = forwardRef<
  HTMLDivElement,
  BlockProps<ComorbiditiesData["headers"]>
>(({ data: headers, blockId, setRef }, ref) => {
  return (
    <div
      className="medication-table-header flex flex-row text-xs font-bold bg-gray-300 border-b-2 border-gray-300"
      ref={setRef ? setRef(blockId) : ref}
    >
      {headers.map((header, index) => (
        <div key={index} className="flex-1 p-4">
          {header}
        </div>
      ))}
    </div>
  );
});

export const ComorbiditiesTableRowBlock = forwardRef<
  HTMLDivElement,
  BlockProps<ComorbidityRow>
>(({ index, data: entry, blockId, setRef }, ref) => {
  const { comorbidity, dateDiagnosed } = entry;
  const isEven = index ? index % 2 === 0 : true;
  const rowClass = isEven ? "bg-gray-100" : "bg-white";

  return (
    <div
      className={`medication-row flex flex-row border border-gray-200 ${rowClass}`}
      ref={setRef ? setRef(blockId) : ref}
    >
      {/* Comorbidity */}
      <div className="p-4 flex-1 text-xs border-r">
        <p className="font-medium">{comorbidity}</p>
      </div>

      {/* Date Diagnosed */}
      <div className="p-4 flex-1 text-xs border-r">
        <p>{dateDiagnosed}</p>
      </div>
    </div>
  );
});
