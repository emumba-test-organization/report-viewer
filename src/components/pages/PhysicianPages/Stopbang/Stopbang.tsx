import { InfoIcon } from "lucide-react";
import type { StopBangRiskData } from "./types";

type Props = {
  data: StopBangRiskData;
};

const Stopbang = ({ data }: Props) => {
  const {
    title,
    preface,
    postface,
    calculated_score,
    risk_level,
    headers,
    table,
  } = data;
  return (
    <div className="size-full" data-name="Body">
      <div
        className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full"
        data-node-id="731:14851"
      >
        <h2 className="font-bold text-2xl">{title}</h2>
        <div className="font-normal w-full">
          <p className="">{preface.definition}</p>
        </div>
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
          <div
            className="bg-[#aa1e31] box-border content-stretch flex gap-[16px] items-center overflow-clip p-[16px] relative shrink-0 w-full"
            data-node-id="731:14857"
          >
            <div className="content-stretch flex flex-col gap-[8px] h-[58px] items-center justify-center leading-[0] shrink-0 text-white">
              <div
                className="font-bold relative shrink-0 text-[35px] w-[45px]"
                data-node-id="731:14859"
              >
                <p className="leading-[25px]">
                  {calculated_score.toString().padStart(2, "0")}
                </p>
              </div>
              <div
                className="font-normal relative shrink-0 text-md text-nowrap"
                data-node-id="731:14860"
              >
                <p className="leading-[25px] whitespace-pre">STOP-BANG SCORE</p>
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
              <div
                className="font-['Inter:Bold',_sans-serif] font-bold relative shrink-0 text-[22px] text-nowrap"
                data-node-id="731:14863"
              >
                <p className="leading-[25px] whitespace-pre">
                  {risk_level} Risk
                </p>
              </div>
              <div className="font-normal min-w-full" data-node-id="731:14864">
                <p className="leading-[25px] text-sm">{postface}</p>
              </div>
            </div>
          </div>
          <div
            className="flex gap-[16px] items-start pl-[16px] pr-[24px] py-[16px] relative w-full"
            data-node-id="731:14865"
          >
            <div
              aria-hidden="true"
              className="absolute border-2 border-[#aa1e31] border-solid inset-0 pointer-events-none"
            />
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
            <div className="" data-node-id="731:14869">
              <div className="font-normal w-full" data-node-id="731:14870">
                <p className="mb-0">{preface.risk_intro}</p>
                <ul className="css-ed5n1g list-disc">
                  {Object.entries(preface.risk_rules).map(([key, value]) => (
                    <li
                      key={key}
                      className="leading-[20px] mb-0 text-[16px] tracking-[0.32px]"
                    >
                      <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold not-italic">
                        {key}:
                      </span>
                      <span>{` ${value}`}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="relative shrink-0 w-full" data-node-id="731:14871">
            <div className="content-stretch flex flex-col isolate items-start overflow-clip relative w-full">
              <div
                className="grid grid-cols-[1fr_90px_1fr] w-full z-[9]"
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
              <div className="relative">
                {table.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className={`relative grid grid-cols-[1fr_90px_1fr] w-full z-[8] ${
                      rowIndex % 2 === 0 ? "bg-white" : "bg-neutral-100"
                    }`}
                    data-node-id="731:14879"
                  >
                    <div
                      aria-hidden="true"
                      className="absolute border-[#dfdfdf] border-[0px_0px_1px] border-solid bottom-0 left-0 pointer-events-none right-0 top-0"
                    />
                    <div
                      className="grid grid-cols-[40px_auto] px-[16px] py-[8px] relative"
                      data-node-id="731:14880"
                    >
                      <div
                        aria-hidden="true"
                        className="absolute border-[#dfdfdf] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none"
                      />
                      <div
                        className="flex gap-[10px] h-full items-start justify-center pb-0 pt-[16px] px-0 pr-[16px] relative w-[40px]"
                        data-node-id="731:14881"
                      >
                        <div
                          aria-hidden="true"
                          className="absolute border-[#dfdfdf] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none"
                        />
                        <p className="text-lg font-semibold">{row.code}</p>
                      </div>
                      <div className="p-[16px]" data-node-id="731:14883">
                        <p className="leading-[25px]">
                          {row.question}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row items-center self-stretch basis">
                      <div
                        className="box-border content-stretch flex flex-col gap-[4px] h-full items-center justify-center px-[16px] py-[8px] relative shrink-0 w-full"
                        data-node-id="731:14885"
                      >
                        <div
                          aria-hidden="true"
                          className="absolute border-[#dfdfdf] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none"
                        />
                        <p className="leading-[25px] font-semibold">
                          {row.answer}
                        </p>
                      </div>
                    </div>
                    <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
                      <div
                        className="flex grow h-full items-start px-[16px] py-[8px] relative"
                        data-node-id="731:14887"
                      >
                        <div
                          aria-hidden="true"
                          className="absolute border-[#dfdfdf] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none"
                        />

                        <p className="font-normal">{row.explanation}</p>
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
        </div>
      </div>
    </div>
  );
};

export default Stopbang;
