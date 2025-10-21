import A4Page from "@/components/shared/A4Page";
import { useReport } from "@/context";
import React, { useEffect, useState } from "react";

interface TocItem {
  title: string;
  headings: string[];
}

interface JsonData {
  [key: string]: unknown;
}

const TableOfContents: React.FC = () => {
  const { report, isLoading } = useReport();
  const [toc, setToc] = useState<TocItem[]>([]);

  // Parse only top-level JSON objects
  const parseJson = (data: JsonData): TocItem[] => {
    const list: TocItem[] = [];
    let currentTitle: TocItem | null = null;

    // Only look at first-level keys in the JSON
    Object.values(data).forEach((obj) => {
      if (obj && typeof obj === "object") {
        if ("title" in obj && typeof obj.title === "string") {
          // Start a new section
          currentTitle = { title: obj.title, headings: [] };
          list.push(currentTitle);
        } else if ("heading" in obj && typeof obj.heading === "string") {
          // Add heading to the latest section
          if (currentTitle) {
            currentTitle.headings.push(obj.heading);
          }
        }
      }
    });

    return list;
  };

  useEffect(() => {
    if (report) {
      try {
        const tocList = parseJson(report);
        setToc(tocList);
      } catch (err) {
        console.error("Error loading or parsing JSON:", err);
      }
    }
  }, [isLoading, report]);

  return (
    <A4Page>
      <h1 className="mb-8">Table of Contents</h1>

      <ol className="space-y-3">
        {toc.map((item, i) => (
          <li key={i} className="">
            <div className="flex justify-between gap-2">
              <span>
                {i + 1}.{" "}
                <span className="border-b-2 border-primary font-semibold">
                  {item.title}
                </span>
              </span>
              <span className="grow border-b-2 border-dotted" />
              <span className="font-normal">
                {String(i + 3).padStart(2, "0")}
              </span>
            </div>

            {item.headings.length > 0 && (
              <ul className="ml-6 mt-2 space-y-3">
                {item.headings.map((heading, j) => (
                  <li key={j} className="flex justify-between gap-2">
                    <span>
                      {String.fromCharCode(97 + j)}.{" "}
                      <span className="border-b-2 border-primary font-semibold first-letter:uppercase">
                        {heading}
                      </span>
                    </span>
                    <span className="grow border-b-2 border-dotted" />
                    <span className="font-normal">
                      {String(i + 3 + j).padStart(2, "0")}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </A4Page>
  );
};

export default TableOfContents;
