/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMeasuredHeight } from "@/utils/hooks";
import React, { useState, useEffect, type ReactNode } from "react";
import A4Page from "./A4Page";

// Types
export interface BlockConfig {
  id: string;
  type: string;
  data?: any;
}

export type BlockProps = {
  data: any;
  section?: any;
  blockId: string;
  setRef?: (id: string) => (element: HTMLElement | null) => void;
};

export interface BlockRenderer {
  (block: BlockConfig, key: string | number): ReactNode;
}

// Types for table configuration
export interface TableConfig {
  headerType: string; // The block type for the header (e.g., 'medication-header')
  rowTypes: string[]; // Array of block types that belong to this table (e.g., ['medication-row'])
  headerId: string; // Base ID for the header block
}

interface PaginationWrapperProps {
  data: any;
  createBlocks: (data: any) => BlockConfig[];
  renderBlock: BlockRenderer;
  contentHeight?: number;
  tables?: TableConfig[]; // New prop for table configurations
}

// Default page dimensions and measurements
const DEFAULT_PAGE_HEIGHT = 1122.52;
const DEFAULT_MARGIN = 40;
const DEFAULT_HEADER_HEIGHT = 36;
const DEFAULT_SAFETY_MARGIN = 160;

const DEFAULT_CONTENT_HEIGHT =
  DEFAULT_PAGE_HEIGHT -
  DEFAULT_HEADER_HEIGHT -
  DEFAULT_SAFETY_MARGIN -
  DEFAULT_MARGIN * 2;

// Generic Pagination Wrapper Component
export const PaginationWrapper: React.FC<PaginationWrapperProps> = ({
  data,
  createBlocks,
  renderBlock,
  contentHeight = DEFAULT_CONTENT_HEIGHT,
  tables = [], // Default to empty array if no tables
}) => {
  const { heights, setRef } = useMeasuredHeight();
  const [pages, setPages] = useState<BlockConfig[][]>([]);
  const [measured, setMeasured] = useState(false);
  const [blocks, setBlocks] = useState<BlockConfig[]>([]);

  // Create atomic blocks using the provided function
  useEffect(() => {
    const atomicBlocks = createBlocks(data);
    setBlocks(atomicBlocks);
  }, [data, createBlocks]);

  // Helper function to find which table a block belongs to
  const findTableForBlock = (blockType: string): TableConfig | undefined => {
    return tables.find(
      (table) =>
        table.rowTypes.includes(blockType) || table.headerType === blockType
    );
  };

  // Helper function to check if current page needs a header for a specific table
  const pageNeedsTableHeader = (
    currentPage: BlockConfig[],
    tableConfig: TableConfig
  ): boolean => {
    // Check if page already has this table's header
    const hasHeader = currentPage.some(
      (block) => block.type === tableConfig.headerType
    );

    // Check if page has or will have rows from this table
    const hasRows = currentPage.some((block) =>
      tableConfig.rowTypes.includes(block.type)
    );

    return hasRows && !hasHeader;
  };

  // Helper function to create a header block for a table
  const createHeaderBlock = (
    tableConfig: TableConfig,
    pageIndex: number
  ): BlockConfig => {
    return {
      id: `${tableConfig.headerId}-page-${pageIndex}`,
      type: tableConfig.headerType,
      data: undefined,
    };
  };

  // Calculate pages based on measured heights
  useEffect(() => {
    if (Object.keys(heights).length === blocks.length && blocks.length > 0) {
      console.log("Measured Heights:", heights);
      const calculatedPages: BlockConfig[][] = [];
      let currentPage: BlockConfig[] = [];
      let currentPageHeight = 0;

      blocks.forEach((block) => {
        const blockHeight = heights[block.id] || 0;
        const tableConfig = findTableForBlock(block.type);

        // Special handling for table rows
        if (tableConfig && tableConfig.rowTypes.includes(block.type)) {
          const headerHeight = heights[tableConfig.headerId] || 0;

          // Check if we need to add header
          const needsHeader = !currentPage.some(
            (b) => b.type === tableConfig.headerType
          );

          let totalHeightNeeded = blockHeight;
          if (needsHeader) {
            totalHeightNeeded += headerHeight;
          }

          // If this would overflow and we have content, start new page
          if (
            currentPageHeight + totalHeightNeeded > contentHeight &&
            currentPage.length > 0
          ) {
            calculatedPages.push([...currentPage]);
            currentPage = [];
            currentPageHeight = 0;

            // Add header to new page since we're starting with a table row
            const headerBlock = createHeaderBlock(
              tableConfig,
              calculatedPages.length
            );
            currentPage.push(headerBlock);
            currentPageHeight += headerHeight;
          } else if (needsHeader) {
            // Add header to current page if needed
            const headerBlock = createHeaderBlock(
              tableConfig,
              calculatedPages.length
            );
            currentPage.push(headerBlock);
            currentPageHeight += headerHeight;
          }

          currentPage.push(block);
          currentPageHeight += blockHeight;
        } else {
          // Handle non-table blocks (including standalone headers) normally
          if (
            currentPageHeight + blockHeight > contentHeight &&
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

      // Post-process pages to ensure all table sections have proper headers
      const finalPages = calculatedPages.map((page, pageIndex) => {
        const processedPage = [...page];

        // For each table configuration, check if this page needs a header
        tables.forEach((tableConfig) => {
          if (pageNeedsTableHeader(processedPage, tableConfig)) {
            // const headerHeight = heights[tableConfig.headerId] || 0;

            // Find the first row of this table type
            const firstRowIndex = processedPage.findIndex((block) =>
              tableConfig.rowTypes.includes(block.type)
            );

            if (firstRowIndex !== -1) {
              // Insert header before the first row
              const headerBlock = createHeaderBlock(tableConfig, pageIndex);
              processedPage.splice(firstRowIndex, 0, headerBlock);
            }
          }
        });

        return processedPage;
      });

      setPages(finalPages);
      setMeasured(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heights, blocks, contentHeight]);

  const renderBlockWithProps = (block: BlockConfig, key: string | number) => {
    return renderBlock(block, key);
  };

  return (
    <>
      {!measured ? (
        // Measurement phase - render all content to measure heights
        <A4Page>
          {blocks.map((block, index) => {
            const blockWithRef = renderBlock(block, index);

            // Clone the element and add the ref for measurement
            return React.cloneElement(blockWithRef as React.ReactElement<any>, {
              ref: setRef(block.id),
              key: index,
            });
          })}
        </A4Page>
      ) : (
        // Paginated view - render pages based on calculations
        <>
          {pages.map((pageContent, pageIndex) => (
            <A4Page key={pageIndex}>
              {pageContent.map((block, blockIndex) =>
                renderBlockWithProps(block, `${pageIndex}-${blockIndex}`)
              )}
            </A4Page>
          ))}
        </>
      )}
    </>
  );
};
