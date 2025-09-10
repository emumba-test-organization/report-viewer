import {
  PaginationWrapper,
  type BlockConfig,
  type BlockRenderer,
  type TableConfig,
} from "@/components/shared/PaginationWrapper";
import {
  AllergiesTitleBlock,
  AllergiesDescriptionBlock,
  AllergiesTableHeaderBlock,
  AllergiesTableRowBlock,
} from "./Allergies.blocks";
import type { AllergiesData } from "./types";

/* eslint-disable */
export const createAllergiesBlocks = (data: AllergiesData): BlockConfig[] => [
  { id: "allergiesTitle", type: "allergiesTitle", data: data },
  { id: "allergiesDescription", type: "allergiesDescription", data: data },
  { id: "allergiesHeader", type: "allergies-header", data: data.headers }, // Add header block
  ...data.rows.map((section, index) => ({
    index,
    id: `allergies-row-${index}`,
    type: "allergies-row",
    data: section,
  })),
];

export const renderAllergiesBlock: BlockRenderer = (block, key, index) => {
  const commonProps = {
    key,
    blockId: block.id,
    // Don't pass setRef here - it's handled by the wrapper
  };

  switch (block.type) {
    case "allergiesTitle":
      return <AllergiesTitleBlock {...commonProps} data={block.data} />;
    case "allergiesDescription":
      return <AllergiesDescriptionBlock {...commonProps} data={block.data} />;
    case "allergies-header":
      return <AllergiesTableHeaderBlock data={block.data} {...commonProps} />;
    case "allergies-row":
      return (
        <AllergiesTableRowBlock
          index={index}
          data={block.data}
          {...commonProps}
        />
      );
    default:
      return null;
  }
};

export const tableConfigs: TableConfig[] = [
  {
    headerType: "allergies-header",
    rowTypes: ["allergies-row"],
    headerId: "allergiesHeader",
  },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
const Allergies = ({ data }: { data: AllergiesData }) => {
  return (
    <PaginationWrapper
      data={data}
      createBlocks={createAllergiesBlocks}
      renderBlock={renderAllergiesBlock}
      tables={tableConfigs}
    />
  );
};

export default Allergies;
