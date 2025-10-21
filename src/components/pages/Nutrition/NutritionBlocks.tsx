/* eslint-disable @typescript-eslint/no-explicit-any */
import { BulbIcon } from "@/components/icons";
import type { BlockProps } from "@/components/shared/PaginationWrapper";
import {
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@/components/shared/TableFlex";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CircleAlertIcon, CircleCheckIcon, CircleXIcon } from "lucide-react";
import { forwardRef } from "react";

export const HeadingBlock = forwardRef<HTMLDivElement, BlockProps>(
  ({ blockId, setRef }, ref) => (
    <div ref={setRef ? setRef(blockId) : ref}>
      <h2 className="mb-5">Nutrition & Diet</h2>
    </div>
  )
);

export const NutritionTitleBlock = forwardRef<HTMLDivElement, BlockProps>(
  ({ data, blockId, setRef }, ref) => (
    <div ref={setRef ? setRef(blockId) : ref}>
      <h3 className="mb-4">{data?.summary?.title}</h3>
    </div>
  )
);

export const DietaryConsumptionTitleBlock = forwardRef<
  HTMLDivElement,
  BlockProps
>(({ data, blockId, setRef }, ref) => (
  <div ref={setRef ? setRef(blockId) : ref}>
    <h3 className="mt-5 mb-4">{data?.consumption?.title}</h3>
  </div>
));

export const DietaryConsumptionInsightBlock = forwardRef<
  HTMLDivElement,
  BlockProps
>(({ data, blockId, setRef }, ref) => (
  <div ref={setRef ? setRef(blockId) : ref}>
    <Alert variant="info" className="mb-5">
      <BulbIcon />
      <AlertTitle>{data?.consumption?.advice}</AlertTitle>
    </Alert>
  </div>
));

export const DietaryWarningBlock = forwardRef<HTMLDivElement, BlockProps>(
  ({ data, blockId, setRef }, ref) => (
    <div ref={setRef ? setRef(blockId) : ref}>
      <Alert variant="warning" className="mb-5">
        <CircleAlertIcon className="w-5 h-5 text-white flex-shrink-0" />
        <AlertTitle className="text-white font-bold">
          {data.summary.warning}
        </AlertTitle>
      </Alert>
    </div>
  )
);

export const DietaryConsumptionHeaderBlock = forwardRef<
  HTMLDivElement,
  BlockProps
>(({ blockId, setRef }, ref) => {
  const headers = ["Food Group", "Reported Intake", "Note"];
  return (
    <div ref={setRef ? setRef(blockId) : ref}>
      <TableHeader>
        {headers.map((header, index) => (
          <TableHeaderCell key={index}>{header}</TableHeaderCell>
        ))}
      </TableHeader>
    </div>
  );
});

export const DietaryConsumptionRow = forwardRef<HTMLDivElement, BlockProps>(
  ({ index, section: entry, blockId, setRef }, ref) => {
    const { group, intake, note } = entry;
    const isOdd = index ? index % 2 !== 0 : false;

    return (
      <div ref={setRef ? setRef(blockId) : ref}>
        <TableRow alternate={isOdd}>
          {/* Food Group */}
          <TableCell>
            <p className="font-medium">{group}</p>
          </TableCell>

          {/* Intake */}
          <TableCell>
            <p>{intake}</p>
          </TableCell>

          {/* Note */}
          <TableCell>
            <p>{note}</p>
          </TableCell>
        </TableRow>
      </div>
    );
  }
);

export const DeficienciesHeader = forwardRef<HTMLDivElement, BlockProps>(
  ({ blockId, setRef }, ref) => (
    <div ref={setRef ? setRef(blockId) : ref}>
      <TableHeader>
        <TableHeaderCell>Nutrient</TableHeaderCell>
        <TableHeaderCell>Your Result</TableHeaderCell>
      </TableHeader>
    </div>
  )
);

export const DeficienciesRow = forwardRef<HTMLDivElement, BlockProps>(
  ({ index, section: deficiency, blockId, setRef }, ref) => {
    const {
      nutrient,
      nutrient_sub,
      normal_range,
      result: { severity, desc, reading },
    } = deficiency;
    const isOdd = index ? index % 2 !== 0 : false;

    const severityClassMap = {
      "very high": "text-danger",
      high: "text-warning",
      normal: "text-success",
      low: "text-warning",
      "very low": "text-danger",
    };
    const severityTextClass =
      severityClassMap[
        severity.toLowerCase() as keyof typeof severityClassMap
      ] || "text-gray-800";

    return (
      <div ref={setRef ? setRef(blockId) : ref}>
        <TableRow alternate={isOdd}>
          {/* Food Group */}
          <TableCell>
            <div className="font-semibold text-medium">{nutrient}</div>
            {nutrient_sub && (
              <div className="text-sm font-light">{nutrient_sub}</div>
            )}
          </TableCell>

          {/* Frequency */}
          <TableCell>
            <div className="flex items-center gap-1">
              <p className="text-sm font-medium text-muted-foreground mr-0.5">
                Currently
              </p>
              <div className="flex items-center">
                <Badge
                  variant="outline"
                  className={`flex items-center text-medium font-semibold p-1 rounded justify-center bg-accent border-r-0 rounded-tr-none rounded-br-none ${severityTextClass}`}
                >
                  {severity
                    .toLowerCase()
                    .replace(/\b\w/g, (char: any) => char.toUpperCase())}
                </Badge>
                {desc && (
                  <Badge
                    variant="outline"
                    className="flex items-center text-medium font-semibold p-1 border-r-0 bg-accent rounded-none justify-center"
                  >
                    {desc}
                  </Badge>
                )}
                {reading && (
                  <Badge
                    variant="outline"
                    className="flex items-center text-medium font-semibold p-1 rounded justify-center bg-accent rounded-tl-none rounded-bl-none"
                  >
                    {reading}
                  </Badge>
                )}
              </div>
            </div>
            {normal_range && (
              <p className="text-xs text-muted-foreground mt-1">
                Normal Range: {normal_range}
              </p>
            )}
          </TableCell>
        </TableRow>
      </div>
    );
  }
);

export const BalancedNutritionTitleBlock = forwardRef<
  HTMLDivElement,
  BlockProps
>(({ data, blockId, setRef }, ref) => {
  return (
    <div ref={setRef ? setRef(blockId) : ref}>
      <h2 className="mb-4 mt-5">
        {data.recommendations.header || "Nutrition & Diet"}
      </h2>
    </div>
  );
});

export const BalancedNutritionIntroBlock = forwardRef<
  HTMLDivElement,
  BlockProps
>(({ data, blockId, setRef }, ref) => (
  <div ref={setRef ? setRef(blockId) : ref}>
    <h2 className="mb-4 mt-5">
      {data.recommendations.header || "Nutrition & Diet"}
    </h2>
    <p className="text-xs mb-2">{data.recommendations.header_intro || ""}</p>
  </div>
));

export const MindDietIntroBlock = forwardRef<HTMLDivElement, BlockProps>(
  ({ data, blockId, setRef }, ref) => (
    <div ref={setRef ? setRef(blockId) : ref}>
      <h3 className="mb-2">
        {data.mind_diet_title || "MIND Diet: Recommendations and Progress"}
      </h3>
      <p className="text-xs mb-5">
        {data.recommendations.mind_diet_intro || ""}
      </p>
    </div>
  )
);

export const RecommendationsHeaderBlock = forwardRef<
  HTMLDivElement,
  BlockProps
>(({ data, blockId, setRef }, ref) => (
  <div ref={setRef ? setRef(blockId) : ref} className="grid grid-cols-2 gap-4">
    <div className="bg-success flex flex-col justify-between">
      <div className="grid grid-cols-[22px_1fr] gap-x-3 p-3">
        <CircleCheckIcon
          strokeWidth={2.5}
          size={22}
          color="white"
          className=""
        />
        <p className="text-white font-bold leading-none">Recommended</p>
        <p className="text-white text-sm col-start-2">
          {data?.recommendations?.recommended_instructions}
        </p>
      </div>
      <TableHeader>
        {data?.recommendations?.recommended_diet?.headers?.map(
          (header: any, index: any) => (
            <TableHeaderCell
              key={index}
              className={`[&]:p-3 ${
                index === 0
                  ? "[&]:first:border-l-success border-l"
                  : "last:border-r [&]:last:border-r-success border-r"
              }`}
            >
              {header}
            </TableHeaderCell>
          )
        )}
      </TableHeader>
    </div>
    <div className="bg-danger flex flex-col justify-between">
      <div className="grid grid-cols-[22px_1fr] gap-x-3 p-3">
        <CircleXIcon strokeWidth={2.5} size={22} color="white" className="" />
        <p className="text-white font-bold leading-none">Not Recommended</p>
        <p className="text-white text-sm col-start-2">
          {data?.recommendations?.discouraged_instructions || ""}
        </p>
      </div>
      <TableHeader>
        {data?.recommendations?.discouraged_diet?.headers?.map(
          (header: any, index: any) => {
            return (
              <TableHeaderCell
                key={index}
                className={`[&]:p-3 ${
                  index === 0
                    ? "[&]:first:border-l-danger border-l-1"
                    : "last:border-r [&]:last:border-r-danger border-r-1"
                }`}
              >
                {header}
              </TableHeaderCell>
            );
          }
        )}
      </TableHeader>
    </div>
  </div>
));

export const RecommendationsRow = forwardRef<HTMLDivElement, BlockProps & { isRecommendedLastRow?: boolean, isDiscouragedLastRow?: boolean }>(
  ({ data: recommendation, blockId, positionInPage, setRef, isRecommendedLastRow, isDiscouragedLastRow }, ref) => {

    console.log("first", recommendation.discouraged?.foodGroup, isDiscouragedLastRow)
    return (
      <div
        ref={setRef ? setRef(blockId) : ref}
        className="grid grid-cols-2 gap-4 text-xs"
      >
        {recommendation.recommended.foodGroup && (
          <TableRow className={`border-l-0 border-r-0 ${positionInPage === "last" || isRecommendedLastRow ? "border-b-success" : ""}`}>
            <TableCell className="relative [&]:p-3 border-l border-l-success after:absolute after:bottom-[-1px] after:left-[-1px] after:w-[1px] after:h-[1px] after:bg-success">
              <p className="font-semibold">{recommendation.recommended.foodGroup}</p>
            </TableCell>
            <TableCell className="relative [&]:p-3 last:border-r border-r-success after:absolute after:bottom-[-1px] after:right-[-1px] after:w-[1px] after:h-[1px] after:bg-success">
              <p>{recommendation.recommended.frequency}</p>
            </TableCell>
          </TableRow>
        )}
        {recommendation.discouraged?.foodGroup && (
          <TableRow className={`border-l-0 border-r-0 ${positionInPage === "last" || isDiscouragedLastRow ? "border-b-danger" : ""}`}>
            <TableCell className="relative [&]:p-3 border-l border-l-danger after:absolute after:bottom-[-1px] after:left-[-1px] after:w-[1px] after:h-[1px] after:bg-danger">
              <p className="font-semibold">{recommendation.discouraged?.foodGroup}</p>
            </TableCell>
            <TableCell className="relative [&]:p-3 last:border-r border-r-danger after:absolute after:bottom-[-1px] after:right-[-1px] after:w-[1px] after:h-[1px] after:bg-danger">
              <p>{recommendation.discouraged?.frequency}</p>
            </TableCell>
          </TableRow>
        )}
      </div>
    );
  }
);
