import {
  PaginationWrapper,
  type BlockConfig,
  type BlockRenderer,
  type TableConfig,
} from "@/components/shared/PaginationWrapper";
import {
  PotentialDdiBlock,
  SupplementsIntroBlock,
  SupplementsRow,
  SupplementsTableHeader,
  SupplementsTipBlock,
} from "./SupplementBlocks";

/* eslint-disable @typescript-eslint/no-explicit-any */
const SupplementPlan = ({ data }: { data: any }) => {
  console.log("SupplementPlan data:", data);
  const createSupplementBlocks = (data: any): BlockConfig[] => [
    {
      id: "supplementPlanOverview",
      type: "supplementPlanOverview",
      data: data,
    },
    { id: "supplementPotentialDdi", type: "supplementPotentialDdi" },
    { id: "supplementsHeader", type: "supplements-header" }, // Add header block
    ...data.meds.map((section: any, index: any) => ({
      id: `supplement-row-${index}`,
      type: "supplement-row",
      data: section,
    })),
    { id: "supplementsTip", type: "supplementsTip" },
  ];

  const renderSupplementBlock: BlockRenderer = (block, key, index) => {
    const commonProps = {
      key,
      blockId: block.id,
      // Don't pass setRef here - it's handled by the wrapper
    };

    switch (block.type) {
      case "supplementPlanOverview":
        return <SupplementsIntroBlock {...commonProps} data={block.data} />;
      case "supplementPotentialDdi":
        return <PotentialDdiBlock data={undefined} {...commonProps} />;
      case "supplements-header":
        return <SupplementsTableHeader data={undefined} {...commonProps} />;
      case "supplement-row":
        return (
          <SupplementsRow
            index={index}
            data={block.data}
            {...commonProps}
            section={block.data}
          />
        );
      case "supplementsTip":
        return <SupplementsTipBlock data={undefined} {...commonProps} />;
      default:
        return null;
    }
  };

  const tableConfigs: TableConfig[] = [
    {
      headerType: "supplements-header",
      rowTypes: ["supplement-row"],
      headerId: "supplementsHeader",
    },
  ];

  return (
    <PaginationWrapper
      data={data}
      createBlocks={createSupplementBlocks}
      renderBlock={renderSupplementBlock}
      tables={tableConfigs}
    />
  );
};

export default SupplementPlan;
