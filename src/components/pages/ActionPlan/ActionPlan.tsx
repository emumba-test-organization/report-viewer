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
import type { Report } from "@/ParticipantReport";
import { createCurrentMedicationBlocks } from "../CurrentMedication/CurrentMedicationPlan";
import {
  CurrentMedicationIntroBlock,
  CurrentMedicationRow,
  CurrentMedicationTableHeader,
} from "../CurrentMedication/CurrentMedicationBlocks";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ActionPlan = ({ data }: { data: any }) => {
  const createHealthBlocks = (data: any): BlockConfig[] => [
    { id: "actionPlanOverview", type: "actionPlanOverview", data: data },
    { id: "medicationHeader", type: "medication-header" }, // Add header block
    ...data.medications.map((section: any, index: any) => ({
      id: `medication-row-${index}`,
      type: "medication-row",
      data: section,
      index: index,
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
      case "currentMedicationOverview":
        return (
          <CurrentMedicationIntroBlock {...commonProps} data={block.data} />
        );
      case "current-medication-header":
        return (
          <CurrentMedicationTableHeader data={undefined} {...commonProps} />
        );
      case "current-medication-row":
        return (
          <CurrentMedicationRow
            index={index}
            data={block.data}
            {...commonProps}
          />
        );
      default:
        return null;
    }
  };

  const createBlocks = (data: Report): BlockConfig[] => {
    const medicationBlocks = createHealthBlocks(data?.actionPlan);
    const currentMedicationBlocks = createCurrentMedicationBlocks(
      data?.currentMedication
    );
    return [...medicationBlocks, ...currentMedicationBlocks];
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
      createBlocks={createBlocks}
      renderBlock={renderHealthBlock}
      tables={tableConfigs}
    />
  );
};

export default ActionPlan;
