import type { TableComponentProps } from "@/components/shared/PaginatedTable";
import Spectrum from "@/components/shared/Spectrum";
import { Badge } from "@/components/ui/badge";
import { usePdfLayout } from "@/utils/PdfLayoutHelper/PdfLayoutHook";

export type CognitionData = {
  title: string;
  intro: string;
  factors: {
    section: string;
    entries: Factor[];
  }[];
};

type Factor = {
  description: string;
  severity: string;
  measurement: string;
  currentLevel: string;
  targetLevel: string;
  image: string | null;
};

type Props = {
  data: CognitionData;
};

const functionLimits = {
  homocysteine: {
    min: 0,
    max: 20,
  },
  "vitamin b12": {
    min: 100,
    max: 600,
  },
  insulin: {
    min: 0,
    max: 20,
  },
  "HOMA-IR": {
    min: 130,
    max: 600,
  },
  glucose: {
    min: 70,
    max: 100,
  },
  zinc: {
    min: 50,
    max: 100,
  },
  "copper/zinc ratio": {
    min: 1,
    max: 2,
  },
  "free T3": {
    min: 2.5,
    max: 4.0,
  },
  "thyroid stimulating hormone": {
    min: 2.0,
    max: 4.0,
  },
};

const CognitionPaginated = ({ index,headers, pageRows, containerRef, headerRef, rowRefs }: TableComponentProps<Factor>) => {
  const { title, intro, factors } = data;
  const { currentPageOccupied } = usePdfLayout();

  console.log("currentPageOccupied: cognition", currentPageOccupied);
  return (
    <div className="break-inside-auto">
      <div className="mb-8 break-inside-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 pb-2 break-inside-avoid">
          {title || "Cognition"}
        </h1>
        <p className="text-sm text-gray-800 mb-4 break-inside-avoid">
          {intro || ""}
        </p>
        <div className="grid grid-cols-1 [&>*]:m-2 break-inside-auto">
          {factors.map((factor, index) => {
            const { section, entries } = factor;
            const severityBorderClass = (
              factor: CognitionData["factors"][number],
              type: "border" | "bg" = "bg"
            ) => {
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
                (factor.entries.length === 1 &&
                  factor.entries[0].severity === "")
                  ? "Very High"
                  : "Moderately Low";

              switch (variant.toLowerCase()) {
                case "high":
                case "low":
                case "very low":
                case "very high":
                  return `${
                    type === "border" ? "border-2" : ""
                  } ${type}-red-800`;
                case "moderately high":
                case "moderately low":
                  return `${
                    type === "border" ? "border-2" : ""
                  } ${type}-yellow-700`;
                default:
                  return `${
                    type === "border" ? "border-2" : ""
                  } ${type}-red-800`;
              }
            };
            return (
              <div key={index} className={`break-inside-auto`}>
                <h3
                  className={`text-md font-semibold ${severityBorderClass(
                    factor,
                    "bg"
                  )} text-white p-2 pb-4 break-inside-avoid break-after-avoid`}
                >
                  {section}
                </h3>
                <div className="grid grid-cols-1 break-inside-auto">
                  {entries.map((entry, entryIndex) => {
                    // Split targetLevel into value and units
                    const targetMatch = entry.targetLevel.match(
                      /^([<>]=?|=|≥|≤)?\s*([\d.]+)\s*(.*)$/
                    );
                    const sign = targetMatch ? targetMatch[1] || "" : "";
                    const target = targetMatch
                      ? targetMatch[2]
                      : entry.targetLevel;
                    const unit = targetMatch ? targetMatch[3] : "";

                    return (
                      <div
                        key={entryIndex}
                        className={`bg-white border-2 ${severityBorderClass(
                          factor,
                          "border"
                        )} p-2 break-inside-avoid`}
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
                                  entry.severity.toLowerCase() ===
                                    "moderately low"
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
                                targetLabel={`Target ${
                                  sign || ""
                                } ${target} ${unit}`}
                                veryHighLabel="Very High"
                                width={400}
                                height={70}
                              />
                            </div>
                          ) : null}
                        </div>
                        <p className="text-sm text-gray-800">
                          {entry.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CognitionPaginated;
