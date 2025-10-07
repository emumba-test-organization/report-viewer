import type { BlockProps } from "@/components/shared/PaginationWrapper";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { forwardRef } from "react";

export const MainTitleBlock = forwardRef<HTMLDivElement, BlockProps>(
  ({ data, blockId, setRef }, ref) => (
    <div ref={setRef ? setRef(blockId) : ref} className="mb-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 pb-2">
        {data?.title || "Comorbidities Assessment"}
      </h1>
    </div>
  )
);

export const IntroBlock = forwardRef<HTMLDivElement, BlockProps>(
  ({ data, blockId, setRef }, ref) => (
    <div ref={setRef ? setRef(blockId) : ref} className="mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
        {data.overviewTitle || "Issues for Physician Follow-up"}
      </h3>
      <p className="text-sm text-gray-800 mb-4">{data.intro || ""}</p>
    </div>
  )
);

export const CurrentComorboditiesTitle = forwardRef<HTMLDivElement, BlockProps>(
  ({ data, blockId, setRef }, ref) => (
    <div ref={setRef ? setRef(blockId) : ref} className="mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
        {data?.title || "Current Comorbidities sss"}
      </h3>
    </div>
  )
);

export const ComorbiditiesTableHeaderBlock = forwardRef<
  HTMLDivElement,
  BlockProps
>(({ blockId, setRef }, ref) => {
  const headers = ["Comorbidity", "Date Diagnosed"];
  return (
    <div
      className="medication-table-header flex flex-row text-xs font-bold bg-gray-300 border-b-2 border-gray-300"
      ref={setRef ? setRef(blockId) : ref}
    >
      {headers.map((header, index) => (
        <div key={index} className="flex-1 p-3">
          {header}
        </div>
      ))}
    </div>
  );
});

export const ComorbiditiesTableRowBlock = forwardRef<
  HTMLDivElement,
  BlockProps
>(({ index, data: entry, blockId, setRef }, ref) => {
  const { comorbidity, dateDiagnosed } = entry;
  const isEven = index ? index % 2 === 0 : true;
  const rowClass = isEven ? "bg-gray-100" : "bg-white";

  return (
    <div
      className={`medication-row flex flex-row border border-gray-200 ${rowClass}`}
      ref={setRef ? setRef(blockId) : ref}
    >
      {/* Comorbidity */}
      <div className="p-2 flex-1 text-xs border-r">
        <p className="font-medium">{comorbidity}</p>
      </div>

      {/* Date Diagnosed */}
      <div className="p-2 flex-1 text-xs border-r">
        <p>{dateDiagnosed}</p>
      </div>
    </div>
  );
});

export const ReportedComorboditiesTitle = forwardRef<
  HTMLDivElement,
  BlockProps
>(({ data, blockId, setRef }, ref) => (
  <div ref={setRef ? setRef(blockId) : ref} className="mb-8">
    <h3 className="pt-5 text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
      {data?.title || "Reported and Inferred Comorbidities sss"}
    </h3>
    <p className="text-sm text-gray-800 mb-4">
      {data.reported_comorbidities.paragraph || ""}
    </p>
  </div>
));

export const InferredComorboditiesIntro = forwardRef<
  HTMLDivElement,
  BlockProps
>(({ data, blockId, setRef }, ref) => (
  <div ref={setRef ? setRef(blockId) : ref}>
    <p className="py-5 text-sm text-gray-800">
      {data.inferred_comorbidities.paragraph || ""}
    </p>
  </div>
));

export const ReportedComorbiditiesTableHeaderBlock = forwardRef<
  HTMLDivElement,
  BlockProps
>(({ blockId, setRef }, ref) => {
  const headers = ["Reported Comorbidity", "HCC V24", "HCC V28", "ICD-10 Code"];
  return (
    <div
      className="medication-table-header flex flex-row text-xs font-bold bg-gray-300 border-b-2 border-gray-300"
      ref={setRef ? setRef(blockId) : ref}
    >
      {headers.map((header, index) => (
        <div key={index} className="flex-1 p-3">
          {header}
        </div>
      ))}
    </div>
  );
});

export const ReportedComorbiditiesTableRowBlock = forwardRef<
  HTMLDivElement,
  BlockProps
