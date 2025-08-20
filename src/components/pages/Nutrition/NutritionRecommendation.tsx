import { CircleCheckIcon, CircleXIcon } from "lucide-react";

export type NutritionRecommendationsData = {
  header: string;
  header_intro: string;
  mind_diet_title?: string;
  mind_diet_intro: string;
  recommended_instructions: string;
  recommended_diet: {
    headers: string[];
    entries: {
      foodGroup: string;
      frequency: string;
    }[];
  };
  discouraged_instructions: string;
  discouraged_diet: {
    headers: string[];
    entries: {
      foodGroup: string;
      frequency: string;
    }[];
  };
};

type Props = {
  data: NutritionRecommendationsData;
};

const NutritionRecommendation = ({
  data: {
    header,
    header_intro,
    mind_diet_title,
    mind_diet_intro,
    recommended_instructions,
    recommended_diet,
    discouraged_instructions,
    discouraged_diet,
  },
}: Props) => {
  return (
    <div className="w-[210mm] h-[297mm] mx-auto p-6 bg-white">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
          {header || "Nutrition & Diet"}
        </h2>

        {/* Introduction */}
        <p className="text-xs text-gray-700 mb-2">{header_intro || ""}</p>

        <h3 className="text-md font-semibold text-gray-900 mb-2">
          {mind_diet_title || "MIND Diet: Recommendations and Progress"}
        </h3>
        <p className="text-xs text-gray-700 mb-5">{mind_diet_intro || ""}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="border-green-600 border-2 h-fit">
            <div className="bg-green-600">
              <div className="grid grid-cols-[22px_1fr] gap-x-3 p-3">
                <CircleCheckIcon
                  strokeWidth={2.5}
                  size={22}
                  color="white"
                  className=""
                />
                <p className="text-white font-bold leading-none">Recommended</p>
                <p className="text-white text-sm col-start-2">
                  {recommended_instructions}
                </p>
              </div>
            </div>
            <div className="overflow-hidden">
              {/* Table Header */}
              <div className="bg-gray-300 grid grid-cols-12 font-bold text-xs text-gray-900">
                {recommended_diet.headers.map((header, index) => {
                  const isNotLastClass =
                    index < recommended_diet.headers.length - 1
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
              {recommended_diet.entries.map((diet, idx) => {
                const { foodGroup, frequency } = diet;
                const isEven = idx % 2 === 0;

                // Alternate background color for rows
                const rowClass = isEven ? "bg-white" : "bg-gray-100";
                const isLastRow = idx === recommended_diet.entries.length - 1;
                const lastRowClass = !isLastRow
                  ? "border-b border-gray-300"
                  : "";

                return (
                  <div
                    key={idx}
                    className={`grid grid-cols-12 ${rowClass} ${lastRowClass}`}
                  >
                    {/* Food Group */}
                    <div className="col-span-6 p-3 border-r-1 border-gray-400">
                      <div className="font-medium text-xs">{foodGroup}</div>
                    </div>

                    {/* Frequency */}
                    <div className="col-span-6 p-3">
                      <div className="text-xs">{frequency}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="border-red-800 border-2 h-fit">
            <div className="bg-red-800">
              <div className="grid grid-cols-[22px_1fr] gap-x-3 p-3">
                <CircleXIcon
                  strokeWidth={2.5}
                  size={22}
                  color="white"
                  className=""
                />
                <p className="text-white font-bold leading-none">
                  Not Recommended
                </p>
                <p className="text-white text-sm col-start-2">
                  {discouraged_instructions || ""}
                </p>
              </div>
            </div>
            <div className="overflow-hidden">
              {/* Table Header */}
              <div className="bg-gray-300 grid grid-cols-12 font-bold text-xs text-gray-900">
                {discouraged_diet.headers.map((header, index) => {
                  const isNotLastClass =
                    index < discouraged_diet.headers.length - 1
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
              {discouraged_diet.entries.map((diet, idx) => {
                const { foodGroup, frequency } = diet;
                const isEven = idx % 2 === 0;

                // Alternate background color for rows
                const rowClass = isEven ? "bg-white" : "bg-gray-100";
                const isLastRow = idx === discouraged_diet.entries.length - 1;
                const lastRowClass = !isLastRow
                  ? "border-b border-gray-300"
                  : "";

                return (
                  <div
                    key={idx}
                    className={`grid grid-cols-12 ${rowClass} ${lastRowClass}`}
                  >
                    {/* Food Group */}
                    <div className="col-span-6 p-3 border-r-1 border-gray-400">
                      <div className="font-medium text-xs">{foodGroup}</div>
                    </div>

                    {/* Frequency */}
                    <div className="col-span-6 p-3">
                      <div className="text-xs">{frequency}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { NutritionRecommendation };
