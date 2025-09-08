/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  PaginationWrapper,
  type BlockConfig,
  type BlockRenderer,
} from "@/components/shared/PaginationWrapper";
import {
  HealthStatusSectionBlock,
  HealthStatusTitleBlock,
  OverviewBlock,
  TitleBlock,
} from "./HealthReportBlocks";

const HealthReport = ({ data }: { data: any }) => {
  const createHealthBlocks = (data: any): BlockConfig[] => [
    { id: "title", type: "title", data: data },
    { id: "overview", type: "overview", data: data },
    { id: "health-status-title", type: "health-status-title" },
    ...(data.healthStatusSections || []).map((section: any, index: number) => ({
      id: `health-section-${index}`,
      type: "health-section",
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
      case "title":
        return <TitleBlock {...commonProps} data={block.data} />;
      case "overview":
        return <OverviewBlock {...commonProps} data={block.data} />;
      case "health-status-title":
        return <HealthStatusTitleBlock data={undefined} {...commonProps} />;
      case "health-section":
        return (
          <HealthStatusSectionBlock
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

export default HealthReport;