>(({ index, data: entry, blockId, setRef }, ref) => {
  console.log("ReportedComorbiditiesTableRowBlock entry:", entry);
  const isEven = index ? index % 2 === 0 : true;
  const rowClass = isEven ? "bg-gray-100" : "bg-white";

  return (
    <div
      className={`medication-row flex flex-row border border-gray-200 ${rowClass}`}
      ref={setRef ? setRef(blockId) : ref}
    >
      {/* Reported Comorbidity */}
      <div className="p-2 flex-1 text-xs border-r">
        <p className="font-medium">{entry["Possible Comorbidity"]}</p>
        <p className="font-medium">{entry["Explanation"]}</p>
      </div>
      <div className="p-2 flex-1 text-xs border-r">
        <p className="font-medium">{entry["HCC V24"]}</p>
      </div>
      <div className="p-2 flex-1 text-xs border-r">
        <p className="font-medium">{entry["HCC V28"]}</p>
      </div>
      <div className="p-2 flex-1 text-xs border-r">
        <p className="font-medium">{entry["ICD-10 Code"]}</p>
      </div>
    </div>
  );
});

export const InferredComorbiditiesTableHeaderBlock = forwardRef<
  HTMLDivElement,
  BlockProps
>(({ blockId, setRef }, ref) => {
  const headers = [
    "Possible Comorbidity",
    "Explanation",
    "HCC V24",
    "HCC V28",
    "ICD-10 Code",
  ];
  return (
    <div
      className="medication-table-header flex flex-row text-xs font-bold bg-gray-300 border-b-2 border-gray-300"
      ref={setRef ? setRef(blockId) : ref}
    >
      {headers.map((header, index) => (
        <div key={index} className="flex-1 p-3">
          {header}
        </div>
      ))}
    </div>
  );
});

export const InferredComorbiditiesTableRowBlock = forwardRef<
  HTMLDivElement,
  BlockProps
>(({ index, data: entry, blockId, setRef }, ref) => {
  console.log("ReportedComorbiditiesTableRowBlock entry:", entry);
  const isEven = index ? index % 2 === 0 : true;
  const rowClass = isEven ? "bg-gray-100" : "bg-white";

  return (
    <div
      className={`medication-row flex flex-row border border-gray-200 ${rowClass}`}
      ref={setRef ? setRef(blockId) : ref}
    >
      {/* Reported Comorbidity */}
      <div className="p-2 flex-1 text-xs border-r">
        <p className="font-medium">{entry["Possible Comorbidity"]}</p>
      </div>
      <div className="p-2 flex-1 text-xs border-r break-all">
        <p>{entry["Explanation"]}</p>
      </div>
      <div className="p-2 flex-1 text-xs border-r">
        <p>{entry["HCC V24"]}</p>
      </div>
      <div className="p-2 flex-1 text-xs border-r">
        <p>{entry["HCC V28"]}</p>
      </div>
      <div className="p-2 flex-1 text-xs border-r">
        <p>{entry["ICD-10 Code"]}</p>
      </div>
    </div>
  );
});

type RecommendationType = {
  issue?: string;
  value?: string;
  sentence: string;
};
export const SectionBlock = forwardRef<HTMLDivElement, BlockProps>(
  ({ data, blockId, setRef }, ref) => (
    <Card
      ref={setRef ? setRef(blockId) : ref}
      className="p-0 rounded-none border-red-800 border-2 mb-6"
    >
      <CardContent className="p-0">
        <div className="bg-red-800 text-white px-4 py-2 font-bold">
          {data.issueName}
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              {data.recommendations.find(
                (rec: RecommendationType) => !rec.issue && !rec.value
              )?.sentence && (
                <p className="text-sm font-bold mb-1">
                  {
                    data.recommendations.find(
                      (rec: RecommendationType) => !rec.issue && !rec.value
                    )?.sentence
                  }
                </p>
              )}
              <div className="flex flex-wrap gap-1 text-sm content-start">
                {data.recommendations.map(
                  (recommendation: RecommendationType, index: number) => {
                    if (recommendation?.issue && recommendation.value) {
                      return (
                        <div key={index}>
                          <div className="flex">
                            <Badge
                              variant="outline"
                              className="flex items-center text-xs p-0.5 rounded justify-center border-r-0 rounded-tr-none rounded-br-none"
                            >
                              {recommendation.issue}
                            </Badge>

                            <Badge
                              variant="outline"
                              className="flex items-center text-xs p-0.5 rounded justify-center rounded-tl-none rounded-bl-none"
                            >
                              {recommendation.value}
                            </Badge>
                          </div>
                        </div>
                      );
                    }
                  }
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-3 text-sm">
              <ul className="list-disc list-outside space-y-1 text-gray-700">
                {data.warnings.map((warning: string, index: number) => (
                  <li key={index}>{warning}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
);
