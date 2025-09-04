/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertTriangle, Diamond, Check, HelpCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import A4Page from "../../shared/A4Page";

const iconMap = {
  "At Risk": AlertTriangle,
  Caution: Diamond,
  Optimal: Check,
  Unknown: HelpCircle,
};

type SectionTitle = keyof typeof iconMap;

const HealthReport = ({ data }: { data: any }) => {
  const { currentStatus, healthStatusSections } = data;
  const overview = currentStatus?.overview;

  const overviewEntries = [
    {
      label: "Gender",
      value: overview.Gender.value,
      annotations: overview.Gender.annotations,
    },
    {
      label: "Age • Born",
      value: `${overview.Age.value} • Born ${overview.DOB.value}`,
      annotations: [...overview.Age.annotations, ...overview.DOB.annotations],
    },
    {
      label: "Post-menopausal",
      value: overview.Postmenopausal.value,
      annotations: overview.Postmenopausal.annotations,
    },
  ];
  const measurementKeys = ["Height", "Weight", "BMI", "Girth"];
  const measurementEntries = measurementKeys.map((key) => ({
    label: key,
    value: overview[key].value,
    annotations: overview[key].annotations,
  }));
  const vitalsEntries = ["BP"].map((key) => ({
    label: key,
    value: overview[key].value,
    annotations: overview[key].annotations,
  }));

  return (
    <A4Page>
      {/* Current Status Title */}
      <h2 className="text-3xl font-bold text-gray-900 mb-8">{data?.title}</h2>

      {/* Overview and Body Measurements */}
      <div className="flex flex-wrap gap-2 text-sm">
        {/* Overview */}
        <div>
          <h3 className="font-semibold mb-2">Overview</h3>
          <div className="flex border rounded overflow-hidden divide-x">
            {overviewEntries.map(({ label, value }) => (
              <div key={label} className="p-2">
                <span className="text-gray-600 block">{label}</span>
                <span className="font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Body Measurements */}
        <div>
          <h3 className="font-semibold mb-2">Body Measurements</h3>
          <div className="flex border rounded overflow-hidden divide-x">
            {measurementEntries.map(({ label, value }) => (
              <div key={label} className="p-2">
                <span className="text-gray-600 block">{label}</span>
                <span className="font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Vitals */}
        <div>
          <h3 className="font-semibold mb-2">Vitals</h3>
          <div className="flex border rounded overflow-hidden p-2">
            {vitalsEntries.map(({ label, value }) => (
              <div key={label}>
                <span className="text-gray-600 block">{label}</span>
                <span className="font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Health Status */}
      <h3 className="text-xl font-bold text-gray-900 mb-6">Health Status</h3>

      {healthStatusSections.map((section: any) => {
        const key = section.title as SectionTitle;
        const Icon = iconMap[key] ?? HelpCircle;
        const bgMap: Record<SectionTitle, string> = {
          "At Risk": "bg-red-600",
          Caution: "bg-orange-500",
          Optimal: "bg-green-600",
          Unknown: "bg-gray-500",
        };
        const bgClass = bgMap[key] ?? "";

        const textMap: Record<SectionTitle, string> = {
          "At Risk": "text-red-600",
          Caution: "text-orange-500",
          Optimal: "text-green-600",
          Unknown: "text-gray-500",
        };
        const textClass = textMap[key] ?? "";

        return (
          // Section Card
          <Card key={section.title} className="mb-4 p-0 rounded-none">
            <CardContent className="p-0">
              {/* Section Header */}
              <div className={`${bgClass} text-white px-2 py-1`}>
                <div className="flex items-center gap-3">
                  <div
                    className={`bg-white ${textClass} rounded px-2 py-1 font-bold text-lg`}
                  >
                    {String(section.count).padStart(2, "0")}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{section.title}</h4>
                    <p className="text-sm opacity-90">{section.description}</p>
                  </div>
                </div>
              </div>

              {/* Factors */}
              <div className="p-4">
                <div className="flex flex-wrap gap-1">
                  {section.factors.map((factor: any, idx: any) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="flex items-center gap-1 text-sm px-3 py-1 rounded-full"
                    >
                      <Icon className={`w-4 h-4 ${textClass}`} />
                      {factor}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </A4Page>
  );
};

export default HealthReport;
