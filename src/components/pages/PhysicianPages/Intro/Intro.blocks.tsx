import React from "react";
import type { IntroData, Overview } from "./types";
import type { BlockProps } from "@/components/shared/PaginationWrapper";

export const TitleBlock = React.forwardRef<
  HTMLDivElement,
  BlockProps<IntroData>
>(({ data, blockId, setRef }, ref) => (
  <div
    ref={setRef ? setRef(blockId) : ref}
    className="title-block mb-6 flex gap-3"
  >
    {data?.titles.map((title, idx) => (
      <h1 key={idx} className="text-3xl font-semibold text-gray-900 mb-2">
        {title}
      </h1>
    ))}
  </div>
));

export const SummaryBlock = React.forwardRef<
  HTMLDivElement,
  BlockProps<IntroData>
>(({ data, blockId, setRef }, ref) => {
  return (
    <div ref={setRef ? setRef(blockId) : ref} className="summary-block mb-6">
      <div className="flex justify-between gap-6">
        {Object.entries(data.participant).map(([key, value]) => (
          <div>
            <p key={key} className="text-sm text-gray-700 mb-1">
              {key}
            </p>
            <p className="text-sm text-gray-700 mb-1 font-semibold">{value}</p>
          </div>
        ))}
        {Object.entries(data.practice).map(([key, value]) => (
          <div>
            <p key={key} className="text-sm text-gray-700 mb-1">
              {key}
            </p>
            <p className="text-sm text-gray-700 mb-1 font-semibold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
});

export const OverviewBlock = React.forwardRef<
  HTMLDivElement,
  BlockProps<Overview>
>(({ data: overview, blockId, setRef }, ref) => {
  //   const { currentStatus } = data;
  //   const overview = currentStatus?.overview;

  const overviewEntries = Object.entries(overview)
    .map(([key, value]) => {
      if (key === "Age") {
        return {
          label: "Age",
          value: `${overview.Age.value}`,
          annotations: [
            ` • Born ${overview.DOB.value}`,
            ...overview.Age.annotations,
            ...overview.DOB.annotations,
          ],
        };
      }
      return {
        label: key,
        value: value.value,
        annotations: value.annotations,
      };
    })
    .filter((entry) =>
      ["Gender", "Age", "Post-menopausal"].includes(entry.label)
    );

  const measurementKeys = ["Height", "Weight", "BMI", "Girth"];
  const measurementEntries = Object.entries(overview)
    .map(([key, value]) => ({
      label: key,
      value: value.value,
      annotations: value.annotations,
    }))
    .filter((entry) => measurementKeys.includes(entry.label));

  const vitalsEntries = Object.entries(overview)
    .map(([key, value]) => ({
      label: key,
      value: value.value,
      annotations: value.annotations,
    }))
    .filter((entry) => entry.label === "BP");

  return (
    <div ref={setRef ? setRef(blockId) : ref} className="overview-block mb-6">
      <div className="flex gap-3 text-sm">
        {/* Overview */}
        <div className="grow">
          <h3 className="font-bold mb-1">Overview</h3>
          <div className="flex border rounded overflow-hidden divide-x">
            {overviewEntries.map(({ label, value, annotations }) => (
              <div key={label} className="p-2">
                <span className="text-gray-600 font-semibold block">
                  {label}
                </span>
                <div className="flex items-center gap-1">
                  <span
                    className={`font-bold ${
                      label.toLowerCase() === "gender" ? "text-red-700" : ""
                    }`}
                  >
                    {value}
                  </span>
                  {annotations.map((ann, idx) => (
                    <div key={idx} className="text-xs text-gray-500">
                      {ann}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Body Measurements */}
        <div className="grow">
          <h3 className="font-bold mb-1">Body Measurements</h3>
          <div className="flex border rounded overflow-hidden divide-x">
            {measurementEntries.map(({ label, value, annotations }) => (
              <div key={label} className="p-2">
                <span className="text-gray-600 font-semibold block">
                  {label}
                </span>
                <div className="flex items-center gap-1">
                  <span className="font-bold">{value}</span>
                  {annotations.map((ann, idx) => (
                    <div key={idx} className="text-xs text-gray-500">
                      {ann}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vitals */}
        <div className="grow">
          <h3 className="font-bold mb-1">Vitals</h3>
          <div className="flex border rounded overflow-hidden p-2">
            {vitalsEntries.map(({ label, value, annotations }) => (
              <div key={label}>
                <span className="text-gray-600 font-semibold block">
                  {label}
                </span>
                <div className="flex items-center gap-1">
                  <span className="font-bold">{value}</span>
                  {annotations.map((ann, idx) => (
                    <div key={idx} className="text-xs text-gray-500">
                      {ann}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
