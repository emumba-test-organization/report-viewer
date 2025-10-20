/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  PaginationWrapper,
  type BlockConfig,
  type BlockRenderer,
} from "@/components/shared/PaginationWrapper";
import { GoalTrackerEmptyRow, GoalTrackerTitle } from "./GaolTrackerBlocks";

const GoalTracker = () => {
  const createHealthBlocks = (): BlockConfig[] => [
    { id: "title", type: "title" },
    ...Array(47)
      .fill(null)
      .map((_, index) => ({
        id: `emptyRow-${index}`,
        type: "empty-row",
        data: { index: index },
      })),
  ];

  const renderHealthBlock: BlockRenderer = (block, key, index, positionInPage) => {
    const commonProps = {
      key,
      blockId: block.id,
      // Don't pass setRef here - it's handled by the wrapper
    };

    console.log("mnmn", index)

    switch (block.type) {
      case "title":
        return <GoalTrackerTitle {...commonProps} data={undefined} />;
      case "empty-row":
        return <GoalTrackerEmptyRow {...commonProps} data={block.data} positionInPage={positionInPage || 0} />;
      default:
        return null;
    }
  };

  return (
    <PaginationWrapper
      data={undefined}
      createBlocks={createHealthBlocks}
      renderBlock={renderHealthBlock}
    />
  );
};

export default GoalTracker;
