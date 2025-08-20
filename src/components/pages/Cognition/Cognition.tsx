import Spectrum from "@/components/shared/Spectrum";
import { Badge } from "@/components/ui/badge";

export type CognitionData = {
  title: string;
  intro: string;
  factors: {
    section: string;
    entries: {
      description: string;
      severity: string;
      measurement: string;
      currentLevel: string;
      targetLevel: string;
      image: string | null;
    }[];
  }[];
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

const Cognition = ({ data }: Props) => {
  const { title, intro, factors } = data;
  return (
    <div className="w-[250mm] mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 pb-2">
          {title || "Cognition"}
        </h1>
        <p className="text-sm text-gray-800 mb-4">{intro || ""}</p>
        <div className="grid grid-cols-1 gap-4">
          {factors.map((factor, index) => {
            const { section, entries } = factor;
            const severityBorderClass = (
              factor: CognitionData["factors"][number]
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
                  return "border-2 border-red-800 bg-red-800";
                case "moderately high":
                case "moderately low":
                  return "border-2 border-yellow-700 bg-yellow-700";
                default:
                  return "border-2 border-red-800 bg-red-800";
              }
            };
            return (
              <div key={index} className={`${severityBorderClass(factor)}`}>
                <h3 className="text-md font-semibold text-white mb-2 p-2">
                  {section}
                </h3>
                <div className="grid grid-cols-1 gap-0.5">
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
                      <div key={entryIndex} className="bg-white p-2">
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

export default Cognition;
