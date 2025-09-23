/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePdfLayout } from "@/utils/PdfLayoutHelper/PdfLayoutHook";
interface ContentWithTablesProps {
  index?: number;
  data: any;
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
  index,
  data,
  tablesComponent: TablesComponent,
}: ContentWithTablesProps) {
  const { currentPageOccupied } = usePdfLayout();

  if (index === undefined) {
    return null;
  }

  const prevIndex = index - 1;
  return (
    <TablesComponent
      preContentHeightPx={currentPageOccupied[prevIndex] || 0}
      preContentHeightMm={pixelsToMm(currentPageOccupied[prevIndex] || 0)}
      data={data}
    />
  );
}
