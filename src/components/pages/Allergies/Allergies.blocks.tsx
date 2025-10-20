/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BlockProps } from "@/components/shared/PaginationWrapper";
import { forwardRef } from "react";
import type { AllergiesData } from "./types";
import {
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@/components/shared/TableFlex";

export const AllergiesTitleBlock = forwardRef<
  HTMLDivElement,
  BlockProps<AllergiesData>
>(({ data, blockId, setRef }, ref) => (
  <div ref={setRef ? setRef(blockId) : ref}>
    <h2 className="mb-4 mt-6">{data?.title}</h2>
  </div>
));

export const AllergiesDescriptionBlock = forwardRef<
  HTMLDivElement,
  BlockProps<AllergiesData>
>(({ data, blockId, setRef }, ref) => (
  <div ref={setRef ? setRef(blockId) : ref}>
    <p className="text-sm leading-tight mb-4">{data?.description || ""}</p>
  </div>
));

export const AllergiesTableHeaderBlock = forwardRef<
  HTMLDivElement,
  BlockProps<AllergiesData["headers"]>
>(({ data: headers, blockId, setRef }, ref) => {
  return (
    <div ref={setRef ? setRef(blockId) : ref}>
      <TableHeader>
        {headers.map((header, index) => (
          <TableHeaderCell key={index}>{header}</TableHeaderCell>
        ))}
      </TableHeader>
    </div>
  );
});

export const AllergiesTableRowBlock = forwardRef<
  HTMLDivElement,
  BlockProps<AllergiesData["rows"][number]>
>(({ index, data: entry, blockId, setRef }, ref) => {
  const { allergen, type, reaction } = entry;
  const isOdd = index ? index % 2 !== 0 : false;

  return (
    <div ref={setRef ? setRef(blockId) : ref}>
      <TableRow alternate={isOdd}>
        {/* Food Group */}
        <TableCell>
          <p className="font-medium">{allergen}</p>
        </TableCell>

        {/* Intake */}
        <TableCell>
          <p>{type}</p>
        </TableCell>

        {/* Note */}
        <TableCell>
          <p>{reaction}</p>
        </TableCell>
      </TableRow>
    </div>
  );
});
