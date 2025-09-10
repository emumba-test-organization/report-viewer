import {
  PaginationWrapper,
  type BlockConfig,
  type BlockRenderer,
  type TableConfig,
} from "@/components/shared/PaginationWrapper";
import {
  ComorbiditiesTitleBlock,
  ComorbiditiesDescriptionBlock,
  ComorbiditiesTableHeaderBlock,
  ComorbiditiesTableRowBlock,
} from "./Comorbidities.blocks";
import type { ComorbiditiesData } from "./types";

/* eslint-disable */
export const createComorbiditiesBlocks = (
  data: ComorbiditiesData
): BlockConfig[] => [
  { id: "comorbiditiesTitle", type: "comorbiditiesTitle", data: data },
  {
    id: "comorbiditiesDescription",
    type: "comorbiditiesDescription",
    data: data,
  },
  {
    id: "comorbiditiesHeader",
    type: "comorbidities-header",
    data: data.headers,
  }, // Add header block
  ...data.rows.map((section, index) => ({
    index,
    id: `comorbidities-row-${index}`,
    type: "comorbidities-row",
    data: section,
  })),
];
export const renderComorbiditiesBlock: BlockRenderer = (block, key, index) => {
  const commonProps = {
    key,
    blockId: block.id,
    // Don't pass setRef here - it's handled by the wrapper
  };

  switch (block.type) {
    case "comorbiditiesTitle":
      return <ComorbiditiesTitleBlock {...commonProps} data={block.data} />;
    case "comorbiditiesDescription":
      return (
        <ComorbiditiesDescriptionBlock {...commonProps} data={block.data} />
      );
    case "comorbidities-header":
      return (
        <ComorbiditiesTableHeaderBlock data={block.data} {...commonProps} />
      );
    case "comorbidities-row":
      return (
        <ComorbiditiesTableRowBlock
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
    headerType: "comorbidities-header",
    rowTypes: ["comorbidities-row"],
    headerId: "comorbiditiesHeader",
  },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
const Comorbidities = ({ data }: { data: ComorbiditiesData }) => {
  return (
    <PaginationWrapper
      data={data}
      createBlocks={createComorbiditiesBlocks}
      renderBlock={renderComorbiditiesBlock}
      tables={tableConfigs}
    />
  );
};

export default Comorbidities;
