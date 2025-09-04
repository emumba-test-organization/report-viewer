/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertCircle } from "lucide-react";
import Header from "../../shared/Header";
import { forwardRef } from "react";
import type { SupplementData } from "../Supplements";

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

const ActionPlan = forwardRef<HTMLDivElement, { data: any }>(
  ({ data }, ref) => {
    const { title, intro, steps } = data;

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
      <div className="w-[210mm] mx-auto p-6 pb-0 bg-white" ref={ref}>
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
        </div>
      </div>
    );
  }
);

export default ActionPlan;
