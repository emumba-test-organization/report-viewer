/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Check, Diamond } from "lucide-react";
import type { BlockProps } from "@/components/shared/PaginationWrapper";
import type { HealthReportData } from "./types";

const iconMap = {
  "At Risk": AlertTriangle,
  Caution: Diamond,
  Optimal: Check,
  Unknown: null,
};

type SectionTitle = keyof typeof iconMap;

export const TitleBlock = React.forwardRef<HTMLDivElement, BlockProps>(
  ({ data, blockId, setRef }, ref) => (
    <div ref={setRef ? setRef(blockId) : ref} className="title-block">
      <h1 className="mb-8">{data?.title}</h1>
    </div>
  )
);

export const OverviewBlock = React.forwardRef<
  HTMLDivElement,
  BlockProps<HealthReportData>
>(({ data, blockId, setRef }, ref) => {
  const { currentStatus } = data;
  const overview = currentStatus?.overview;

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
        <div className="flex flex-col grow">
          <h3 className="font-bold mb-1">Overview</h3>
          <div className="flex border overflow-hidden divide-x grow">
            {overviewEntries.map(({ label, value, annotations }) => (
              <div key={label} className="p-2">
                <span className="">
                  {label}
                </span>
                <div className="flex items-center gap-1">
                  <span
                    className={`font-bold ${
                      label.toLowerCase() === "gender" ? value === "Female" ? "text-[#BF0EA8]" : "text-blue-700" : ""
                    }`}
                  >
                    {value}
                  </span>
                  {annotations.map((ann, idx) => (
                    <div key={idx} className="text-xs font-light">
                      {ann}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Body Measurements */}
        <div className="flex flex-col grow">
          <h3 className="font-bold mb-1">Body Measurements</h3>
          <div className="flex border overflow-hidden divide-x grow">
            {measurementEntries.map(({ label, value, annotations }) => (
              <div key={label} className="p-2">
                <span className="">
                  {label}
                </span>
                <div className="flex items-center gap-1">
                  <span className="font-bold">{value}</span>
                  {annotations.map((ann, idx) => (
                    <div key={idx} className="text-xs font-light">
                      {ann}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vitals */}
        <div className="flex flex-col grow">
          <h3 className="font-bold mb-1">Vitals</h3>
          <div className="flex border overflow-hidden p-2 grow">
            {vitalsEntries.map(({ label, value, annotations }) => (
              <div key={label}>
                <span className="">
                  {label}
                </span>
                <div className="flex items-center gap-1">
                  <span className="font-bold">{value}</span>
                  {annotations.map((ann, idx) => (
                    <div key={idx} className="text-xs font-light">
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

export const HealthStatusTitleBlock = React.forwardRef<
  HTMLDivElement,
  BlockProps
>(({ blockId, setRef }, ref) => (
  <div
    ref={setRef ? setRef(blockId) : ref}
    className="health-status-title-block mb-6"
  >
    <h2>Health Status</h2>
  </div>
));

export const HealthStatusSectionBlock = React.forwardRef<
  HTMLDivElement,
  BlockProps
>(({ section, blockId, setRef }, ref) => {
  const key = section.title as SectionTitle;
  const Icon = iconMap[key];

  const bgMap: Record<SectionTitle, string> = {
    "At Risk": "bg-danger",
    Caution: "bg-warning",
    Optimal: "bg-success",
    Unknown: "bg-base-gray",
  };
  const bgClass = bgMap[key] ?? "";

  const borderMap: Record<SectionTitle, string> = {
    "At Risk": "border-danger",
    Caution: "border-warning",
    Optimal: "border-success",
    Unknown: "border-base-gray",
  };
  const borderClass = borderMap[key] ?? "";

  const textMap: Record<SectionTitle, string> = {
    "At Risk": "text-white",
    Caution: "text-white",
    Optimal: "text-white",
    Unknown: "text-white",
  };
  const textClass = textMap[key] ?? "";

  const iconColorMap: Record<SectionTitle, string> = {
    "At Risk": "text-danger",
    Caution: "text-warning",
    Optimal: "text-success",
    Unknown: "text-base-gray",
  };
  const iconColorClass = iconColorMap[key] ?? "";

  return (
    <div
      ref={setRef ? setRef(blockId) : ref}
      className="health-status-section-block mb-4"
    >
      <Card className={`p-0 rounded-none border-2 ${borderClass}`}>
        <CardContent className="p-0">
          {/* Section Header */}
          <div className={`${bgClass} text-white px-2 py-2`}>
            <div className="flex items-center gap-3">
              <div
                className={`${textClass} pl-1 pr-3 font-bold text-2xl border-r-2`}
              >
                {String(section.count).padStart(2, "0")}
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">{section.title}</h4>
                <p className="text-white">{section.description}</p>
              </div>
            </div>
          </div>

          {/* Factors */}
          <div className="p-3">
            <div className="flex flex-wrap gap-1">
              {section.factors.map((factor: any, idx: any) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="flex items-center gap-1 text-sm p-1 rounded"
                >
                  {Icon && <Icon size={5} className={`shrink-0 w-5 h-5 ${iconColorClass}`} />}
                  {factor}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});
