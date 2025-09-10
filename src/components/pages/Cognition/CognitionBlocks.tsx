import type { BlockProps } from "@/components/shared/PaginationWrapper";
import Spectrum from "@/components/shared/Spectrum";
import { Badge } from "@/components/ui/badge";
import { forwardRef } from "react";
import { functionLimits } from "./utils";

export const CognitionTitleBlock = forwardRef<HTMLDivElement, BlockProps>(
  ({ data, blockId, setRef }, ref) => (
    <div ref={setRef ? setRef(blockId) : ref} className="mb-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 pb-2">
        {data.title || "Cognition"}
      </h1>
      <p className="text-sm text-gray-800 mb-4">{data.intro || ""}</p>
    </div>
  )
);

export const CognitionFactorHeaderBlock = forwardRef<
  HTMLDivElement,
  BlockProps
>(({ data, blockId, setRef }, ref) => {
  return (
    <div
      ref={setRef ? setRef(blockId) : ref}
      className={`${data.className} mt-4 text-white p-2`}
    >
      <h3 className="text-md font-semibold p-2">{data.section}</h3>
    </div>
  );
});

export const CognitionFactorRow = forwardRef<HTMLDivElement, BlockProps>(
  ({ data: entry, blockId, setRef }, ref) => {
    // Split targetLevel into value and units
    const targetMatch = entry.targetLevel.match(
      /^([<>]=?|=|≥|≤)?\s*([\d.]+)\s*(.*)$/
    );
    const sign = targetMatch ? targetMatch[1] || "" : "";
    const target = targetMatch ? targetMatch[2] : entry.targetLevel;
    const unit = targetMatch ? targetMatch[3] : "";

    return (
      <div
        ref={setRef ? setRef(blockId) : ref}
        className={`${entry.className} bg-white p-2 border-red-800 border-2`}
      >
        <div className="flex items-start gap-1 mb-1">
          {entry.currentLevel ||
          entry.severity ||
          entry.measurement ||
          entry.targetLevel ? (
            <div className="w-full flex flex-col items-start justify-between gap-1.5 mb-1">
              <p className="text-2xl font-bold text-gray-800">
                {entry.currentLevel}
              </p>
              <div className="flex items-center gap-1">
                <p className="text-sm font-bold text-gray-800">
                  {entry.severity}
                </p>
                <p className="text-sm font-bold text-gray-800">
                  {entry.measurement}
                </p>
                <div className="flex items-center">
                  <Badge
                    variant="outline"
                    className={`flex items-center text-medium font-semibold p-1 rounded justify-center bg-accent border-r-0 rounded-tr-none rounded-br-none`}
                  >
                    Target
                  </Badge>
                  <Badge
                    variant="outline"
                    className="flex items-center text-medium font-bold p-1 rounded justify-center bg-accent rounded-tl-none rounded-bl-none"
                  >
                    {entry.targetLevel}
                  </Badge>
                </div>
              </div>
            </div>
          ) : null}
          {entry.currentLevel && entry.targetLevel ? (
            <div>
              <Spectrum
                inverse={
                  entry.severity.toLowerCase() === "low" ||
                  entry.severity.toLowerCase() === "very low" ||
                  entry.severity.toLowerCase() === "moderately low"
                }
                min={
                  functionLimits[
                    entry.measurement.toLowerCase() as keyof typeof functionLimits
                  ]?.min || 0
                }
                max={
                  functionLimits[
                    entry.measurement.toLowerCase() as keyof typeof functionLimits
                  ]?.max || 20
                }
                // min={0}
                // max={20}
                target={parseFloat(target)}
                current={parseFloat(
                  entry.currentLevel.replace(/[^0-9.]+/g, "")
                )}
                veryHigh={15}
                targetLabel={`Target ${sign || ""} ${target} ${unit}`}
                veryHighLabel="Very High"
                width={400}
                height={70}
              />
            </div>
          ) : null}
        </div>
        <p className="text-sm text-gray-800">{entry.description}</p>
      </div>
    );
  }
);
