import { AlertCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "../../shared/Header";
import { Badge } from "../../ui/badge";
import type { TableComponentProps } from "@/components/shared/PaginatedTable";

export type MedicationType = {
  title: string;
  intro: string[];
  steps: string[];
  medications: Medication[];
};

type Medication = {
  medication: string;
  dosageDetails: string;
  reasoning: {
    action: string;
    name?: string;
    currentValue?: string;
  }[];
  guidance: string;
  alreadyTaking?: string;
};

const MedicationPlan = ({
  headers,
  pageRows,
  containerRef,
  headerRef,
  rowRefs,
}: TableComponentProps<Medication>) => {
  return (
    <div
      {...(containerRef ? { ref: containerRef } : {})}
      className={`w-[210mm] screen:mx-auto screen:p-6 bg-white`}
    >
      {/* Medication Table */}
      <table className="table-auto w-full border-collapse">
        {/* Table Header */}
        <thead
          {...(headerRef ? { ref: headerRef } : {})}
          className="bg-neutral-200 p-4 font-semibold text-xs text-gray-900"
        >
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="p-4 text-left border-1 border-neutral-300">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {/* Data Rows */}
          {pageRows.map((med, idx) => (
            <tr
              key={idx}
              {...(rowRefs ? { ref: (el) => (rowRefs.current[idx] = el) } : {})}
            >
              {/* Name & Dosage */}
              <td className="p-4 align-top text-xs border-1">
                <div className="font-medium text-xs">{med.medication}</div>
                <div className="text-xs text-gray-600">{med.dosageDetails}</div>
              </td>

              {/* Purpose (Reasoning) */}
              <td className="p-4 align-top text-xs border-1">
                {med.reasoning.map((entry, j) => (
                  <div key={j} className="mb-1">
                    {entry.action} {entry.name}
                    {entry.currentValue && (
                      <div className="text-gray-600 text-xs">
                        Currently: <strong>{entry.currentValue}</strong>
                      </div>
                    )}
                  </div>
                ))}
              </td>

              {/* Instructions (Guidance) */}
              <td className="p-4 align-top text-xs border-1">{med.guidance}</td>
              <td className="p-4 align-top text-xs border-1">
                <label className="flex items-center gap-2 pb-1">
                  <Checkbox defaultChecked={med.alreadyTaking === "Yes"} />
                  Yes
                </label>
                <label className="flex items-center gap-2">
                  <Checkbox defaultChecked={med.alreadyTaking === "No"} />
                  No
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicationPlan;
