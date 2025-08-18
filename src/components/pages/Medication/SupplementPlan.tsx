import { Badge } from "@/components/ui/badge";
import { AlertCircle, Lightbulb } from "lucide-react";

export type SupplementData = {
  title: string;
  intro: string[];
  meds: {
    medication: string;
    dosageDetails: string;
    reasoning: {
      action: string;
      entries: {
        name: string;
        currentValue?: string;
        currentLevel?: string;
      }[];
    };
    guidance: string;
    alreadyTaking: "Yes" | "No";
  }[];
};

const SupplementPlan = ({ supplements }: { supplements: SupplementData }) => {
  if (!supplements || !supplements.meds || supplements.meds.length === 0) {
    return null;
  }

  const { title, intro, meds: medications } = supplements;

  return (
    <div className="w-[210mm] h-[297mm] mx-auto p-6 bg-white">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
          {title}
        </h3>

        {/* Introduction */}
        <p className="text-xs text-gray-700 mb-2">
          Your doctor will indicate if any changes in treatment are needed.
          Obtain the following supplements and start taking them using the
          “Instructions” column for assistance.
        </p>
        <ol
          className={`list-decimal pl-6 mb-4 ${
            intro.length <= 1 ? "pl-0" : ""
          }`}
        >
          {intro.map((line, idx) => (
            <li
              key={idx}
              className={`text-xs text-gray-700 mb-2 ${
                intro.length <= 1 ? "list-none mr-0" : ""
              }`}
            >
              {line}
            </li>
          ))}
        </ol>
        {/* {intro.map((line, idx) => (
          <p key={idx} className="text-xs text-gray-700 mb-2">
            {line}
          </p>
        ))} */}
        {/* <p className="text-xs text-gray-700 mb-6">
          Your doctor will indicate if any changes in treatment are needed.
          Obtain the following medications and start taking them using the
          "Instructions" column for assistance.
        </p> */}

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
                starting the non-prescription medications newly recommended here
              </p>
            </div>
          </div>
        </div>

        {/* Medication Table */}
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-100 grid grid-cols-12 gap-4 p-4 font-semibold text-xs text-gray-900">
            <div className="col-span-3">Supplement</div>
            <div className="col-span-4">Purpose</div>
            <div className="col-span-5">Instructions</div>
          </div>

          {/* Data Rows */}
          {medications.map((med, idx) => (
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
              <div className="col-span-4">
                <div className="space-y-1 text-xs">
                  <div>{med.reasoning?.action}</div>
                  {med.reasoning.entries.some(
                    (entry) => entry.currentLevel
                  ) && <p className="text-gray-600">Currently: </p>}
                  {med.reasoning.entries.map((entry, j) => {
                    if (entry.currentLevel) {
                      return (
                        <div className="flex" key={j}>
                          <Badge
                            variant="outline"
                            className="flex items-center text-xs p-0.5 rounded justify-center border-r-0 rounded-tr-none rounded-br-none"
                          >
                            {entry.name}
                          </Badge>
                          {entry.currentLevel && (
                            <Badge
                              key={j}
                              variant="outline"
                              className="flex items-center text-xs p-0.5 rounded justify-center rounded-tl-none rounded-bl-none"
                            >
                              {entry.currentLevel}
                            </Badge>
                          )}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>

              {/* Instructions (Guidance) */}
              <div className="col-span-5">
                <div className="text-xs">{med.guidance}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-violet-900 p-4 mb-6 mt-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
            <div className="text-xs">
              <p className="font-bold text-white mb-1">
                Tips for Buying Supplements
              </p>
              <p className="text-white">
                We've seen that high-quality supplements typically give better
                results than economy ones from your local store. We suggest:
              </p>
              <ol className="list-decimal pl-3 mt-1 text-white">
                <li>
                  Buy them through your doctor, at your doctor&apos;s office, or
                  with a prescription, if applicable.
                </li>
                <li>
                  Buy from a health food store or specialty vitamin shop. Seek
                  expert guidance there.
                </li>
                <li>
                  Buy them online. Consider Web sites such as Designs for
                  Health, Gaia Herbs, Life Extension, Metagenics (using a
                  'Practitioner Code' from your doctor), Pure Encapsulations, or
                  WholeScripts.
                </li>
                <li>
                  And, if you cannot find the recommended dosage, buy the
                  supplement with the closest lower dosage.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplementPlan;
