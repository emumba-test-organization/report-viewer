import {
  Apple,
  Cherry,
  CircleCheckIcon,
  CircleXIcon,
  Egg,
  Grape,
  Hamburger,
  Lollipop,
  Shell,
  Sprout,
  Weight,
  Wheat,
} from "lucide-react";
import type { DietaryRecommendationsData } from "./types";

type Props = {
  data: DietaryRecommendationsData;
};

const iconMap = {
  "good fats": <Cherry className="w-5 h-5 text-white" />,
  "bad fats": <Hamburger className="w-5 h-5 text-white" />,
  "vegetables and fruits": <Apple className="w-5 h-5 text-white" />,
  "Foods with low-glycemic load": <Lollipop className="w-5 h-5 text-white" />,
  "soluble fiber": <Wheat className="w-5 h-5 text-white" />,
  "Lean protein": <Egg className="w-5 h-5 text-white" />,
  "Prebiotics and probiotics": <Shell className="w-5 h-5 text-white" />,
  CYP1A2: <Sprout className="w-5 h-5 text-white" />,
  "targeting a body mass index (BMI) under 25": (
    <Weight className="w-5 h-5 text-white" />
  ),
};

const colorMap = {
  include: "green-600",
  avoid: "red-800",
};

const tableIconMap = {
  include: (
    <CircleCheckIcon strokeWidth={2.5} size={22} color="white" className="" />
  ),
  avoid: <CircleXIcon strokeWidth={2.5} size={22} color="white" className="" />,
};

const DietaryRecommendations = ({ data }: Props) => {
  const { heading, items } = data;
  return (
    <div className="w-[210mm] mx-auto p-6 bg-white">
      <h2 className="text-xl font-bold text-gray-900 mb-8">{heading}</h2>
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index}>
            <div className="bg-gray-100 py-4 px-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-lg font-semibold rounded-full bg-violet-900 p-3">
                  {iconMap[item.title as keyof typeof iconMap] || (
                    <Grape className="w-5 h-5 text-white" />
                  )}
                </span>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title || ""}
                </h3>
              </div>
              <p className="text-sm font-semibold">{item.description || ""}</p>
            </div>
            {item.table && item.table.length > 0 && (
              <div
                className={`border-2 h-fit border-${
                  colorMap[item.inclusionType as keyof typeof colorMap] ||
                  "border-gray-300"
                }`}
              >
                <div
                  className={`bg-${
                    colorMap[item.inclusionType as keyof typeof colorMap]
                  } p-1`}
                >
                  <div className=" flex items-center gap-x-3 p-3">
                    {
                      tableIconMap[
                        item.inclusionType as keyof typeof tableIconMap
                      ]
                    }
                    <p className="text-white font-bold leading-none">
                      {item.inclusionType.charAt(0).toUpperCase() +
                        item.inclusionType.slice(1)}
                    </p>
                  </div>
                </div>
                <div className="overflow-hidden py-4 px-10">
                  <ul className="list-disc space-y-2 text-sm">
                    {/* Data Rows */}
                    {item.table.map((row, idx) => {
                      return (
                        <li key={idx}>
                          {row.label ? <b>{row.label}: </b> : null} {row.value}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DietaryRecommendations;
