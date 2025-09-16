import {
  PaginationWrapper,
  type BlockConfig,
  type BlockRenderer,
  type TableConfig,
} from "@/components/shared/PaginationWrapper";
import {
  BalancedNutritionIntroBlock,
  DeficienciesHeader,
  DeficienciesRow,
  DietaryConsumptionHeaderBlock,
  DietaryConsumptionInsightBlock,
  DietaryConsumptionRow,
  DietaryConsumptionTitleBlock,
  DietaryWarningBlock,
  HeadingBlock,
  MindDietIntroBlock,
  NutritionTitleBlock,
  RecommendationsHeaderBlock,
  RecommendationsRow,
} from "./NutritionBlocks";

/* eslint-disable @typescript-eslint/no-explicit-any */
const NutritionAndDiet = ({ data }: { data: any }) => {
  const createRecommendationBlocks = (data: any): BlockConfig[] => {
    const blocks: BlockConfig[] = [];

    // Find the maximum number of entries to handle different array lengths
    const maxEntries = Math.max(
      data.recommendations.recommended_diet.entries.length,
      data.recommendations.discouraged_diet.entries.length
    );

    // Create combined row blocks
    for (let i = 0; i < maxEntries; i++) {
      blocks.push({
        id: `diet-recommendation-row-${i}`,
        type: "diet-recommendation-row",
        data: {
          recommended: data.recommendations.recommended_diet.entries[i] || null,
          discouraged: data.recommendations.discouraged_diet.entries[i] || null,
        },
      });
    }

    return blocks;
  };

  const createNutritionBlocks = (data: any): BlockConfig[] => [
    { id: "heading", type: "heading", data: data },
    { id: "nutritionTitle", type: "nutritionTitle", data: data },
    { id: "dietaryWarning", type: "dietaryWarning", data: data },
    { id: "deficiencyHeader", type: "deficiency-header" }, // Add header block
    ...data.summary.deficiencies.map((section: any, index: any) => ({
      id: `deficiency-row-${index}`,
      type: "deficiency-row",
      data: section,
    })),
    {
      id: "dietaryConsumptionTitle",
      type: "dietaryConsumptionTitle",
      data: data,
    },
    {
      id: "dietaryConsumptionInsight",
      type: "dietaryConsumptionInsight",
      data: data,
    },
    { id: "dietaryConsumptionHeader", type: "dietary-consumption-header" }, // Add header block
    ...data.consumption.entries.map((section: any, index: any) => ({
      id: `dietary-consumption-row-${index}`,
      type: "dietary-consumption-row",
      data: section,
    })),
    {
      id: "balancedNutritionIntro",
      type: "balancedNutritionIntro",
      data: data,
    },
    // { id: "mindDietTitle", type: "mindDietTitle", data: data },
    { id: "mindDietIntro", type: "mindDietIntro", data: data },
    { id: "recommendationsHeader", type: "recommendations-header", data: data },
    ...createRecommendationBlocks(data),
  ];
  const renderNutritionBlock: BlockRenderer = (block, key, index) => {
    const commonProps = {
      key,
      blockId: block.id,
      // Don't pass setRef here - it's handled by the wrapper
    };

    switch (block.type) {
      case "heading":
        return <HeadingBlock data={undefined} {...commonProps} />;
      case "nutritionTitle":
        return <NutritionTitleBlock {...commonProps} data={block.data} />;
      case "dietaryWarning":
        return <DietaryWarningBlock {...commonProps} data={block.data} />;
      case "deficiency-header":
        return <DeficienciesHeader data={undefined} {...commonProps} />;
      case "deficiency-row":
        return (
          <DeficienciesRow
            index={index}
            data={undefined}
            {...commonProps}
            section={block.data}
          />
        );
      case "dietaryConsumptionTitle":
        return (
          <DietaryConsumptionTitleBlock {...commonProps} data={block.data} />
        );
      case "dietaryConsumptionInsight":
        return (
          <DietaryConsumptionInsightBlock {...commonProps} data={block.data} />
        );
      case "dietary-consumption-header":
        return (
          <DietaryConsumptionHeaderBlock data={undefined} {...commonProps} />
        );
      case "dietary-consumption-row":
        return (
          <DietaryConsumptionRow
            index={index}
            data={undefined}
            {...commonProps}
            section={block.data}
          />
        );
      case "balancedNutritionIntro":
        return (
          <BalancedNutritionIntroBlock data={block.data} {...commonProps} />
        );
      case "mindDietIntro":
        return <MindDietIntroBlock data={block.data} {...commonProps} />;
      case "recommendations-header":
        return (
          <RecommendationsHeaderBlock data={block.data} {...commonProps} />
        );
      case "diet-recommendation-row":
        return <RecommendationsRow data={block.data} {...commonProps} />;
      default:
        return null;
    }
  };

  const tableConfigs: TableConfig[] = [
    {
      headerType: "deficiency-header",
      rowTypes: ["deficiency-row"],
      headerId: "deficiencyHeader",
    },
    {
      headerType: "dietary-consumption-header",
      rowTypes: ["dietary-consumption-row"],
      headerId: "dietaryConsumptionHeader",
    },
    {
      headerType: "recommendations-header",
      rowTypes: ["diet-recommendation-row"],
      headerId: "recommendationsHeader",
      headerData: data,
    },
  ];

  return (
    <PaginationWrapper
      data={data}
      createBlocks={createNutritionBlocks}
      renderBlock={renderNutritionBlock}
      tables={tableConfigs}
    />
  );
};

export default NutritionAndDiet;
