/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BlockProps } from "@/components/shared/PaginationWrapper";
import { forwardRef } from "react";

export const LifeStyleIntro = forwardRef<HTMLDivElement, BlockProps>(
  ({ data, blockId, setRef }, ref) => (
    <div ref={setRef ? setRef(blockId) : ref} className="mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
        {data.title || "Lifestyle"}
      </h3>

      {/* Introduction */}
      <p className="text-xs text-gray-700 mb-2">{data.intro || ""}</p>
    </div>
  )
);
export const LifestyleRecommendationBlock = forwardRef<
  HTMLDivElement,
  BlockProps
>(({ index, data: rec, blockId, setRef }, ref) => {
  console.log("Index: ", index);
  console.log("Data: ", rec.task);

  const { area, task, instructions } = rec;
  const splitIconPath = area?.image.split("/");
  const iconName = splitIconPath[splitIconPath.length - 1].split(".")[0] || "";

  const isEven = index ? index % 2 === 0 : true;
  const gridClass = isEven ? "grid-cols-[1fr_2fr]" : "grid-cols-[2fr_1fr]";

  const colStartClass = isEven ? "col-start-1" : "col-start-2";
  return (
    <div
      ref={setRef ? setRef(blockId) : ref}
      className={`grid ${gridClass} row-gap-4 bg-gray-100 mb-8`}
    >
      <div className={`flex row-span-3 items-center ${colStartClass}`}>
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
            {instructions.map((instruction: any, index: any) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
});
