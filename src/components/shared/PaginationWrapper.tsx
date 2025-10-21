/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMeasuredHeight } from "@/utils/hooks";
import React, { useState, useEffect, type ReactNode } from "react";
import A4Page from "./A4Page";

// Types
export interface BlockConfig {
  id: string;
  type: string;
  data?: any;
  index?: number;
}

export type PositionInPage = number | "first" | "last";
export type BlockProps<T = any> = {
  index?: number;
  data: T;
  section?: T;
  blockId: string;
  positionInPage?: PositionInPage;
  setRef?: (id: string) => (element: HTMLElement | null) => void;
  className?: string;
  slots?: { [key: string]: ReactNode };
};

export interface BlockRenderer {
  (block: BlockConfig, key: string | number, index?: number, positionInPage?: number | "first" | "last"): ReactNode;
}

// Enhanced types for nested table configuration
export interface TableConfig {
  headerType: string; // The block type for the header (e.g., 'medication-header')
  rowTypes: string[]; // Array of block types that belong to this table (e.g., ['medication-row'])
  headerId: string; // Base ID for the header block
  headerData?: any; // Optional data for the header block
  parentHeaders?: string[]; // Array of parent header types that should be included when this table continues on a new page
  priority?: number; // Priority for header placement (higher number = placed first)
}

interface PaginationWrapperProps {
  data: any;
  createBlocks: (data: any) => BlockConfig[];
  renderBlock: BlockRenderer;
  contentHeight?: number;
  tables?: TableConfig[]; // New prop for table configurations
}

// Default page dimensions and measurements
// const DEFAULT_PAGE_HEIGHT = 1122.52;
const DEFAULT_PAGE_HEIGHT = 1587.39;
const DEFAULT_HEADER_HEIGHT = 40;
const DEFAULT_FOOTER_HEIGHT = 72;
const DEFAULT_SAFETY_MARGIN = 180;

