import type {
  BlockProps,
  PositionInPage,
} from "@/components/shared/PaginationWrapper";
import { forwardRef } from "react";

export const GoalTrackerTitle = forwardRef<HTMLDivElement, BlockProps>(
  ({ blockId, setRef }, ref) => (
    <div ref={setRef ? setRef(blockId) : ref}>
      <h1 className="mb-4 pb-2">Your Goal Tracker</h1>
      <div className="text-gray-400 border border-alternate-table-border p-3 w-full h-25">
        Write down your goal
      </div>
    </div>
  )
);

export const GoalTrackerEmptyRow = forwardRef<
  HTMLDivElement,
  BlockProps & { positionInPage: PositionInPage }
>(({ data, positionInPage, blockId, setRef }, ref) => {
  const isEven = data.index % 2 === 0;
  const rowClass = isEven ? "bg-white" : "bg-alternate-row-dark";
  return (
    <div
      className={`flex flex-row border-b-1 border-alternate-table-border ${rowClass} ${
        positionInPage === "first" ? "border-t-1 " : ""
      }`}
      ref={setRef ? setRef(blockId) : ref}
    >
      <div className="p-4 text-xs border-l-1 border-r-1 border-alternate-table-border flex-2"></div>
      <div className="p-4 flex-1 text-xs border-r-1 border-alternate-table-border"></div>
      <div className="p-4 flex-1 text-xs border-r-1 border-alternate-table-border"></div>
    </div>
  );
});
