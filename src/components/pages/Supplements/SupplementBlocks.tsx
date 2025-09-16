/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BlockProps } from "@/components/shared/PaginationWrapper";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Lightbulb } from "lucide-react";
import { forwardRef } from "react";

export const SupplementsIntroBlock = forwardRef<HTMLDivElement, BlockProps>(
  ({ data, blockId, setRef }, ref) => (
    <div ref={setRef ? setRef(blockId) : ref}>
      <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
        {data.title}
      </h3>

      {/* Introduction */}
      <p className="text-xs text-gray-700 mb-2">
        Your doctor will indicate if any changes in treatment are needed. Obtain
        the following supplements and start taking them using the “Instructions”
        column for assistance.
      </p>
      <ol
        className={`list-decimal pl-6 mb-4 ${
          data.intro.length <= 1 ? "pl-0" : ""
        }`}
      >
        {data.intro.map((line: any, idx: any) => (
          <li
            key={idx}
            className={`text-xs text-gray-700 mb-2 ${
              data.intro.length <= 1 ? "list-none mr-0" : ""
            }`}
          >
            {line}
          </li>
        ))}
      </ol>
    </div>
  )
);

export const PotentialDdiBlock = forwardRef<HTMLDivElement, BlockProps>(
  ({ blockId, setRef }, ref) => (
    <div
      ref={setRef ? setRef(blockId) : ref}
      className="bg-yellow-700 p-4 mb-5"
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />

        <div className="text-xs">
          <p className="font-semibold text-white mb-1">
            Potential Drug-Drug Interactions (DDIs) have been identified between
            your current medications.
          </p>
          <p className="text-white">
            Ask your physician if any medications should be changed before
            starting the non-prescription medications newly recommended here
          </p>
        </div>
      </div>
    </div>
  )
);

export const SupplementsTipBlock = forwardRef<HTMLDivElement, BlockProps>(
  ({ blockId, setRef }, ref) => (
    <div
      ref={setRef ? setRef(blockId) : ref}
      className="bg-violet-900 p-4 mb-6 mt-6"
    >
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
              Buy them online. Consider Web sites such as Designs for Health,
              Gaia Herbs, Life Extension, Metagenics (using a 'Practitioner
              Code' from your doctor), Pure Encapsulations, or WholeScripts.
            </li>
            <li>
              And, if you cannot find the recommended dosage, buy the supplement
              with the closest lower dosage.
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
);

export const SupplementsTableHeader = forwardRef<HTMLDivElement, BlockProps>(
  ({ blockId, setRef }, ref) => (
    <div
      className="p-4 flex flex-row text-xs font-bold bg-gray-300 border-b-2 border-gray-300"
      ref={setRef ? setRef(blockId) : ref}
    >
      <div className="flex-1">Supplement</div>
      <div className="flex-1">Purpose</div>
      <div className="flex-1">Instructions</div>
    </div>
  )
);
export const SupplementsRow = forwardRef<HTMLDivElement, BlockProps>(
  ({ index: idx, data: med, blockId, setRef }, ref) => {
    const isEven = idx ? idx % 2 === 0 : false;
    const rowClass = isEven ? "bg-gray-100" : "bg-white";

    return (
      <div
        ref={setRef ? setRef(blockId) : ref}
        className={`medication-row flex flex-row border border-gray-200 ${rowClass}`}
      >
        {/* Name & Dosage */}
        <div className="p-4 flex-1 text-xs">
          <div className="font-semibold">{med.medication}</div>
          <div className="text-xs text-gray-600">{med.dosageDetails}</div>
        </div>

        {/* Purpose (Reasoning) */}
        <div className="p-4 flex-1 text-xs">
          {med?.reasoning?.map((action: any, j: number) => {
            return (
              <div key={j}>
                <div className="mb-1">{action?.action}</div>
                <div className="flex flex-wrap items-baseline gap-0.5">
                  {action.reasons.length ? (
                    <p className="text-gray-600">Currently</p>
                  ) : null}
                  {action.reasons.map((reason: any, j: number) => {
                    if (reason.currentLevel) {
                      return (
                        <div className="flex" key={j}>
                          <Badge
                            variant="outline"
                            className="flex items-center text-xs p-0.5 rounded justify-center border-r-0 rounded-tr-none rounded-br-none"
                          >
                            {reason.name}
                          </Badge>
                          {reason.currentLevel && (
                            <Badge
                              key={j}
                              variant="outline"
                              className="flex items-center text-xs p-0.5 rounded justify-center rounded-tl-none rounded-bl-none"
                            >
                              {reason.currentLevel}
                            </Badge>
                          )}
                        </div>
                      );
                    } else if (reason.action) {
                      return <div className="mb-1">{reason?.action}</div>;
                    }
                  })}
                </div>
              </div>
            );
          }) || null}
        </div>

        {/* Instructions (Guidance) */}
        <div className="p-4 flex-1 text-xs">
          <div>{med.guidance}</div>
        </div>
      </div>
    );
  }
);
