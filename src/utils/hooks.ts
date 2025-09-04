/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";

// Hook for measuring element heights
export const useMeasuredHeight = () => {
  const [heights, setHeights] = useState<Record<string, number>>({});
  const refs = useRef<Record<string, HTMLElement | null>>({});

  const measureHeight = (id: any, element: any) => {
    if (element && element.offsetHeight) {
      setHeights((prev) => ({
        ...prev,
        [id]: element.offsetHeight,
      }));
    }
  };

  const setRef = (id: any) => (element: any) => {
    refs.current[id] = element;
    if (element) {
      const resizeObserver = new ResizeObserver(() => {
        measureHeight(id, element);
      });
      resizeObserver.observe(element);
      setTimeout(() => measureHeight(id, element), 0);
    }
  };

  return { heights, setRef };
};
