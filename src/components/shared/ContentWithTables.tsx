/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLayoutEffect, useRef, useState } from "react";

interface ContentWithTablesProps {
  data: any;
  preContentComponent: React.ComponentType<{
    data: any;
    ref?: React.Ref<HTMLDivElement>;
  }>;
  tablesComponent: React.ComponentType<{
    data: any;
    preContentHeightPx: number;
    preContentHeightMm: number;
  }>;
}

function pixelsToMm(pixels: number, dpi: number = 96): number {
  const mmToInches = 25.4; // 1 inch = 25.4 mm
  return Math.round((pixels / dpi) * mmToInches);
}

export default function ContentWithTables({
  data,
  preContentComponent: PreContentComponent,
  tablesComponent: TablesComponent,
}: ContentWithTablesProps) {
  const preContentRef = useRef<HTMLDivElement | null>(null);
  const [heightPx, setHeightPx] = useState(0);

  useLayoutEffect(() => {
    if (!preContentRef.current || !data) return;

    const raf = requestAnimationFrame(() => {
      const h = preContentRef.current?.getBoundingClientRect().height ?? 0;
      setHeightPx(h);
    });

    return () => cancelAnimationFrame(raf);
  }, [data]);

  return (
    <>
      <PreContentComponent ref={preContentRef} data={data} />
      {heightPx > 0 && (
        <TablesComponent
          preContentHeightPx={heightPx}
          preContentHeightMm={pixelsToMm(heightPx)}
          data={data}
        />
      )}
    </>
  );
}
