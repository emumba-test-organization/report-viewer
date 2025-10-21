import type { BlockProps } from "@/components/shared/PaginationWrapper";
import Spectrum from "@/components/shared/Spectrum";
import { Badge } from "@/components/ui/badge";
import { forwardRef, useRef } from "react";
import { functionLimits } from "./utils";

export const CognitionTitleBlock = forwardRef<HTMLDivElement, BlockProps>(
  ({ data, blockId, setRef }, ref) => (
    <div ref={setRef ? setRef(blockId) : ref}>
      <h1 className="mb-6">{data.title || "Cognition"}</h1>
      <p className="text-sm mb-6">{data.intro || ""}</p>
    </div>
  )
);

export const CognitionFactorHeaderBlock = forwardRef<
  HTMLDivElement,
  BlockProps
>(({ data, blockId, setRef }, ref) => {
  return (
    <div ref={setRef ? setRef(blockId) : ref} className={`${data.className}`}>
      <h3 className="text-md text-white font-semibold p-3">{data.section}</h3>
    </div>
  );
});

export const CognitionFactorRow = forwardRef<
  HTMLDivElement,
  BlockProps & { isLastSection?: boolean }
>(({ data: entry, isLastSection, blockId, setRef }, ref) => {
  // Split targetLevel into value and units
  const targetMatch = entry.targetLevel.match(
    /^([<>]=?|=|≥|≤)?\s*([\d.]+)\s*(.*)$/
  );
  const sign = targetMatch ? targetMatch[1] || "" : "";
  const target = targetMatch ? targetMatch[2] : entry.targetLevel;
  const unit = targetMatch ? targetMatch[3] : "";
  const spectrumRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={setRef ? setRef(blockId) : ref}
      className={`${entry.className} bg-white p-4 border-2 ${
        isLastSection ? "rounded-b-2" : "border-b-0"
      }`}
    >
      <div
        className="relative grid grid-cols-[1fr_1fr] items-start gap-1 mb-1"
        ref={spectrumRef}
      >
        {entry.currentLevel ||
        entry.severity ||
        entry.measurement ||
        entry.targetLevel ? (
          <div className="w-full flex flex-col items-start justify-between gap-1.5 mb-1">
            <p
              className="text-2xl font-bold"
              dangerouslySetInnerHTML={{ __html: entry.currentLevel }}
            />
            <div className="flex items-center gap-1">
              <p className="text-sm font-bold">{entry.severity}</p>
              <p className="text-sm font-bold">{entry.measurement}</p>
              <div className="flex items-center">
                <Badge
                  variant="outline"
                  className="text-medium font-semibold p-1 border-r-0 rounded-tr-none rounded-br-none"
                >
                  Target
                </Badge>
                <Badge
                  variant="outline"
                  className="text-medium font-bold p-1 rounded-tl-none rounded-bl-none"
                >
                  {entry.targetLevel}
                </Badge>
              </div>
            </div>
          </div>
        ) : null}
        {entry.currentLevel && entry.targetLevel ? (
          <div className="absolute top-[-25px] right-[-22px]">
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
              current={parseFloat(entry.currentLevel.replace(/[^0-9.]+/g, ""))}
              veryHigh={15}
              targetLabel={`Target ${sign || ""} ${target} ${unit}`}
              veryHighLabel="Very High"
              // width={400}
              width={
                spectrumRef.current ? spectrumRef.current.offsetWidth / 2 : 300
              }
              height={70}
            />
          </div>
        ) : null}
      </div>
      {Array.isArray(entry.description) &&
      entry.description.length > 0 ? (
        <ul className="list-disc pl-5 space-y-1">
          {entry.description.map((desc: string, index: number) => (
            <li key={index} className="text-sm">
              {desc}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm">{entry.description}</p>
      )}
    </div>
  );
});
