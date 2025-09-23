import { usePdfLayout } from "@/utils/PdfLayoutHelper/PdfLayoutHook";
import { useEffect, useRef, type PropsWithChildren } from "react";

type Props = {
  index: number;
} & PropsWithChildren;

const Analyzer = ({ index, children }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { analyzeLayout, currentPageOccupied } = usePdfLayout();

  const prevIndex = index > 0 ? index - 1 : 0;
  const currentPageOccupiedValue = currentPageOccupied[prevIndex] || 0;
  const dependencyArray = [];
  if (index !== 0)
    dependencyArray.push(currentPageOccupiedValue);

  console.log("Dep Array:", index, currentPageOccupiedValue, dependencyArray);

  useEffect(() => {
    if (containerRef.current && currentPageOccupiedValue !== undefined) {
      analyzeLayout(containerRef, index);
    }
  }, [...dependencyArray]);

  if (index === undefined) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="w-[210mm] screen:mx-auto screen:p-6 pb-0 bg-transparent break-inside-auto"
    >
      {children}
    </div>
  );
};

export default Analyzer;
