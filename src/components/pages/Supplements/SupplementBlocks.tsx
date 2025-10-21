/* eslint-disable @typescript-eslint/no-explicit-any */
import { BulbIcon, HexagonAlertIcon } from "@/components/icons";
import type { BlockProps } from "@/components/shared/PaginationWrapper";
import {
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@/components/shared/TableFlex";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { forwardRef } from "react";

export const SupplementsIntroBlock = forwardRef<HTMLDivElement, BlockProps>(
  ({ data, blockId, setRef }, ref) => (
    <div ref={setRef ? setRef(blockId) : ref}>
      <h2 className="mb-4">{data.heading}</h2>

      {/* Introduction */}
      <p className="text-xs mb-2">
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
            className={`text-xs mb-2 ${
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
    <div ref={setRef ? setRef(blockId) : ref} className="mb-5">
      <Alert variant="warning">
        <HexagonAlertIcon />
        <AlertTitle className="">
          Potential Drug-Drug Interactions (DDIs) have been identified between
          your current medications.
        </AlertTitle>
        <AlertDescription>
          Ask your physician if any medications should be changed before
          starting the non-prescription medications newly recommended here
        </AlertDescription>
      </Alert>
    </div>
  )
);

export const SupplementsTipBlock = forwardRef<HTMLDivElement, BlockProps>(
  ({ blockId, setRef }, ref) => (
    <div ref={setRef ? setRef(blockId) : ref} className="mb-6 mt-6">
      <Alert variant="info">
        <BulbIcon />
        <AlertTitle>Tips for Buying Supplements</AlertTitle>
        <AlertDescription>
          We've seen that high-quality supplements typically give better results
          than economy ones from your local store. We suggest:
          <ol className="list-decimal pl-3 text-white">
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
        </AlertDescription>
      </Alert>
    </div>
  )
);

export const SupplementsTableHeader = forwardRef<HTMLDivElement, BlockProps>(
  ({ blockId, setRef }, ref) => (
    <div ref={setRef ? setRef(blockId) : ref}>
      <TableHeader>
        <TableHeaderCell>Supplement</TableHeaderCell>
        <TableHeaderCell>Purpose</TableHeaderCell>
        <TableHeaderCell>Instructions</TableHeaderCell>
      </TableHeader>
    </div>
  )
);
export const SupplementsRow = forwardRef<HTMLDivElement, BlockProps>(
  ({ index: idx, data: med, blockId, setRef }, ref) => {
    const isOdd = idx ? idx % 2 !== 0 : false;

    return (
      <div ref={setRef ? setRef(blockId) : ref}>
        <TableRow alternate={isOdd}>
          {/* Name & Dosage */}
          <TableCell>
            <div className="font-semibold">{med.medication}</div>
            <div className="text-xs text-light">{med.dosageDetails}</div>
          </TableCell>

          {/* Purpose (Reasoning) */}
          <TableCell>
            {med?.reasoning?.map((action: any, j: number) => {
              return (
                <div key={j}>
                  <div className="mb-1">{action?.action}</div>
                  <div className="flex flex-wrap items-baseline gap-0.5">
                    {action.reasons.length ? (
                      <p className="text-muted-foreground">Currently</p>
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
          </TableCell>

          {/* Instructions (Guidance) */}
          <TableCell>
            <div>{med.guidance}</div>
          </TableCell>
        </TableRow>
      </div>
    );
  }
);
