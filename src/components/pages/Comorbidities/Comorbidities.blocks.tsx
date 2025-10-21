/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BlockProps } from "@/components/shared/PaginationWrapper";
import { forwardRef } from "react";
import type { ComorbiditiesData, ComorbidityRow } from "./types";
import {
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@/components/shared/TableFlex";

export const ComorbiditiesTitleBlock = forwardRef<
  HTMLDivElement,
  BlockProps<ComorbiditiesData>
>(({ data, blockId, setRef }, ref) => (
  <div ref={setRef ? setRef(blockId) : ref}>
    <h2 className="mb-4 mt-4">{data?.heading}</h2>
  </div>
));

export const ComorbiditiesDescriptionBlock = forwardRef<
  HTMLDivElement,
  BlockProps<ComorbiditiesData>
>(({ data, blockId, setRef }, ref) => (
  <div ref={setRef ? setRef(blockId) : ref}>
    <p className="text-sm leading-tight mb-4">{data?.description || ""}</p>
  </div>
));

export const ComorbiditiesTableHeaderBlock = forwardRef<
  HTMLDivElement,
  BlockProps<ComorbiditiesData["headers"]>
>(({ data: headers, blockId, setRef }, ref) => {
  return (
    <div ref={setRef ? setRef(blockId) : ref}>
      <TableHeader>
        {headers.map((header, index) => (
          <TableHeaderCell key={index} className={index === 0 ? "basis-[70%]" : "basis-[30%]"}>{header}</TableHeaderCell>
        ))}
      </TableHeader>
    </div>
  );
});

export const ComorbiditiesTableRowBlock = forwardRef<
  HTMLDivElement,
  BlockProps<ComorbidityRow>
>(({ index, data: entry, blockId, setRef }, ref) => {
  const { comorbidity, dateDiagnosed } = entry;
  const isOdd = index ? index % 2 === 1 : false;

  return (
    <div ref={setRef ? setRef(blockId) : ref}>
      <TableRow alternate={isOdd}>
        {/* Comorbidity */}
        <TableCell className="basis-[70%]">
          <p className="font-medium">{comorbidity}</p>
        </TableCell>

        {/* Date Diagnosed */}
        <TableCell className="basis-[30%]">
          <p>{dateDiagnosed}</p>
        </TableCell>
      </TableRow>
    </div>
  );
});
