/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePdfLayout } from "@/utils/PdfLayoutHelper/PdfLayoutHook";
interface ContentWithTablesProps {
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
  data,
  tablesComponent: TablesComponent,
}: ContentWithTablesProps) {
  const { currentPageOccupied } = usePdfLayout();

  return (
    <TablesComponent
      preContentHeightPx={currentPageOccupied[2] || 0}
      preContentHeightMm={pixelsToMm(currentPageOccupied[2] || 0)}
      data={data}
    />
  );
}
