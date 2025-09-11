/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  PaginationWrapper,
  type BlockConfig,
  type BlockRenderer,
} from "@/components/shared/PaginationWrapper";
import {
  LifeStyleIntro,
  LifestyleRecommendationBlock,
} from "./LifestyleBlocks";

const Lifestyle = ({ data }: { data: any }) => {
  const createLifecycleBlocks = (data: any): BlockConfig[] => [
    { id: "lifestyleOverview", type: "lifestyleOverview", data: data },
    ...(data.recommendations || []).map((section: any, index: number) => ({
      id: `lifestyle-section-${index}`,
      type: "lifestyle-section",
      data: section,
    })),
  ];

  const renderLifecycleBlock: BlockRenderer = (block, key, index) => {
    const commonProps = {
      key,
      blockId: block.id,
    };

    switch (block.type) {
      case "lifestyleOverview":
        return <LifeStyleIntro {...commonProps} data={block.data} />;
      case "lifestyle-section":
        return (
          <LifestyleRecommendationBlock
            {...commonProps}
            index={index}
            data={block.data}
          />
        );
      default:
        return null;
    }
  };

  return (
    <PaginationWrapper
      data={data}
      createBlocks={createLifecycleBlocks}
      renderBlock={renderLifecycleBlock}
    />
  );
};

export default Lifestyle;
