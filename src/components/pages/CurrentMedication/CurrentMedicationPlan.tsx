/* eslint-disable react-refresh/only-export-components */
import {
  PaginationWrapper,
  type BlockConfig,
  type BlockRenderer,
  type TableConfig,
} from "@/components/shared/PaginationWrapper";
import {
  CurrentMedicationIntroBlock,
  CurrentMedicationTableHeader,
  CurrentMedicationRow,
} from "./CurrentMedicationBlocks";
import type { CurrentMedicationData } from "./CurrentMedication";

const createCurrentMedicationBlocks = (
  data: CurrentMedicationData
): BlockConfig[] => [
  {
    id: "currentMedicationOverview",
    type: "currentMedicationOverview",
    data: data,
  },
  { id: "currentMedicationHeader", type: "current-medication-header" },
  ...data.medications.map(
    (
      medication: CurrentMedicationData["medications"][number],
      index: number
    ) => ({
      id: `current-medication-row-${index}`,
      type: "current-medication-row",
      data: medication,
      index: index,
    })
  ),
];

const renderCurrentMedicationBlock: BlockRenderer = (block, key, index) => {
  const commonProps = {
    key,
    blockId: block.id,
  };

  switch (block.type) {
    case "currentMedicationOverview":
      return <CurrentMedicationIntroBlock {...commonProps} data={block.data} />;
    case "current-medication-header":
      return <CurrentMedicationTableHeader data={undefined} {...commonProps} />;
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

const tableConfigs: TableConfig[] = [
  {
    headerType: "current-medication-header",
    rowTypes: ["current-medication-row"],
    headerId: "currentMedicationHeader",
  },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
const CurrentMedicationPlan = ({ data }: { data: CurrentMedicationData }) => {
  return (
    <PaginationWrapper
      data={data}
      createBlocks={createCurrentMedicationBlocks}
      renderBlock={renderCurrentMedicationBlock}
      tables={tableConfigs}
    />
  );
};

export default CurrentMedicationPlan;
export {
  createCurrentMedicationBlocks,
  renderCurrentMedicationBlock,
  tableConfigs,
};
