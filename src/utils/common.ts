// reserve 10px so you never quite fill right to the edge
const SAFETY_MARGIN = 60;
const A4_HEIGHT_PX = 1123;
const HEADER_HEIGHT_PX = 36;

export function paginate(heights: number[], preContentHeightPx: number) {
  const effectiveMaxFirstPage =
    A4_HEIGHT_PX - preContentHeightPx - SAFETY_MARGIN; // First page max height
  const effectiveMaxNextPages =
    A4_HEIGHT_PX - HEADER_HEIGHT_PX - SAFETY_MARGIN - 100; // Subsequent pages max height

  const pages: number[][] = [];
  let current: number[] = [];
  let sum = 0;

  let isFirstPage = true;

  heights.forEach((h, i) => {
    const effectiveMax = isFirstPage
      ? effectiveMaxFirstPage
      : effectiveMaxNextPages;

    // If adding this row exceeds the available space, start a new page
    if (sum + h > effectiveMax && current.length) {
      pages.push(current);
      current = [];
      sum = 0;
      isFirstPage = false; // Switch to next pages after the first one
    }

    current.push(i);
    sum += h;
  });

  if (current.length) pages.push(current);
  return pages;
}
