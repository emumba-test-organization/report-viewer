import { LightbulbIcon } from "lucide-react";

type NutritionConsumption = {
  group: string;
  intake: string;
  note: string;
};

export type NutritionConsumptionData = {
  title: string;
  advice: string;
  entries: NutritionConsumption[];
};

const NutritionConsumption = ({
  data: { title, advice, entries },
}: {
  data: NutritionConsumptionData;
}) => {
  const headers = ["Food Group", "Reported Intake", "Note"];

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
        {title || "Dietary Consumption Summary"}
      </h3>

      <div className="bg-purple-800 p-4 mb-5">
        <div className="flex items-start gap-3">
          <LightbulbIcon className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
          <p className="text-sm font-bold text-white">{advice}</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="border-gray-300 border-2 h-fit">
          <div className="overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-300 grid grid-cols-12 font-bold text-xs text-gray-900">
              {headers.map((header, index) => {
                const isNotLastClass =
                  index < headers.length - 1
                    ? "border-r-1 border-gray-400 col-span-3"
                    : "col-span-6";
                return (
                  <div key={index} className={`p-3 ${isNotLastClass}`}>
                    {header}
                  </div>
                );
              })}
            </div>

            {/* Data Rows */}
            {entries.map((entry, idx) => {
              const { group, intake, note } = entry;
              const isEven = idx % 2 === 0;

              // Alternate background color for rows
              const rowClass = isEven ? "bg-white" : "bg-gray-100";
              const isLastRow = idx === entries.length - 1;
              const lastRowClass = !isLastRow ? "border-b border-gray-300" : "";

              return (
                <div
                  key={idx}
                  className={`grid grid-cols-12 ${rowClass} ${lastRowClass}`}
                >
                  {/* Food Group */}
                  <div className="col-span-3 p-3 border-r-1 border-gray-400">
                    <p className="font-medium">{group}</p>
                  </div>

                  {/* Intake */}
                  <div className="col-span-3 p-3 border-r-1 border-gray-400">
                    <p>{intake}</p>
                  </div>

                  {/* Note */}
                  <div className="col-span-6 p-3">
                    <p>{note}</p>
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

export default NutritionConsumption;
