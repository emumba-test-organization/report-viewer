import type { BlockProps } from "@/components/shared/PaginationWrapper";
import { forwardRef } from "react";

export const GoalTrackerTitle = forwardRef<HTMLDivElement, BlockProps>(
  ({ blockId, setRef }, ref) => (
    <div ref={setRef ? setRef(blockId) : ref}>
      <h1 className="text-4xl font-bold text-gray-900 mb-4 pb-2">
        Your Goal Tracker
      </h1>
      <div className="text-xs text-gray-400 border p-3 w-full h-25">
        Write down your goal
      </div>
    </div>
  )
);

export const GoalTrackerEmptyRow = forwardRef<HTMLDivElement, BlockProps>(
  ({ data, blockId, setRef }, ref) => {
    const isEven = data.index % 2 === 0;
    const rowClass = isEven ? "bg-white" : "bg-gray-100";
    return (
      <div
        className={`flex flex-row border border-gray-300 ${rowClass}`}
        ref={setRef ? setRef(blockId) : ref}
      >
        <div className="p-4 flex-1 text-xs border-r-1 border-gray-300 flex-[2]"></div>
        <div className="p-4 flex-1 text-xs border-r-1 border-gray-300"></div>
        <div className="p-4 flex-1 text-xs"></div>
      </div>
    );
  }
);
