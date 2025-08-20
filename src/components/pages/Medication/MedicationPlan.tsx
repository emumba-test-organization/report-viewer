/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AlertCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "../../shared/Header";
import { Badge } from "../../ui/badge";
import type { SupplementData } from "./SupplementPlan";

export type MedicationType = {
  title: string;
  intro: string[];
  steps: string[];
  medications: {
    medication: string;
    dosageDetails: string;
    reasoning: {
      action: string;
      name?: string;
      currentValue?: string;
    }[];
    guidance: string;
    alreadyTaking?: string;
  }[];
  supplements: SupplementData;
};

const MedicationPlan = ({ data }: { data: MedicationType }) => {
  console.log(data);
  const { title, intro, steps, medications } = data;

  const formattedSteps = steps
    .map((s: any) =>
      s
        .replace(/,$/, "")
        .trim()
        .replace(/^./, (c: any) => c.toUpperCase())
    )
    .join(", ")
    .replace(/, ([^,]*)$/, " & $1");
  return (
    <div className="w-[210mm] h-[297mm] mx-auto p-6 bg-white">
      <Header />

      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>

      {/* Introduction with inline steps */}
      <div className="mb-8 text-xs text-gray-700 leading-relaxed">
        {intro[0] && (
          <p className="mb-4">
            {intro[0]} <strong>{formattedSteps}</strong>
          </p>
        )}
        {intro[1] && <p>{intro[1]}</p>}
      </div>

      {/* Medication Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
          Medication
        </h3>

        <p className="text-xs text-gray-700 mb-6">
          Your doctor will indicate if any changes in treatment are needed.
          Obtain the following medications and start taking them using the
          "Instructions" column for assistance.
        </p>

        {/* Warning Box */}
        <div className="bg-orange-100 border-l-4 border-orange-500 p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs">
              <p className="font-semibold text-orange-800 mb-1">
                Potential Drug-Drug Interactions (DDIs) have been identified
                between your current medications.
              </p>
              <p className="text-orange-700">
                Ask your physician if any medications should be changed before
                prescribing the three pharmaceuticals newly recommended here.
              </p>
            </div>
          </div>
        </div>

        {/* Medication Table */}
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-100 grid grid-cols-12 gap-4 p-4 font-semibold text-xs text-gray-900">
            <div className="col-span-3">Medication</div>
            <div className="col-span-3">Purpose</div>
            <div className="col-span-4">Instructions</div>
            <div className="col-span-2">Already Taking?</div>
          </div>

          {/* Data Rows */}
          {medications.map((med: any, idx: any) => (
            <div
              key={idx}
              className={`grid grid-cols-12 gap-4 p-4 ${
                idx < medications.length - 1 ? "border-b border-gray-200" : ""
              }`}
            >
              {/* Name & Dosage */}
              <div className="col-span-3">
                <div className="font-medium text-xs">{med.medication}</div>
                <div className="text-xs text-gray-600">{med.dosageDetails}</div>
              </div>

              {/* Purpose (Reasoning) */}
              <div className="col-span-3">
                <div className="space-y-1 text-xs">
                  {med.reasoning.map((entry: any, j: any) => (
                    <div key={j}>
                      <div>
                        {entry?.action} {entry?.name}
                      </div>
                      {entry.currentValue && (
                        <div className="text-xs text-gray-600 flex items-center flex-start gap-1">
                          <p>Currently: </p>
                          <Badge
                            key={j}
                            variant="outline"
                            className="flex items-center text-xs p-0.5 rounded justify-center"
                          >
                            {entry.currentValue}
                          </Badge>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions (Guidance) */}
              <div className="col-span-4">
                <div className="text-xs">{med.guidance}</div>
              </div>

              {/* Already Taking */}
              <div className="col-span-2 flex gap-4">
                <label className="flex items-center gap-2 text-xs">
                  <Checkbox defaultChecked={med.alreadyTaking === "Yes"} />
                  Yes
                </label>
                <label className="flex items-center gap-2 text-xs">
                  <Checkbox defaultChecked={med.alreadyTaking === "No"} />
                  No
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicationPlan;
