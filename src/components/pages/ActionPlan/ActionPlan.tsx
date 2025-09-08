import {
  PaginationWrapper,
  type BlockConfig,
  type BlockRenderer,
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

  const renderHealthBlock: BlockRenderer = (block, key) => {
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

export default ActionPlan;
