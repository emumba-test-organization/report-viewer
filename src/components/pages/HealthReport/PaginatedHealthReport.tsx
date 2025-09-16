/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import A4Page from "../../shared/A4Page";
import { useMeasuredHeight } from "@/utils/hooks";
import {
  HealthStatusSectionBlock,
  HealthStatusTitleBlock,
  OverviewBlock,
  TitleBlock,
} from "./HealthReportBlocks";

// Page dimensions
const PAGE_HEIGHT = 1122.52;
const MARGIN = 40;
const HEADER_HEIGHT_PX = 36;
const SAFETY_MARGIN = 160;
const CONTENT_HEIGHT =
  PAGE_HEIGHT - HEADER_HEIGHT_PX - SAFETY_MARGIN - MARGIN * 2;

// Main paginated health report component
const PaginatedHealthReport = ({ data }: { data: any }) => {
  const { heights, setRef } = useMeasuredHeight();
  const [pages, setPages] = useState<any[][]>([]);
  const [measured, setMeasured] = useState(false);
  const [blocks, setBlocks] = useState<
    {
      id: string;
      type: string;
      data?: any;
    }[]
  >([]);

  // Create atomic blocks
  useEffect(() => {
    const atomicBlocks = [
      { id: "title", type: "title", data: data },
      { id: "overview", type: "overview", data: data },
      { id: "health-status-title", type: "health-status-title" },
      ...data.healthStatusSections.map((section: any, index: any) => ({
        id: `health-section-${index}`,
        type: "health-section",
        data: section,
      })),
    ];
    setBlocks(atomicBlocks);
  }, [data]);

  // Calculate pages based on measured heights
  useEffect(() => {
    if (Object.keys(heights).length === blocks.length && blocks.length > 0) {
      const calculatedPages = [];
      let currentPage: any[] = [];
      let currentPageHeight = 0;

      blocks.forEach((block) => {
        const blockHeight = heights[block.id] || 0;

        // If this block would overflow the current page
        if (
          currentPageHeight + blockHeight > CONTENT_HEIGHT &&
          currentPage.length > 0
        ) {
          calculatedPages.push([...currentPage]);
          currentPage = [block];
          currentPageHeight = blockHeight;
        } else {
          currentPage.push(block);
          currentPageHeight += blockHeight;
        }
      });

      // Add the last page if it has content
      if (currentPage.length > 0) {
        calculatedPages.push(currentPage);
      }

      setPages(calculatedPages);
      setMeasured(true);
    }
  }, [heights, blocks]);

  const renderBlock = (block: any, key: any, forMeasurement = false) => {
    const commonProps = {
      key,
      blockId: block.id,
      setRef: forMeasurement ? setRef : undefined,
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
    <>
      {!measured ? (
        // Measurement phase - render all content to measure heights
        <A4Page>
          {blocks.map((block, index) => renderBlock(block, index, true))}
        </A4Page>
      ) : (
        // Paginated view - render pages based on calculations
        <>
          {pages.map((pageContent, pageIndex) => (
            <A4Page key={pageIndex}>
              {pageContent.map((block, blockIndex) =>
                renderBlock(block, `${pageIndex}-${blockIndex}`, false)
              )}
            </A4Page>
          ))}
        </>
      )}
    </>
  );
};

export default PaginatedHealthReport;
