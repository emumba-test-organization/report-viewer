import {
  PaginationWrapper,
  type BlockConfig,
  type BlockRenderer,
  type TableConfig,
} from "@/components/shared/PaginationWrapper";
import {
  CurrentMedicationsTableHeaderBlock,
  CurrentMedicationsTableRowBlock,
  CurrentMedicationsTitle,
  MainTitleBlock,
} from "./MedicationsManagementBlocks";

/* eslint-disable @typescript-eslint/no-explicit-any */
const MedicationsManagement = ({ data }: { data: any }) => {
  console.log("ComorbiditiesAssessment data:", data);
  const createHealthBlocks = (data: any): BlockConfig[] => [
    {
      id: "medicationsManagementTitle",
      type: "medicationsManagementTitle",
      data: data,
    },
    {
      id: "currentMedicationsTitle",
      type: "currentMedicationsTitle",
      data: data,
    },
    {
      id: "currentMedicationssHeader",
      type: "current-medications-header",
    },
    ...data.medications.map((section: any, index: number) => ({
      index,
      id: `current-medications-row-${index}`,
      type: "current-medications-row",
      data: section,
    })),
  ];

  const renderHealthBlock: BlockRenderer = (block, key, index) => {
    const commonProps = {
      key,
      blockId: block.id,
    };

    switch (block.type) {
      case "medicationsManagementTitle":
        return <MainTitleBlock {...commonProps} data={block.data} />;
      case "currentMedicationsTitle":
        return <CurrentMedicationsTitle {...commonProps} data={block.data} />;
      case "current-medications-header":
        return (
          <CurrentMedicationsTableHeaderBlock
            data={undefined}
            {...commonProps}
          />
        );
      case "current-medications-row":
        return (
          <CurrentMedicationsTableRowBlock
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
      headerType: "current-medications-header",
      rowTypes: ["current-medications-row"],
      headerId: "currentMedicationssHeader",
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

export default MedicationsManagement;
