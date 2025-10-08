import { Fragment } from "react";
import { Badge } from "@/components/ui/badge";
import type { ImmuneScoreData } from "./types";
import {
  ChevronDown,
  ChevronsDown,
  ChevronsUp,
  ChevronUp,
  InfoIcon,
  TriangleAlert,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

type Props = {
  data: ImmuneScoreData;
};

const getRiskIcon = (risk: string) => {
  const lowArr = [
    "low",
    "none",
    "negative",
    "no",
    "below",
    "moderately low",
    "slightly low",
  ];
  const highArr = [
    "high",
    "elevated",
    "positive",
    "above",
    "slightly high",
    "moderately high",
  ];
  const veryHighArr = ["very high"];
  const veryLowArr = ["very low"];

  if (lowArr.some((term) => risk.toLowerCase() === term)) {
    return <ChevronDown className="text-red-500" />;
  } else if (highArr.some((term) => risk.toLowerCase() === term)) {
    return <ChevronUp className="text-green-500" />;
  } else if (veryHighArr.some((term) => risk.toLowerCase() === term)) {
    return <ChevronsUp className="text-2xl text-green-700" />;
  } else if (veryLowArr.some((term) => risk.toLowerCase() === term)) {
    return <ChevronsDown className="text-2xl text-red-700" />;
  }
  return null;
};

const ImmuneScore = ({ data }: Props) => {
  const {
    title,
    preface,
    score,
    headers,
    factors,
    postface,
    highValues,
    immunoactive_meds,
    immunoactive_conditions,
  } = data;
  return (
    <div className="size-full" data-name="Body">
      <div
        className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full"
        data-node-id="731:14851"
      >
        <h2 className="font-bold text-2xl border-b-2 border-gray-500 w-full pb-2">
          {title}
        </h2>
        <div className="font-normal w-full">
          <p className="">{preface}</p>
        </div>
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
          <div
            className="bg-[#aa1e31] box-border content-stretch flex gap-[16px] items-center overflow-clip p-[16px] relative shrink-0 w-full"
            data-node-id="731:14857"
          >
            <div className="content-stretch flex flex-col gap-[8px] h-[58px] items-center justify-center leading-[0] shrink-0 text-white">
              <div
                className="font-bold relative shrink-0 text-[35px]"
                data-node-id="731:14859"
              >
                <p className="leading-[25px]">{score.toString()}</p>
              </div>
            </div>
            <div className="flex flex-row items-center self-stretch">
              <div
                className="bg-white h-full shrink-0 w-[2px]"
                data-node-id="731:14861"
              />
            </div>
            <div
              className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start justify-center min-h-px min-w-px not-italic relative shrink-0 text-white"
              data-node-id="731:14862"
            >
              <div className="font-normal min-w-full" data-node-id="731:14864">
                <p className="leading-[25px] text-sm">{preface}</p>
              </div>
            </div>
          </div>
          <div className="relative shrink-0 w-full" data-node-id="731:14871">
            <div className="content-stretch flex flex-col isolate items-start overflow-clip relative w-full">
              <div
                className="grid grid-cols-[1fr_1fr_1fr] w-full z-[9]"
                data-node-id="731:14872"
              >
                {headers.map((header, index) => (
                  <div
                    key={index}
                    className={`bg-[#dfdfdf] p-[16px] relative`}
                    data-node-id="731:14873"
                  >
                    <div
                      aria-hidden="true"
                      className="absolute border-[#c8c8c8] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none"
                    />
                    <div
                      className="font-bold text-md text-nowrap"
                      data-node-id="731:14874"
                    >
                      <p className="leading-[25px] whitespace-pre">{header}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative w-full">
                {factors.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className={`relative grid grid-cols-[1fr_1fr_1fr] w-full z-[8] ${
                      rowIndex % 2 === 0 ? "bg-white" : "bg-neutral-100"
                    }`}
                    data-node-id="731:14879"
                  >
                    <div
                      aria-hidden="true"
                      className="absolute border-[#dfdfdf] border-[0px_0px_1px] border-solid bottom-0 left-0 pointer-events-none right-0 top-0"
                    />
                    <div
                      className="px-[16px] py-[8px] relative"
                      data-node-id="731:14880"
                    >
                      <div
                        aria-hidden="true"
                        className="absolute border-[#dfdfdf] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none"
                      />
                      <div className="" data-node-id="731:14883">
                        <p
                          className="leading-[25px]"
                          dangerouslySetInnerHTML={{ __html: row.factor }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-row items-center self-stretch basis">
                      <div
                        className="box-border content-stretch flex flex-col gap-[4px] h-full px-[16px] py-[8px] relative shrink-0 w-full"
                        data-node-id="731:14885"
                      >
                        <div
                          aria-hidden="true"
                          className="absolute border-[#dfdfdf] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none"
                        />
                        <div className="flex">
                          {row.severity && (
                            <Badge
                              variant={"outline"}
                              className={`rounded ${
                                row.score
                                  ? "border-r-0 rounded-tr-none rounded-br-none"
                                  : ""
                              }`}
                            >
                              {getRiskIcon(row.severity)}
                              {row.severity}
                            </Badge>
                          )}
                          <Badge
                            variant={"outline"}
                            className={`rounded ${
                              row.severity
                                ? "rounded-tl-none rounded-bl-none"
                                : ""
                            }`}
                          >
                            {row.score}
                          </Badge>
                          {/* <p className="leading-[25px]">{row.score} {row.severity}</p> */}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row items-center self-stretch basis">
                      <div
                        className="box-border content-stretch flex flex-col gap-[4px] h-full px-[16px] py-[8px] relative shrink-0 w-full"
                        data-node-id="731:14885"
                      >
                        <div
                          aria-hidden="true"
                          className="absolute border-[#dfdfdf] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none"
                        />
                        <p className="leading-[25px]">{row.target}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              aria-hidden="true"
              className="absolute border-[#aa1e31] border-[0px_2px_2px] border-solid inset-0 pointer-events-none"
            />
          </div>
          <div
            className="pl-[16px] pr-[24px] py-[16px] relative w-full"
            data-node-id="731:14865"
          >
            <div
              aria-hidden="true"
              className="absolute border-2 border-[#aa1e31] border-t-0 border-solid inset-0 pointer-events-none"
            />
            <div
              className="flex gap-[16px] items-start"
              data-node-id="731:14869"
            >
              <div
                className="box-border content-stretch flex gap-[10px] h-[39.959px] items-center overflow-clip pb-[3px] pt-[4px] px-[3px] relative shrink-0 w-[38.67px]"
                data-name="Frame"
                data-node-id="731:14866"
              >
                <div
                  className="aspect-[24/24] basis-0 grow min-h-px min-w-px overflow-clip relative shrink-0"
                  data-name="Frame"
                  data-node-id="731:14867"
                >
                  <div
                    className="absolute"
                    data-name="Vector"
                    data-node-id="731:14868"
                  >
                    <InfoIcon className="h-full w-full " />
                  </div>
                </div>
              </div>
              <div className="font-normal w-full" data-node-id="731:14870">
                <ul className="">
                  {postface.map((text, index) => (
                    <li
                      key={index}
                      className=""
                      dangerouslySetInnerHTML={{ __html: text }}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* High Values Section */}
      <div>
        <div className="grid grid-cols-[32px_1fr] bg-[#AA1E31] text-white p-2 mt-4">
          <TriangleAlert className="text-white m-2" />
          <p className="text-white m-2">
            Consider applying urgent attention to improvement of the
            contributors prioritized in the graph below.
          </p>
        </div>
        <div className="p-4 bg-neutral-100 w-full flex justify-center">
          <div className="grid grid-cols-[1fr_1fr] items-baseline gap-x-4 gap-1">
            {highValues.map((item, index) => (
              <Fragment key={index}>
                <div key={index} className="">
                  <p
                    className="font-semibold"
                    dangerouslySetInnerHTML={{ __html: item.factor }}
                  />
                </div>
                <div className="flex w-full">
                  <Progress
                    value={(100 / highValues.length) * (index + 1)}
                    max={100}
                    className="bg-transparent "
                  />
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Immunoactive Medications */}
      <div className="relative shrink-0 w-full mt-6" data-node-id="731:14871">
        <div className="content-stretch flex flex-col isolate items-start overflow-clip relative w-full">
          <div
            className="grid grid-cols-[1fr] w-full z-[9]"
            data-node-id="731:14872"
          >
            {immunoactive_meds.headers.map((header, index) => (
              <div
                key={index}
                className={`bg-neutral-200 p-[16px] relative border-neutral-300 border-[1px_1px_1px_0px] border-solid`}
                data-node-id="731:14873"
              >
                <div
                  className="font-bold text-md text-nowrap"
                  data-node-id="731:14874"
                >
                  <p
                    className="leading-[25px] whitespace-pre"
                    dangerouslySetInnerHTML={{ __html: header }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div
            className="relative grid grid-cols-[1fr_3fr] w-full z-[8]"
            data-node-id="731:14872"
          >
            {immunoactive_meds.data.map(({ name, conditions }, rowIndex) => (
              <Fragment key={rowIndex}>
                <div
                  className={`font-bold text-md text-nowrap p-[8px_16px] ${
                    rowIndex % 2 === 0 ? "bg-white" : "bg-neutral-50"
                  }`}
                  data-node-id="731:14874"
                >
                  <p className="leading-[25px] whitespace-pre">{name}</p>
                </div>
                <div
                  className={`relative w-full p-[8px_16px] ${
                    rowIndex % 2 === 0 ? "bg-white" : "bg-neutral-50"
                  }`}
                >
                  {conditions ? (
                    conditions.map((row, condIndex) => (
                      <div className="flex" key={condIndex}>
                        <Badge
                          variant="outline"
                          className="flex items-center text-xs p-0.5 rounded justify-center border-r-0 rounded-tr-none rounded-br-none"
                        >
                          Stage
                        </Badge>
                        <Badge
                          variant="outline"
                          className="flex items-center text-xs p-0.5 rounded justify-center rounded-tl-none rounded-bl-none"
                        >
                          {row}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <p>none found</p>
                  )}
                </div>
              </Fragment>
            ))}
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute border-gray-300 border-[0px_2px_2px] border-solid inset-0 pointer-events-none"
        />
      </div>

      {/* Immunoactive Conditions */}
      {/* Immunoactive Medications */}
      <div className="relative shrink-0 w-full mt-6" data-node-id="731:14871">
        <div className="content-stretch flex flex-col isolate items-start overflow-clip relative w-full">
          <div
            className="grid grid-cols-[1fr] w-full z-[9]"
            data-node-id="731:14872"
          >
            {immunoactive_conditions.headers.map((header, index) => (
              <div
                key={index}
                className={`bg-neutral-200 p-[16px] relative border-neutral-300 border-[1px_1px_1px_0px] border-solid`}
                data-node-id="731:14873"
              >
                <div
                  className="font-bold text-md text-nowrap"
                  data-node-id="731:14874"
                >
                  <p
                    className="leading-[25px] whitespace-pre"
                    dangerouslySetInnerHTML={{ __html: header }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div
            className="relative grid grid-cols-[1fr_3fr] w-full z-[8]"
            data-node-id="731:14872"
          >
            {immunoactive_conditions.data.map(({ name, conditions }, rowIndex) => (
              <Fragment key={rowIndex}>
                <div
                  className={`font-bold text-md text-nowrap p-[8px_16px] ${
                    rowIndex % 2 === 0 ? "bg-white" : "bg-neutral-50"
                  }`}
                  data-node-id="731:14874"
                >
                  <p className="leading-[25px] whitespace-pre">{name}</p>
                </div>
                <div
                  className={`flex gap-1 relative w-full p-[8px_16px] ${
                    rowIndex % 2 === 0 ? "bg-white" : "bg-neutral-50"
                  }`}
                >
                  {conditions ? (
                    conditions.map((row, condIndex) => (
                      <div className="" key={condIndex}>
                        <Badge
                          variant="outline"
                          className="flex items-center text-xs p-0.5 rounded justify-center"
                        >
                          {row}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <p>none found</p>
                  )}
                </div>
              </Fragment>
            ))}
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute border-gray-300 border-[0px_2px_2px] border-solid inset-0 pointer-events-none"
        />
      </div>
    </div>
  );
};

export default ImmuneScore;
