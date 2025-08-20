import { Lightbulb } from "lucide-react";

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

type Props = {
  data: CurrentMedicationData;
};

const CurrentMedication = ({
  data: { title, intro, headers, medications },
}: Props) => {
  return (
    <div className="w-[210mm] h-[297mm] mx-auto p-6 bg-white">
      <div className="mb-8">
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

        <div className="overflow-hidden border-1 border-gray-400">
          {/* Table Header */}
          <div className="bg-gray-300 grid grid-cols-12 font-bold text-xs text-gray-900">
            {headers.map((header, index) => {
              const isNotLastClass =
                index < headers.length - 1 ? "border-r-1 border-gray-400" : "";
              const spanClass = header === "Date Started" ? "col-span-2" : "col-span-5";

              if (header === "Dosage Details") {
                return null;
              }
              return (
                <div key={index} className={`${spanClass} p-3 ${isNotLastClass}`}>
                  {header}
                </div>
              );
            })}
          </div>

          {/* Data Rows */}
          {medications.map((medication, idx) => {
            const { medication: name, dosageDetails, indication, dateStarted } =
              medication;
            const isEven = idx % 2 === 0;

            // Alternate background color for rows
            const rowClass = isEven ? "bg-white" : "bg-gray-100";
            const isLastRow = idx === medications.length - 1;
            const lastRowClass = !isLastRow ? "border-b border-gray-300" : "";

            return (
              <div
                key={idx}
                className={`grid grid-cols-12 ${rowClass} ${lastRowClass}`}
              >
                <div className="col-span-5 p-3 border-r-1 border-gray-400">
                  <p className="font-bold text-xs">{name}</p>
                  <p className="text-xs">{dosageDetails}</p>
                </div>
                <div className="col-span-5 p-3 border-r-1 border-gray-400">
                  <p className="text-xs">{indication}</p>
                </div>
                <div className="col-span-2 p-3">
                  <p className="text-xs">{dateStarted}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CurrentMedication;
