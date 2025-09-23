/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect } from "react";
import { paginate } from "@/utils/common";
import { usePdfLayout } from "@/utils/PdfLayoutHelper/PdfLayoutHook";

export interface TableComponentProps<T> {
  index?: number;
  headers: string[];
  pageRows: T[];
  containerRef?: React.RefObject<HTMLDivElement | null>;
  headerRef?: React.RefObject<HTMLTableSectionElement | null>;
  rowRefs?: React.RefObject<(HTMLTableRowElement | null)[]>;
}

export default function PaginatedTable<T>({
  index,
  headers,
  rows,
  tableComponent: TableComponent,
}: //   preContentHeightMm,
{
  index: number;
  headers: string[];
  rows: T[];
  tableComponent: React.ComponentType<TableComponentProps<T>>;
  preContentHeightMm?: number;
}) {
  // Refs to measure each row and the container height
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);
  const headerRef = useRef<HTMLTableSectionElement>(null);

  const [pages, setPages] = useState<number[][]>([]);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [measured, setMeasured] = useState(false);
  const heights = useRef<number[]>([]);
  const { setCurrentPageOccupied, currentPageOccupied } = usePdfLayout();
  const prevIndex = index > 0 ? index - 1 : 0;
  const preContentHeightPx = currentPageOccupied[prevIndex] || 0;

  console.log(
    "preContentHeightPx inside",
    preContentHeightPx,
    currentPageOccupied
  );

  useEffect(() => {
    heights.current = rowRefs.current.map((r) => r?.clientHeight || 0);
  }, []);
  useEffect(() => {
    // if (measured || !containerRef.current) return;

    // now uses the margin-trimmed height
    const newPages = paginate(heights.current, preContentHeightPx);
    setPages(newPages);

    if (headerRef.current?.clientHeight && headerRef.current.clientHeight > 0)
      setHeaderHeight(headerRef.current?.clientHeight);
    setMeasured(true);
  }, [measured, preContentHeightPx]);

  useEffect(() => {
    const lastPage = pages[pages.length - 1];
    const lastPageHeight = lastPage
      ? lastPage.reduce((a, b) => a + b, 0) + (headerHeight || 0)
      : 0;
    setCurrentPageOccupied((current) => {
      const newOccupied = [...current];
      newOccupied[index] = lastPageHeight;
      console.log("setting action plan table occupied: ", pages, newOccupied);
      return newOccupied;
    });
  }, [pages]);

  console.log("PAGES: ", pages);

  if (index === undefined) {
    return null;
  }

  // While measuring, render the full table off-screen
  if (!measured) {
    return (
      <TableComponent
        headers={headers}
        pageRows={rows}
        containerRef={containerRef}
        headerRef={headerRef}
        rowRefs={rowRefs}
      />
    );
  }

  // Once measured, render each page chunk
  return (
    <>
      {pages.map((pageRows, pageIndex) => {
        console.log("table page: ", pageIndex, pageRows);
        return (
          <TableComponent
            key={pageIndex}
            headers={headers}
            pageRows={pageRows.map((_, idx) => rows[idx])}
          />
        );
      })}
    </>
  );
}
