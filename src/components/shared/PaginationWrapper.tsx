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

export interface BlockRenderer {
  (
    block: BlockConfig,
    key: string | number,
    forMeasurement?: boolean
  ): ReactNode;
}

export interface PaginationWrapperProps {
  data: any;
  createBlocks: (data: any) => BlockConfig[];
  renderBlock: BlockRenderer;
  contentHeight?: number;
  children?: ReactNode;
  onPagesCalculated?: (pages: BlockConfig[][], totalPages: number) => void;
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

// Mock A4Page component for demonstration
// const A4Page: React.FC<{ children: ReactNode }> = ({ children }) => (
//   <div
//     className="bg-white shadow-lg mx-auto relative mb-8"
//     style={{
//       width: "794px",
//       height: "1122.52px",
//       padding: "40px",
//       boxSizing: "border-box",
//       pageBreakAfter: "always",
//     }}
//   >
//     <div style={{ height: "100%", overflow: "hidden" }}>{children}</div>
//   </div>
// );

// Generic Pagination Wrapper Component
export const PaginationWrapper: React.FC<PaginationWrapperProps> = ({
  data,
  createBlocks,
  renderBlock,
  contentHeight = DEFAULT_CONTENT_HEIGHT,
  onPagesCalculated,
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

  // Calculate pages based on measured heights
  useEffect(() => {
    if (Object.keys(heights).length === blocks.length && blocks.length > 0) {
      console.log("Measured Heights:", heights);
      const calculatedPages: BlockConfig[][] = [];
      let currentPage: BlockConfig[] = [];
      let currentPageHeight = 0;

      blocks.forEach((block) => {
        const blockHeight = heights[block.id] || 0;

        // If this block would overflow the current page
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
      });

      // Add the last page if it has content
      if (currentPage.length > 0) {
        calculatedPages.push(currentPage);
      }

      setPages(calculatedPages);
      setMeasured(true);

      // Call the callback if provided
      onPagesCalculated?.(calculatedPages, calculatedPages.length);
    }
  }, [heights, blocks, contentHeight, onPagesCalculated]);

  const renderBlockWithProps = (
    block: BlockConfig,
    key: string | number,
    forMeasurement = false
  ) => {
    return renderBlock(block, key, forMeasurement);
  };

  return (
    <>
      {!measured ? (
        // Measurement phase - render all content to measure heights
        <A4Page>
          {blocks.map((block, index) => {
            const blockWithRef = renderBlock(
              block,
              index,
              true // forMeasurement = true
            );

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
                renderBlockWithProps(block, `${pageIndex}-${blockIndex}`, false)
              )}
            </A4Page>
          ))}
        </>
      )}
    </>
  );
};

// // Example usage with Health Report
// const HealthReportBlocks = {
//   TitleBlock: ({ data, ...props }: any) => (
//     <div {...props} className="title-block mb-8">
//       <h2 className="text-3xl font-bold text-gray-900">{data?.title}</h2>
//     </div>
//   ),

//   OverviewBlock: ({ data, ...props }: any) => (
//     <div {...props} className="overview-block mb-6">
//       <div className="p-4 bg-gray-50 rounded">
//         <h3 className="font-semibold mb-2">Overview</h3>
//         <p className="text-sm text-gray-600">
//           Patient overview information would go here...
//         </p>
//       </div>
//     </div>
//   ),

//   HealthStatusTitleBlock: ({ ...props }: any) => (
//     <div {...props} className="health-status-title-block mb-6">
//       <h3 className="text-xl font-bold text-gray-900">Health Status</h3>
//     </div>
//   ),

//   HealthStatusSectionBlock: ({ section, ...props }: any) => (
//     <div {...props} className="health-status-section-block mb-4">
//       <div className="p-4 border border-gray-200 rounded">
//         <h4 className="font-bold text-lg mb-2">
//           {section?.title || "Health Section"}
//         </h4>
//         <p className="text-sm text-gray-600 mb-2">{section?.description}</p>
//         <div className="text-sm">
//           Count: {section?.count || 0} | Factors:{" "}
//           {section?.factors?.length || 0} items
//         </div>
//       </div>
//     </div>
//   ),
// };

