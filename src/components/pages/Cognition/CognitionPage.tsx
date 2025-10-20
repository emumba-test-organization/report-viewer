/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PaginationWrapper,
  type BlockConfig,
  type BlockRenderer,
  type TableConfig,
} from "@/components/shared/PaginationWrapper";
import type { CognitionData } from "./types";
import {
  CognitionFactorHeaderBlock,
  CognitionFactorRow,
  CognitionTitleBlock,
} from "./CognitionBlocks";
import { useMemo, useCallback } from "react";

const CognitionPage = ({ data }: { data: CognitionData }) => {
  interface FactorEntry {
    description: string;
    severity: string;
    measurement: string;
    currentLevel: string;
    targetLevel: string;
    image: null | string;
  }

  interface FactorSection {
    section: string;
    entries: FactorEntry[];
  }

  interface CognitionData {
    factors: FactorSection[];
  }

  const severityColor = useCallback(
    (factor: CognitionData["factors"][number]) => {
      const variant =
        factor.entries.some((entry) => {
          const severityLevel = entry.severity.toLowerCase();

          return (
            severityLevel === "high" ||
            severityLevel === "very high" ||
            severityLevel === "low" ||
            severityLevel === "very low"
          );
        }) ||
        (factor.entries.length === 1 && factor.entries[0].severity === "")
          ? "Very High"
          : "Moderately Low";

      switch (variant.toLowerCase()) {
        case "high":
        case "low":
        case "very low":
        case "very high":
          // return "border-2 border-red-800 bg-red-800";
          return "danger";
        case "moderately high":
        case "moderately low":
          return "warning";
        // return "border-2 border-yellow-700 bg-yellow-700";
        default:
          return "warning";
        // return "border-2 border-red-800 bg-red-800";
      }
    },
    []
  );

  const createFactorBlocks = (factors: FactorSection[]): BlockConfig[] => {
    const blocks: BlockConfig[] = [];

    factors.forEach((factor, sectionIndex) => {
      // Add header block for each section
      const classColor = severityColor(factor);
      blocks.push({
        id: `factor-header-${sectionIndex}`,
        type: `factor-header-${sectionIndex}`,
        data: {
          section: factor.section,
          className: `bg-${classColor}`,
        },
      });

      // Add row blocks for each entry in the section
      factor.entries.forEach((entry, entryIndex) => {
        const className =
          entryIndex === factor.entries.length - 1 ? " mb-8" : "";
        blocks.push({
          id: `factor-row-${sectionIndex}-${entryIndex}`,
          type: `factor-row-${sectionIndex}`,
          index: entryIndex,
          data: {
            ...entry,
            sectionName: factor.section,
            entryIndex: entryIndex,
            className: `${className} border-${classColor}`,
            isLastSection: entryIndex === factor.entries.length - 1,
          },
        });
      });
    });

    return blocks;
  };

  // Updated component showing integration
  const createHealthBlocks = (data: CognitionData, ): BlockConfig[] => [
    { id: "cognitionOverview", type: "cognitionOverview", data: data },
    // Add the factor blocks
    ...createFactorBlocks(data.factors),
  ];

  const renderHealthBlock: BlockRenderer = (block, key, _, positionInPage) => {
    const commonProps = {
      key,
      blockId: block.id,
    };

    // Handle cognition overview
    if (block.type === "cognitionOverview") {
      return <CognitionTitleBlock {...commonProps} data={block.data} />;
    }

    // Handle factor headers (any section)
    if (block.type.startsWith("factor-header")) {
      return <CognitionFactorHeaderBlock {...commonProps} data={block.data} />;
    }

    // Handle factor rows (any section)
    if (block.type.startsWith("factor-row")) {
      return (
        <CognitionFactorRow
          {...commonProps}
          data={block.data}
          isLastSection={block.data.isLastSection || positionInPage === "last"}
        />
      );
    }

    return null;
  };

  // Table configuration with unique types per section
  const tableConfigs: TableConfig[] = useMemo(
    () =>
      data.factors.map((factor, index) => ({
        headerType: `factor-header-${index}`, // Unique header type per section
        rowTypes: [`factor-row-${index}`], // Unique row type per section
        headerId: `factor-header-${index}`,
        headerData: {
          section: factor.section,
          entryCount: factor.entries.length,
          sectionIndex: index,
          className: `bg-${severityColor(factor)}`,
        },
      })),
    [data.factors, severityColor]
  );

  return (
    <PaginationWrapper
      data={data}
      createBlocks={createHealthBlocks}
      renderBlock={renderHealthBlock}
      tables={tableConfigs}
    />
  );
};

export default CognitionPage;
