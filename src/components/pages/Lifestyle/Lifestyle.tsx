export type LifestyleData = {
  title: string;
  intro: string;
  recommendations: {
    area: {
      title: string;
      image: string;
    };
    task: string;
    instructions: string[];
  }[];
};

type Props = {
  data: LifestyleData;
};

const Lifestyle = ({ data: { title, intro, recommendations } }: Props) => {
  return (
    <div className="w-[210mm] mx-auto p-6 bg-white">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
          {title || "Lifestyle"}
        </h3>

        {/* Introduction */}
        <p className="text-xs text-gray-700 mb-2">{intro || ""}</p>

        {/* Recommendations */}
        <div className="grid grid-cols-1 gap-2">
          {recommendations.map((rec, index) => {
            const { area, task, instructions } = rec;
            const splitIconPath = area?.image.split("/");
            const iconName =
              splitIconPath[splitIconPath.length - 1].split(".")[0] || "";

            const isEven = index % 2 === 0;
            const gridClass = isEven
              ? "grid-cols-[1fr_2fr]"
              : "grid-cols-[2fr_1fr]";

            const colStartClass = isEven ? "col-start-1" : "col-start-2";
            return (
              <div
                className={`grid ${gridClass} row-gap-4 bg-gray-100`}
                key={index}
              >
                <div
                  className={`flex row-span-3 items-center ${colStartClass}`}
                >
                  <img
                    src={`./${area?.title}.png`}
                    alt="Lifestyle Card Image"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center items-start gap-3 p-5">
                  <div className="flex justify-start items-center-safe gap-3">
                    <div className="flex items-center justify-center w-14 h-14 bg-purple-950 rounded-full">
                      <img
                        src={iconName ? `${iconName}.svg` : ""}
                        alt="Lifestyle Icon"
                        className="object-cover w-12 h-12"
                      />
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">
                      {area?.title || "Lifestyle"}
                    </h4>
                  </div>
                  {task && (
                    <div className="text-sm font-bold text-white bg-purple-950 p-4 w-full">
                      <p className="pb-0">{task}</p>
                    </div>
                  )}
                  {instructions && instructions.length > 0 && (
                    <ul className="list-disc pl-5 text-sm font-medium">
                      {instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Lifestyle;
