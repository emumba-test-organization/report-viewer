// PdfLayoutContext.tsx
import { useCallback, useState, type ReactNode, type RefObject } from "react";
import { PdfLayoutContext } from "./PdfLayoutHook";

// A4 size in inches: 11.69in. To get pixels: inches * DPI.
// Example: For 96 DPI (typical web), 11.69 * 96 ≈ 1122.24
// Change DPI below to match your PDF rendering DPI.
const DPI = 96; // Set this to your actual DPI
// const PDF_MARGIN = 0.5 * DPI * 2;
const PDF_MARGIN = 48;
const A4_HEIGHT_PX = Math.round(11.69 * DPI - PDF_MARGIN); // 0.5 inch margin at bottom

interface OverflowInfo {
  element: HTMLElement;
  height: number;
  pageIndex: number;
}

export function PdfLayoutProvider({ children }: { children: ReactNode }) {
  const [pageIndex, setPageIndex] = useState(1);
  const [currentPageOccupied, setCurrentPageOccupied] = useState<number[]>([]);
  const [overflowingElements, setOverflowingElements] = useState<
    OverflowInfo[]
  >([]);

  const analyzeLayout = useCallback(
    (
      containerRef: RefObject<HTMLElement | HTMLDivElement | null | undefined>,
      pageIndex: number
    ) => {
      if (!containerRef.current) return;

      const results: OverflowInfo[] = [];
      const cursor = pageIndex - 1 >= 0 ? pageIndex - 1 : 0;
      let currentPageHeight = currentPageOccupied[cursor] || 0;
      console.log("currentPageHeight start", currentPageHeight);
      let currentPageIndex = 1;

      const traverse = (element: HTMLElement) => {
        const style = window.getComputedStyle(element);
        const display = style.display;
        const isFlex = display === "flex";
        const isFlexRow = isFlex && style.flexDirection === "row";
        const isGrid = display === "grid";
        const gridTemplateColumns = style.gridTemplateColumns;
        const gridColumnCount = isGrid
          ? (gridTemplateColumns.match(/[^ ]+/g) || []).length
          : 0;
        const hasColumns =
          parseInt(style.columnCount || "0", 10) > 1 ||
          (style.columnWidth && style.columnWidth !== "auto");

        // console.log("display", display, "has columns", (isFlex && isFlexColumn) || (isGrid && gridColumnCount > 1) || hasColumns);

        const breakInside =
          style.breakInside || style.getPropertyValue("page-break-inside");
        const breakBefore =
          style.breakBefore || style.getPropertyValue("page-break-before");
        const breakAfter =
          style.breakAfter || style.getPropertyValue("page-break-after");

        // offsetHeight includes padding and border, but NOT margin.
        // To include margin, add computed marginTop and marginBottom.
        const marginTop = parseFloat(style.marginTop) || 0;
        const marginBottom = parseFloat(style.marginBottom) || 0;
        const height = element.offsetHeight + marginTop + marginBottom;

        // Check if element is a leaf node (no element children, only text or comment nodes)
        const isLeaf = Array.from(element.childNodes).every((node) => {
          console.log("nodeType", node.nodeType);
          return (
            node.nodeType === Node.TEXT_NODE ||
            node.nodeType === Node.COMMENT_NODE
          );
        });
        isLeaf && console.log("isLeaf", element);

        // ✅ Handle break-before: page
        if (breakBefore === "page") {
          currentPageIndex++;
          currentPageHeight = 0; // start new page
          currentPageHeight += height; // place element at top
          console.log("currentPageHeight - break before", currentPageHeight);
          return; // element placed, skip further processing
        }
        // ✅ Handle break-after: page
        if (breakAfter === "page") {
          currentPageIndex++;
          currentPageHeight = 0; // next element starts fresh
          console.log("currentPageHeight - break after", currentPageHeight);
          return; // element placed, skip further processing
        }
        // ✅ Handle break-inside: avoid
        else if (breakInside === "avoid") {
          console.log("break-inside: avoid", element, height);
          if (currentPageHeight + height > A4_HEIGHT_PX) {
            results.push({ element, height, pageIndex: currentPageIndex });
            currentPageIndex++;
            currentPageHeight = 0;
          }
          currentPageHeight += height;
          console.log(
            "currentPageHeight - break inside avoid",
            currentPageHeight
          );
        }
        // ✅ Handle break-inside: auto → recurse into children
        else if (breakInside === "auto") {
          const paddingTop = parseFloat(style.paddingTop) || 0;
          const paddingBottom = parseFloat(style.paddingBottom) || 0;
          const borderTop = parseFloat(style.borderTopWidth) || 0;
          const borderBottom = parseFloat(style.borderBottomWidth) || 0;

          const gutters =
            paddingTop +
            paddingBottom +
            borderTop +
            borderBottom +
            marginTop +
            marginBottom;
          !isLeaf && console.log("break-inside: auto", element);

          if (isLeaf) {
            // Leaf element: handle as a block
            console.log("break-inside: auto", element, height);
            if (currentPageHeight + height > A4_HEIGHT_PX) {
              currentPageIndex++;
              currentPageHeight = 0;
            }
            currentPageHeight += height;
            console.log(
              "currentPageHeight - break inside auto - is leaf",
              currentPageHeight
            );
            return;
          }

          currentPageHeight += gutters;
          console.log(
            "currentPageHeight - break inside auto",
            currentPageHeight
          );

          if (
            (isFlex && isFlexRow) ||
            (isGrid && gridColumnCount > 1) /* ||
            hasColumns */
          ) {
            console.log("has columns", display, hasColumns);

            // ⚡ Find tallest child
            let tallestChild: HTMLElement | null = null;
            let maxHeight = 0;
            Array.from(element.children).forEach((child) => {
              const h = (child as HTMLElement).offsetHeight;
              if (h > maxHeight) {
                maxHeight = h;
                tallestChild = child as HTMLElement;
              }
            });

            if (tallestChild) {
              traverse(tallestChild); // only traverse tallest child
            }

            return; // skip further processing for this element
          }

          Array.from(element.children).forEach((child) =>
            traverse(child as HTMLElement)
          );
        }
        // ✅ Default flow
        else {
          if (currentPageHeight + height > A4_HEIGHT_PX) {
            currentPageIndex++;
            currentPageHeight = 0;
          }
          currentPageHeight += height;
          console.log("currentPageHeight - default", currentPageHeight);
        }
      };

      traverse(containerRef.current);

      setPageIndex(currentPageIndex);
      setCurrentPageOccupied((current) => {
        console.log("setting currentPageOccupied", pageIndex, currentPageHeight);
        const arr = [...current];
        arr[pageIndex] = currentPageHeight;
        return arr;
      });
      setOverflowingElements(results);
    },
    [
      currentPageOccupied,
      setPageIndex,
      setCurrentPageOccupied,
      setOverflowingElements,
    ]
  );

  return (
    <PdfLayoutContext.Provider
      value={{
        pageIndex,
        currentPageOccupied,
        setCurrentPageOccupied,
        overflowingElements,
        analyzeLayout,
      }}
    >
      {children}
    </PdfLayoutContext.Provider>
  );
}
