import {
  PaginationWrapper,
  type BlockConfig,
  type BlockRenderer,
} from "@/components/shared/PaginationWrapper";
import type { LifestyleRecommendationsData } from "./types";
import {
  MainHeading,
  Preface,
  RecommendationsHeaderBlock,
  RecommendationTableRowBlock,
  Title,
} from "./LifestyleRecommendation.blocks";

type Props = { data: LifestyleRecommendationsData };

const LifestyleRecommendation = ({ data }: Props) => {
  const createHealthBlocks = (
    data: LifestyleRecommendationsData
  ): BlockConfig[] => [
    { id: "heading", type: "heading", data: data },
    { id: "title", type: "title", data: data },
    { id: "preface", type: "preface", data: data },
    { id: "headers", type: "headers", data: data },
    ...(data.recommendations || []).map((recommendation, index: number) => ({
      id: `recommendation-${index}`,
      type: "recommendation",
      data: recommendation,
    })),
  ];

  const renderHealthBlock: BlockRenderer = (block, key, index) => {
    const commonProps = {
      key,
      blockId: block.id,
      // Don't pass setRef here - it's handled by the wrapper
    };

    switch (block.type) {
      case "heading":
        return <MainHeading {...commonProps} data={block.data} />;
      case "title":
        return <Title {...commonProps} data={block.data} />;
      case "preface":
        return <Preface {...commonProps} data={block.data} />;
      case "headers":
        return (
          <RecommendationsHeaderBlock {...commonProps} data={block.data} />
        );
      case "recommendation":
        return (
          <RecommendationTableRowBlock
            data={block.data}
            {...commonProps}
            index={index}
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

export default LifestyleRecommendation;
