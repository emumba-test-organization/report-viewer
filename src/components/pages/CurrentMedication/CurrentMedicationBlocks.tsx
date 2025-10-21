import { BulbIcon } from "@/components/icons";
import type { BlockProps } from "@/components/shared/PaginationWrapper";
import {
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@/components/shared/TableFlex";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { forwardRef } from "react";

export const CurrentMedicationIntroBlock = forwardRef<
  HTMLDivElement,
  BlockProps
>(({ data, blockId, setRef }, ref) => (
  <div ref={setRef ? setRef(blockId) : ref}>
    <h2 className="mb-4 mt-6">{data.heading}</h2>

    {/* Warning Box */}
    <Alert variant="info" className="mb-4">
      <BulbIcon />
      <AlertTitle>
        We recommend that you discuss all your medications with your physician
        at every appointment.
      </AlertTitle>
    </Alert>

    {/* Introduction */}
    <p className="mb-4">{data.intro}</p>
  </div>
));

export const CurrentMedicationTableHeader = forwardRef<
  HTMLDivElement,
  BlockProps
>(({ blockId, setRef }, ref) => (
  <div ref={setRef ? setRef(blockId) : ref}>
    <TableHeader>
      <TableHeaderCell>Medication</TableHeaderCell>
      <TableHeaderCell>Class / Indication</TableHeaderCell>
      <TableHeaderCell>Date Started</TableHeaderCell>
    </TableHeader>
  </div>
));

export const CurrentMedicationRow = forwardRef<HTMLDivElement, BlockProps>(
  ({ index: idx, data: medication, blockId, setRef }, ref) => {
    const isOdd = idx ? idx % 2 !== 0 : false;

    return (
      <div ref={setRef ? setRef(blockId) : ref}>
        <TableRow alternate={isOdd}>
          {/* Medication Name & Dosage */}
          <TableCell>
            <div className="font-semibold">{medication.medication}</div>
            <div className="text-sm text-light">{medication.dosageDetails}</div>
          </TableCell>

          {/* Class / Indication */}
          <TableCell>{medication.indication}</TableCell>

          {/* Date Started */}
          <TableCell>{medication.dateStarted}</TableCell>
        </TableRow>
      </div>
    );
  }
);
