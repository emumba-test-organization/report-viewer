import { createContext, useContext, type RefObject } from "react";

interface OverflowInfo {
  element: HTMLElement;
  height: number;
  pageIndex: number;
}

interface PdfLayoutContextType {
  pageIndex: number;
  currentPageOccupied: number[];
  setCurrentPageOccupied: React.Dispatch<React.SetStateAction<number[]>>
  overflowingElements: OverflowInfo[];
  analyzeLayout: (containerRef: RefObject<HTMLElement | HTMLDivElement |null | undefined>, pageIndex: number) => void;
}

export const PdfLayoutContext = createContext<PdfLayoutContextType | null>(
  null
);

export const usePdfLayout = () => {
  const ctx = useContext(PdfLayoutContext);
  if (!ctx)
    throw new Error("usePdfLayout must be used within PdfLayoutProvider");
  return ctx;
};
