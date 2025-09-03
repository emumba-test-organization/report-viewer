import Header from "@/components/shared/Header";
import { Lightbulb } from "lucide-react";
import { forwardRef } from "react";

export type CurrentMedicationData = {
  title: string;
  intro: string;
  headers: string[];
  medications: {
    medication: string;
    dosageDetails: string;
    indication: string;
    dateStarted: string;
  }[];
};

// const CurrentMedication = ({ data: { title, intro } }: Props) => {
const CurrentMedication = forwardRef<
  HTMLDivElement,
  { data: CurrentMedicationData }
>(({ data }, ref) => {
  const { title, intro } = data;
  return (
    <div className="w-[210mm] mx-auto p-6 pb-0 bg-white" ref={ref}>
      <div className="mb-8">
        <Header />
        <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
          {title || "Current Medication"}
        </h3>
        {/* Warning Box */}
        <div className="bg-purple-900 p-4 mb-5">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
            <p className="text-xs font-bold text-white">
              We recommend that you discuss all your medications with your
              physician at every appointment.
            </p>
          </div>
        </div>
        <p className="text-xs font-semibold text-gray-700 mb-2">
          {intro || ""}
        </p>
      </div>
    </div>
  );
});

export default CurrentMedication;
