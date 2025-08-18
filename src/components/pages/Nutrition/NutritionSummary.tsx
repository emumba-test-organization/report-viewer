import { Badge } from "@/components/ui/badge";
import { CircleAlertIcon } from "lucide-react";

type NutritionDeficiency = {
  nutrient: string;
  normal_range: string;
  result: {
    severity: string;
    desc: string;
    reading: string;
  };
  nutrient_sub: string;
};

export type NutritionSummaryData = {
  title: string;
  warning: string;
  deficiencies: NutritionDeficiency[];
};

const NutritionSummary = ({
  data: { title, warning, deficiencies },
}: {
  data: NutritionSummaryData;
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
        {title || "Nutrition & Diet"}
      </h2>

      <div className="bg-yellow-600 p-4 mb-5">
        <div className="flex items-start gap-3">
          <CircleAlertIcon className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
          <p className="text-sm font-bold text-white">{warning}</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="border-gray-300 border-2 h-fit">
          <div className="overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-300 grid grid-cols-12 font-bold text-xs text-gray-900">
              {["Nutrient", "Your Result"].map((header, index) => {
                const isNotLastClass =
                  index < ["Nutrient", "Your Result"].length - 1
                    ? "border-r-1 border-gray-400"
                    : "";
                return (
                  <div
                    key={index}
                    className={`col-span-6 p-3 ${isNotLastClass}`}
                  >
                    {header}
                  </div>
                );
              })}
            </div>

            {/* Data Rows */}
            {deficiencies.map((deficiency, idx) => {
              const {
                nutrient,
                nutrient_sub,
                normal_range,
                result: { severity, desc, reading },
              } = deficiency;
              const isEven = idx % 2 === 0;

              // Alternate background color for rows
              const rowClass = isEven ? "bg-white" : "bg-gray-100";
              const isLastRow = idx === deficiencies.length - 1;
              const lastRowClass = !isLastRow ? "border-b border-gray-300" : "";
              const severityClassMap = {
                "very high": "text-red-700",
                high: "text-yellow-700",
                normal: "text-green-700",
                low: "text-yellow-700",
                "very low": "text-red-700",
              };
              const severityTextClass =
                severityClassMap[
                  severity.toLowerCase() as keyof typeof severityClassMap
                ] || "text-gray-800";

              return (
                <div
                  key={idx}
                  className={`grid grid-cols-12 ${rowClass} ${lastRowClass}`}
                >
                  {/* Food Group */}
                  <div className="col-span-6 p-3 border-r-1 border-gray-400">
                    <div className="font-semibold text-medium">{nutrient}</div>
                    {nutrient_sub && (
                      <div className="text-sm text-gray-600">
                        {nutrient_sub}
                      </div>
                    )}
                  </div>

                  {/* Frequency */}
                  <div className="col-span-6 p-3">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-gray-700 mr-1">
                        Currently
                      </p>
                      <Badge
                        variant="outline"
                        className={`flex items-center text-medium font-semibold p-1 rounded justify-center bg-accent border-r-0 rounded-tr-none rounded-br-none ${severityTextClass}`}
                      >
                        {severity
                          .toLowerCase()
                          .replace(/\b\w/g, (char) => char.toUpperCase())}
                      </Badge>
                      {desc && (
                        <Badge
                          variant="outline"
                          className="flex items-center text-medium font-semibold p-1 border-r-0 bg-accent rounded-none justify-center"
                        >
                          {desc}
                        </Badge>
                      )}
                      {reading && (
                        <Badge
                          variant="outline"
                          className="flex items-center text-medium font-semibold p-1 rounded justify-center bg-accent rounded-tl-none rounded-bl-none"
                        >
                          {reading}
                        </Badge>
                      )}
                    </div>
                    {normal_range && (
                      <p className="text-xs text-gray-600 mt-1">
                        Normal Range: {normal_range}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionSummary;
