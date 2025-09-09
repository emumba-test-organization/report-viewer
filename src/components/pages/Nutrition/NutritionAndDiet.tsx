import {
  PaginationWrapper,
  type BlockConfig,
  type BlockRenderer,
  type TableConfig,
} from "@/components/shared/PaginationWrapper";
import {
  DeficienciesHeader,
  DeficienciesRow,
  DietaryConsumptionHeaderBlock,
  DietaryConsumptionInsightBlock,
  DietaryConsumptionRow,
  DietaryConsumptionTitleBlock,
  DietaryWarningBlock,
  NutritionTitleBlock,
} from "./NutritionBlocks";

/* eslint-disable @typescript-eslint/no-explicit-any */
const NutritionAndDiet = ({ data }: { data: any }) => {
  const createNutritionBlocks = (data: any): BlockConfig[] => [
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
  ];
  const renderNutritionBlock: BlockRenderer = (block, key) => {
    const commonProps = {
      key,
      blockId: block.id,
      // Don't pass setRef here - it's handled by the wrapper
    };

    switch (block.type) {
      case "nutritionTitle":
        return <NutritionTitleBlock {...commonProps} data={block.data} />;
      case "dietaryWarning":
        return <DietaryWarningBlock {...commonProps} data={block.data} />;
      case "deficiency-header":
        return <DeficienciesHeader data={undefined} {...commonProps} />;
      case "deficiency-row":
        return (
          <DeficienciesRow
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
            data={undefined}
            {...commonProps}
            section={block.data}
          />
        );
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
    // You can add more table configurations here:
    {
      headerType: "dietary-consumption-header",
      rowTypes: ["dietary-consumption-row"],
      headerId: "dietaryConsumptionHeader",
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