const DEFAULT_CONTENT_HEIGHT =
  DEFAULT_PAGE_HEIGHT - DEFAULT_HEADER_HEIGHT - DEFAULT_SAFETY_MARGIN - DEFAULT_FOOTER_HEIGHT;

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

  // Helper function to find all parent tables for a given table
  const findParentTables = (tableConfig: TableConfig): TableConfig[] => {
    if (!tableConfig.parentHeaders) return [];

    return tables
      .filter((table) => tableConfig.parentHeaders!.includes(table.headerType))
      .sort((a, b) => (b.priority || 0) - (a.priority || 0)); // Sort by priority (highest first)
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
      data: tableConfig?.headerData || undefined,
    };
  };

  // Helper function to get all required headers for a table (including parents)
  const getRequiredHeaders = (
    tableConfig: TableConfig,
    pageIndex: number,
    currentPage: BlockConfig[]
  ): BlockConfig[] => {
    const requiredHeaders: BlockConfig[] = [];

    // Get parent headers first
    const parentTables = findParentTables(tableConfig);
    for (const parentTable of parentTables) {
      const hasParentHeader = currentPage.some(
        (block) => block.type === parentTable.headerType
      );

      if (!hasParentHeader) {
        requiredHeaders.push(createHeaderBlock(parentTable, pageIndex));
      }
    }

    // Add the table's own header
    const hasOwnHeader = currentPage.some(
      (block) => block.type === tableConfig.headerType
    );

    if (!hasOwnHeader) {
      requiredHeaders.push(createHeaderBlock(tableConfig, pageIndex));
    }

    return requiredHeaders;
  };

  // Calculate total height of required headers
  const calculateHeadersHeight = (requiredHeaders: BlockConfig[]): number => {
    return requiredHeaders.reduce((total, header) => {
      const headerConfig = findTableForBlock(header.type);
      return total + (heights[headerConfig?.headerId || ""] || 0);
    }, 0);
  };

  // Calculate pages based on measured heights
  useEffect(() => {
    if (Object.keys(heights).length === blocks.length && blocks.length > 0) {
      const calculatedPages: BlockConfig[][] = [];
      let currentPage: BlockConfig[] = [];
      let currentPageHeight = 0;

      for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        const blockHeight = heights[block.id] || 0;
        const tableConfig = findTableForBlock(block.type);

        // Special handling for table rows
        if (tableConfig && tableConfig.rowTypes.includes(block.type)) {
          // Get all required headers (including parent headers)
          const requiredHeaders = getRequiredHeaders(
            tableConfig,
            calculatedPages.length,
            currentPage
          );
          const headersHeight = calculateHeadersHeight(requiredHeaders);
          const totalHeightNeeded = blockHeight + headersHeight;

          // If this would overflow and we have content, start new page
          if (
            currentPageHeight + totalHeightNeeded > contentHeight &&
            currentPage.length > 0
          ) {
            calculatedPages.push([...currentPage]);
            currentPage = [];
            currentPageHeight = 0;

            // Add all required headers to new page
            const newPageHeaders = getRequiredHeaders(
              tableConfig,
              calculatedPages.length,
              currentPage
            );
            for (const header of newPageHeaders) {
              currentPage.push(header);
              const headerConfig = findTableForBlock(header.type);
              currentPageHeight += heights[headerConfig?.headerId || ""] || 0;
            }
          } else if (requiredHeaders.length > 0) {
            // Check if headers + first row can fit on current page
            if (currentPageHeight + totalHeightNeeded > contentHeight) {
              // Start new page with all headers + row
              calculatedPages.push([...currentPage]);
              currentPage = [];
              currentPageHeight = 0;

              const newPageHeaders = getRequiredHeaders(
                tableConfig,
                calculatedPages.length,
                currentPage
              );
              for (const header of newPageHeaders) {
                currentPage.push(header);
                const headerConfig = findTableForBlock(header.type);
                currentPageHeight += heights[headerConfig?.headerId || ""] || 0;
              }
            } else {
              // Add headers to current page
              for (const header of requiredHeaders) {
                currentPage.push(header);
                const headerConfig = findTableForBlock(header.type);
                currentPageHeight += heights[headerConfig?.headerId || ""] || 0;
              }
            }
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
      }

      // Add the last page if it has content
      if (currentPage.length > 0) {
        calculatedPages.push(currentPage);
      }

      // Post-process pages to ensure all table sections have proper headers
      // and remove any orphaned headers
      const finalPages = calculatedPages.map((page, pageIndex) => {
        let processedPage = [...page];

        // For each table configuration, check if this page needs headers
        tables.forEach((tableConfig) => {
          if (pageNeedsTableHeader(processedPage, tableConfig)) {
            // Find the first row of this table type
            const firstRowIndex = processedPage.findIndex((block) =>
              tableConfig.rowTypes.includes(block.type)
            );

            if (firstRowIndex !== -1) {
              // Get all required headers for this table
              const requiredHeaders = getRequiredHeaders(
                tableConfig,
                pageIndex,
                processedPage
              );

              // Insert headers before the first row (in reverse order to maintain hierarchy)
              for (let j = requiredHeaders.length - 1; j >= 0; j--) {
                processedPage.splice(firstRowIndex, 0, requiredHeaders[j]);
              }
            }
          }
        });

        // Remove orphaned headers (headers without any following rows)
        processedPage = processedPage.filter((block, index) => {
          const tableConfig = findTableForBlock(block.type);

          // If this is a header block
          if (tableConfig && block.type === tableConfig.headerType) {
            // For parent headers, check if any child table has rows
            const isParentHeader = tables.some((table) =>
              table.parentHeaders?.includes(tableConfig.headerType)
            );

            if (isParentHeader) {
              // Check if any child table has rows after this header
              const hasChildRows = processedPage
                .slice(index + 1)
                .some((laterBlock) => {
                  const laterTableConfig = findTableForBlock(laterBlock.type);
                  return (
                    laterTableConfig &&
                    laterTableConfig.parentHeaders?.includes(
                      tableConfig.headerType
                    ) &&
                    laterTableConfig.rowTypes.includes(laterBlock.type)
                  );
                });
              return hasChildRows;
            } else {
              // For regular headers, check if there are rows of this table type after
              const hasRowsAfter = processedPage
                .slice(index + 1)
                .some((laterBlock) =>
                  tableConfig.rowTypes.includes(laterBlock.type)
                );
              return hasRowsAfter;
            }
          }

          // Keep all non-header blocks
          return true;
        });

        return processedPage;
      });

      setPages(finalPages);
      setMeasured(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heights, blocks, contentHeight]);

  const renderBlockWithProps = (
    block: BlockConfig,
    key: string | number,
    index?: number,
    positionInPage?: number | "first" | "last"
  ) => {
    return renderBlock(block, key, index, positionInPage);
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
              {pageContent.map((block, blockIndex) => {
                return renderBlockWithProps(
                  block,
                  `${pageIndex}-${blockIndex}`,
                  block.index,
                  blockIndex === 0 ? "first" : blockIndex === pageContent.length - 1 ? "last" : blockIndex
                );
              })}
            </A4Page>
          ))}
        </>
      )}
    </>
  );
};
