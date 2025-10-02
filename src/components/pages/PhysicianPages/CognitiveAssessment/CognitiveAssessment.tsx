import React from "react";
import type { CognitiveAssessmentData } from "./types";
import {
  DescriptionBlock,
  TableSection,
  TableSectionRow,
  TitleBlock,
} from "./CognitiveAssessment.blocks";

type Props = {
  data: CognitiveAssessmentData;
};

const CognitiveAssessment = ({ data }: Props) => {
  const dataEntries = Object.entries(data || {});

  return (
    <div>
      <TitleBlock data={data} blockId="title" />
      <DescriptionBlock data={data} blockId="description" />
      {new Array(Object.entries(data).length).fill(null).map((_, idx) => {
        const leftBox = dataEntries[idx * 2];
        const rightBox = dataEntries[idx * 2 + 1];
        const slots: { left: React.ReactNode; right: React.ReactNode } = {
          left: null,
          right: null,
        };
        if (!leftBox && !rightBox) return null;
        if (leftBox) {
          slots.left = (
            <TableSection
              section={leftBox[0]}
              data={data[leftBox[0] as keyof CognitiveAssessmentData]}
            />
          );
        }
        if (rightBox) {
          slots.right = (
            <TableSection
              section={rightBox[0]}
              data={data[rightBox[0] as keyof CognitiveAssessmentData]}
            />
          );
        }
        return (
          <TableSectionRow data={data} blockId="table-section" slots={slots} />
        );
      })}
    </div>
  );
};

export default CognitiveAssessment;
