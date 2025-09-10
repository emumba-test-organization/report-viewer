/* eslint-disable @typescript-eslint/no-explicit-any */

import A4Page from "@/components/shared/A4Page";
import { useMeasuredHeight } from "@/utils/hooks";
import { useEffect, useState } from "react";
import {
  ActionPlanBlock,
  MedicationRow,
  MedicationTableHeader,
} from "./ActionPlanBlocks";

// Page dimensions
const PAGE_HEIGHT = 1122.52;
const MARGIN = 40;
const HEADER_HEIGHT_PX = 36;
const SAFETY_MARGIN = 120;
const CONTENT_HEIGHT =
  PAGE_HEIGHT - HEADER_HEIGHT_PX - SAFETY_MARGIN - MARGIN * 2;

// Main paginated health report component
const PaginatedActionPlan = ({ data }: { data: any }) => {
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
      { id: "actionPlanOverview", type: "actionPlanOverview", data: data },
      { id: "medicationHeader", type: "medication-header" }, // Add header block
      ...data.medications.map((section: any, index: any) => ({
        id: `medication-row-${index}`,
        type: "medication-row",
        data: section,
      })),
    ];
    setBlocks(atomicBlocks);
  }, [data]);

  useEffect(() => {
    if (Object.keys(heights).length === blocks.length && blocks.length > 0) {
      const calculatedPages = [];
      let currentPage: any[] = [];
      let currentPageHeight = 0;

      blocks.forEach((block) => {
        const blockHeight = heights[block.id] || 0;

        // Special handling for medication rows
        if (block.type === "medication-row") {
          const headerHeight = heights["medicationHeader"] || 0;

          // Check if we need to add header (first medication row or starting new page)
          const needsHeader =
            currentPage.length === 0 ||
            !currentPage.some((b) => b.type === "medication-header");

          let totalHeightNeeded = blockHeight;
          if (needsHeader) {
            totalHeightNeeded += headerHeight;
          }

          // If this would overflow and we have content, start new page
          if (
            currentPageHeight + totalHeightNeeded > CONTENT_HEIGHT &&
            currentPage.length > 0
          ) {
            calculatedPages.push([...currentPage]);
            currentPage = [];
            currentPageHeight = 0;

            // Add header to new page since we're starting with a medication row
            currentPage.push({
              id: `medicationHeader-${calculatedPages.length}`,
              type: "medication-header",
            });
            currentPageHeight += headerHeight;
          } else if (needsHeader && currentPage.length > 0) {
            // Add header to current page if needed
            currentPage.push({
              id: `medicationHeader-inline`,
              type: "medication-header",
            });
            currentPageHeight += headerHeight;
          }

          currentPage.push(block);
          currentPageHeight += blockHeight;
        } else {
          // Handle non-medication blocks normally
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

  //   // Calculate pages based on measured heights
  //   useEffect(() => {
  //     if (Object.keys(heights).length === blocks.length && blocks.length > 0) {
  //       console.log("Measured Heights:", heights);
  //       const calculatedPages = [];
  //       let currentPage: any[] = [];
  //       let currentPageHeight = 0;

  //       blocks.forEach((block) => {
  //         const blockHeight = heights[block.id] || 0;

  //         // If this block would overflow the current page
  //         if (
  //           currentPageHeight + blockHeight > CONTENT_HEIGHT &&
  //           currentPage.length > 0
  //         ) {
  //           calculatedPages.push([...currentPage]);
  //           currentPage = [block];
  //           currentPageHeight = blockHeight;
  //         } else {
  //           currentPage.push(block);
  //           currentPageHeight += blockHeight;
  //         }
  //       });

  //       // Add the last page if it has content
  //       if (currentPage.length > 0) {
  //         calculatedPages.push(currentPage);
  //       }

  //       setPages(calculatedPages);
  //       setMeasured(true);
  //     }
  //   }, [heights, blocks]);

  const renderBlock = (block: any, key: any, forMeasurement = false) => {
    const commonProps = {
      key,
      blockId: block.id,
      setRef: forMeasurement ? setRef : undefined,
    };

    switch (block.type) {
      case "actionPlanOverview":
        return <ActionPlanBlock {...commonProps} data={block.data} />;
      case "medication-header":
        return <MedicationTableHeader data={undefined} {...commonProps} />;
      case "medication-row":
        return <MedicationRow data={block.data} {...commonProps} />;
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
export default PaginatedActionPlan;