// // Example Health Report component using the wrapper
// const ExampleHealthReport = ({ data }: { data: any }) => {
//   const createHealthBlocks = (data: any): BlockConfig[] => [
//     { id: "title", type: "title", data: data },
//     { id: "overview", type: "overview", data: data },
//     { id: "health-status-title", type: "health-status-title" },
//     ...(data.healthStatusSections || []).map((section: any, index: number) => ({
//       id: `health-section-${index}`,
//       type: "health-section",
//       data: section,
//     })),
//   ];

//   const renderHealthBlock: BlockRenderer = (
//     block,
//     key,
//     forMeasurement = false
//   ) => {
//     const commonProps = {
//       key,
//       blockId: block.id,
//       // Don't pass setRef here - it's handled by the wrapper
//     };

//     switch (block.type) {
//       case "title":
//         return (
//           <HealthReportBlocks.TitleBlock {...commonProps} data={block.data} />
//         );
//       case "overview":
//         return (
//           <HealthReportBlocks.OverviewBlock
//             {...commonProps}
//             data={block.data}
//           />
//         );
//       case "health-status-title":
//         return <HealthReportBlocks.HealthStatusTitleBlock {...commonProps} />;
//       case "health-section":
//         return (
//           <HealthReportBlocks.HealthStatusSectionBlock
//             {...commonProps}
//             section={block.data}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   const handlePagesCalculated = (
//     pages: BlockConfig[][],
//     totalPages: number
//   ) => {
//     console.log(`Health Report paginated into ${totalPages} pages`);
//   };

//   return (
//     <PaginationWrapper
//       data={data}
//       createBlocks={createHealthBlocks}
//       renderBlock={renderHealthBlock}
//       onPagesCalculated={handlePagesCalculated}
//     />
//   );
// };

// // Mock data for demonstration
// const mockHealthData = {
//   title: "Health Status Report",
//   healthStatusSections: [
//     {
//       title: "At Risk",
//       description: "Factors that may increase health risks",
//       count: 3,
//       factors: ["High Cholesterol", "Family History", "Sedentary Lifestyle"],
//     },
//     {
//       title: "Optimal",
//       description: "Well-maintained health factors",
//       count: 8,
//       factors: ["Blood Pressure", "Weight", "Heart Rate", "Exercise"],
//     },
//   ],
// };

// // Demo component
// const PaginationDemo = () => {
//   const [showDemo, setShowDemo] = useState(false);

//   return (
//     <div className="max-w-4xl mx-auto p-4 bg-gray-50 min-h-screen">
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold mb-4">Generic Pagination Wrapper</h1>
//         <p className="text-gray-600 mb-4">
//           This wrapper handles all pagination logic and can be reused across
//           different components.
//         </p>
//         <button
//           onClick={() => setShowDemo(!showDemo)}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
//         >
//           {showDemo ? "Hide Demo" : "Show Demo"}
//         </button>
//       </div>

//       {showDemo && <ExampleHealthReport data={mockHealthData} />}

//       <div className="mt-8 p-6 bg-white rounded-lg shadow">
//         <h2 className="text-lg font-semibold mb-4">Usage Instructions:</h2>
//         <div className="space-y-4 text-sm">
//           <div>
//             <h3 className="font-semibold">
//               1. Create your block configuration function:
//             </h3>
//             <pre className="bg-gray-100 p-2 rounded mt-2 text-xs overflow-x-auto">
//               {`const createBlocks = (data) => [
//   { id: "title", type: "title", data: data },
//   { id: "overview", type: "overview", data: data },
//   // ... more blocks
// ];`}
//             </pre>
//           </div>

//           <div>
//             <h3 className="font-semibold">
//               2. Create your block renderer function:
//             </h3>
//             <pre className="bg-gray-100 p-2 rounded mt-2 text-xs overflow-x-auto">
//               {`const renderBlock = (block, key, forMeasurement) => {
//   switch (block.type) {
//     case "title":
//       return <TitleBlock data={block.data} />;
//     // ... more cases
//   }
// };`}
//             </pre>
//           </div>

//           <div>
//             <h3 className="font-semibold">3. Use the PaginationWrapper:</h3>
//             <pre className="bg-gray-100 p-2 rounded mt-2 text-xs overflow-x-auto">
//               {`<PaginationWrapper
//   data={yourData}
//   createBlocks={createBlocks}
//   renderBlock={renderBlock}
//   contentHeight={customHeight} // optional
//   onPagesCalculated={handlePages} // optional
// />`}
//             </pre>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaginationDemo;
