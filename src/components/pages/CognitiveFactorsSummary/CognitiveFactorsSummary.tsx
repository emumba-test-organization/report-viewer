/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  PaginationWrapper,
  type BlockConfig,
  type BlockRenderer,
} from "@/components/shared/PaginationWrapper";
import {
  CognitiveFactorsSectionBlock,
  TitleBlock,
} from "./CognitiveFactorsSummaryBlocks";

const CognitiveFactorsSummary = ({ data }: { data: any }) => {
  const createHealthBlocks = (data: any): BlockConfig[] => [
    { id: "title", type: "title", data: data },
    ...(data.healthStatusSections || []).map((section: any, index: number) => ({
      id: `health-section-${index}`,
      type: "health-section",
      data: section,
    })),
  ];

  const renderHealthBlock: BlockRenderer = (block, key) => {
    const commonProps = {
      key,
      blockId: block.id,
      // Don't pass setRef here - it's handled by the wrapper
    };

    switch (block.type) {
      case "title":
        return <TitleBlock {...commonProps} data={block.data} />;
      case "health-section":
        return (
          <CognitiveFactorsSectionBlock
            data={undefined}
            {...commonProps}
            section={block.data}
          />
        );
      default:
        return null;
    }
  };

  return (
    <PaginationWrapper
      data={data}
      createBlocks={createHealthBlocks}
      renderBlock={renderHealthBlock}
    />
  );
};

export default CognitiveFactorsSummary;
