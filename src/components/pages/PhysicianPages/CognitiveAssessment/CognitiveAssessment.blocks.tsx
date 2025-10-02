import type { BlockProps } from "@/components/shared/PaginationWrapper";
import React from "react";
import type { CognitiveAssessmentData, CognitiveAssessmentItem } from "./types";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, OctagonAlert } from "lucide-react";

export const TitleBlock = React.forwardRef<
  HTMLDivElement,
  BlockProps<CognitiveAssessmentData>
>(({ blockId, setRef }, ref) => (
  <div ref={setRef ? setRef(blockId) : ref} className="title-block mb-4">
    <h1 className="text-xl font-semibold text-gray-900 border-b-2 border-gray-500 pb-2 w-full">
      Cognitive Assessment and Care Plan Services
    </h1>
  </div>
));

export const DescriptionBlock = React.forwardRef<
  HTMLDivElement,
  BlockProps<CognitiveAssessmentData>
>(({ blockId, setRef }, ref) => (
  <div ref={setRef ? setRef(blockId) : ref} className="description-block mb-6">
    <p className="text-sm text-gray-700">
      Complete the following elements of Cognitive Assessment and Care Plan
      Services (for those 65 and older):
    </p>
  </div>
));

export const TableSection = ({
  section,
  data,
}: {
  section: string;
  data: CognitiveAssessmentItem[];
}) => {
  const status = data.every((item) => item.checkbox === false)
    ? "done"
    : "todo";

  return (
    <div className="table-section border border-gray-300 p-3 h-full">
      <div className="flex justify-between mb-3">
        <p className="text-sm font-semibold">{section}</p>
        {status === "done" ? (
          <Badge variant="secondary" className="rounded">
            <Check className="text-green-700" /> Done
          </Badge>
        ) : (
          <Badge variant={"warning"} className="rounded">
            <OctagonAlert className="text-white" /> To do
          </Badge>
        )}
      </div>
      {data.map((item, index) => (
        <div key={index} className="flex items-center gap-2 my-0.5">
          {item.value !== undefined ? (
            <Badge variant={"secondary"} className="rounded">
              {item.value}
            </Badge>
          ) : null}
          {item.checkbox ? <Checkbox /> : null}
          <p className="text-sm text-gray-700">{item.text}</p>
        </div>
      ))}
    </div>
  );
};

export const TableSectionRow = React.forwardRef<
  HTMLDivElement,
  BlockProps<CognitiveAssessmentData>
>(({ blockId, setRef, slots }, ref) => (
  <div
    ref={setRef ? setRef(blockId) : ref}
    className="table-section grid grid-cols-2 grid-rows-1"
  >
    {slots?.left ? <div className="h-full">{slots?.left}</div> : null}
    {slots?.right ? <div className="h-full">{slots?.right}</div> : null}
  </div>
));
