/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import type { BlockProps } from "@/components/shared/PaginationWrapper";
import { Badge } from "@/components/ui/badge";
import type { MedicationType } from "./types";
import { HexagonAlertIcon } from "@/components/icons";
import {
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@/components/shared/TableFlex";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const ActionPlanBlock = forwardRef<
  HTMLDivElement,
  BlockProps<MedicationType>
>(({ data, blockId, setRef }, ref) => {
  const { intro, steps } = data;

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
    <div
      ref={setRef ? setRef(blockId) : ref}
      className="action-plan-main-block mb-4"
    >
      {/* Title */}
      {/* <h1 className="text-3xl font-bold mb-6">{title}</h1> */}
      <h1 className="mb-6">Personalized Action Plan</h1>
      {/* Introduction with inline steps */}
      <div className="mb-4 leading-relaxed">
        {intro[0] && (
          <p className="mb-4">
            {intro[0]} <strong>{formattedSteps}</strong>
          </p>
        )}
        {intro[1] && <p>{intro[1]}</p>}
      </div>
      {/* Medication Section */}
      <div className="mb-4">
        <h2 className="mb-4">Medication</h2>
        <p className="mb-4">
          Your doctor will indicate if any changes in treatment are needed.
          Obtain the following medications and start taking them using the
          "Instructions" column for assistance.
        </p>
        {/* Warning Box */}
        <Alert variant="warning">
          <HexagonAlertIcon className="mt-0.5 flex-shrink-0" />
          <AlertTitle className="">
            Potential Drug-Drug Interactions (DDIs) have been identified between
            your current medications.
          </AlertTitle>
          <AlertDescription>
            Ask your physician if any medications should be changed before
            prescribing the three pharmaceuticals newly recommended here.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
});

export const MedicationTableHeader = forwardRef<HTMLDivElement, BlockProps>(
  ({ blockId, setRef }, ref) => (
    <div ref={setRef ? setRef(blockId) : ref}>
      <TableHeader>
        <TableHeaderCell>Medication</TableHeaderCell>
        <TableHeaderCell>Purpose</TableHeaderCell>
        <TableHeaderCell>Instructions</TableHeaderCell>
        <TableHeaderCell className="flex justify-center">
          Already Taking?
        </TableHeaderCell>
      </TableHeader>
    </div>
  )
);

export const MedicationRow = forwardRef<
  HTMLDivElement,
  BlockProps<MedicationType["medications"][number]>
>(({ index: idx, data: med, blockId, setRef }, ref) => {
  const isOdd = idx ? idx % 2 !== 0 : false;

  return (
    <div ref={setRef ? setRef(blockId) : ref}>
      <TableRow alternate={isOdd}>
        <TableCell>
          <div className="font-semibold">{med?.medication}</div>
          <div className="text-sm font-normal">{med?.dosageDetails}</div>
        </TableCell>
        <TableCell>
          {med?.reasoning?.map((action, j: number) => {
            return (
              <div key={j}>
                <div className="mb-1">{action?.action}</div>
                <div className="flex flex-wrap items-baseline gap-1">
                  {action.reasons.length ? (
                    <p className="text-muted-foreground">Currently</p>
                  ) : null}
                  {action.reasons.map((reason, j: number) => {
                    if (reason.currentLevel) {
                      return (
                        <div className="flex" key={j}>
                          <Badge
                            variant="outline"
                            className="flex items-center p-0.5 rounded justify-center border-r-0 rounded-tr-none rounded-br-none"
                          >
                            {reason.name}
                          </Badge>
                          {reason.currentLevel && (
                            <Badge
                              key={j}
                              variant="outline"
                              className="flex items-center p-0.5 rounded justify-center rounded-tl-none rounded-bl-none"
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
        <TableCell>{med?.guidance}</TableCell>
        <TableCell className="flex gap-4 justify-center">
          <label className="flex items-center gap-1">
            <Checkbox defaultChecked={med?.alreadyTaking === "Yes"} />
            <span>Yes</span>
          </label>
          <label className="flex items-center gap-1">
            <Checkbox defaultChecked={med?.alreadyTaking === "No"} />
            <span>No</span>
          </label>
        </TableCell>
      </TableRow>
    </div>
  );
});
