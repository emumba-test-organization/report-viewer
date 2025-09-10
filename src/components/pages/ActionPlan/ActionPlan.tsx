import {
  PaginationWrapper,
  type BlockConfig,
  type BlockRenderer,
  type TableConfig,
} from "@/components/shared/PaginationWrapper";
import {
  ActionPlanBlock,
  MedicationRow,
  MedicationTableHeader,
} from "./ActionPlanBlocks";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ActionPlan = ({ data }: { data: any }) => {
  const createHealthBlocks = (data: any): BlockConfig[] => [
    { id: "actionPlanOverview", type: "actionPlanOverview", data: data },
    { id: "medicationHeader", type: "medication-header" }, // Add header block
    ...data.medications.map((section: any, index: any) => ({
      id: `medication-row-${index}`,
      type: "medication-row",
      data: section,
    })),
  ];

  const renderHealthBlock: BlockRenderer = (block, key, index) => {
    const commonProps = {
      key,
      blockId: block.id,
      // Don't pass setRef here - it's handled by the wrapper
    };

    switch (block.type) {
      case "actionPlanOverview":
        return <ActionPlanBlock {...commonProps} data={block.data} />;
      case "medication-header":
        return <MedicationTableHeader data={undefined} {...commonProps} />;
      case "medication-row":
        return (
          <MedicationRow
            index={index}
            data={block.data}
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
      headerType: "medication-header",
      rowTypes: ["medication-row"],
      headerId: "medicationHeader",
    },
  ];

  return (
    <PaginationWrapper
      data={data}
      createBlocks={createHealthBlocks}
      renderBlock={renderHealthBlock}
      tables={tableConfigs}
    />
  );
};

export default ActionPlan;
