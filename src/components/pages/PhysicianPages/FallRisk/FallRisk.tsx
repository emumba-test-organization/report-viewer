import type { FallRiskData } from "./types";

type Props = {
  data: FallRiskData;
};

const FallRisk = ({ data }: Props) => {
  const { heading, preface, headers, columnTypes, medications, totalScore } = data;

  return (
    <div className="size-full" data-name="Body">
      <div
        className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full"
        data-node-id="731:14851"
      >
        <h2 className="font-bold text-2xl border-b-2 border-gray-500 w-full pb-2">
          {heading}
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
                className="font-bold relative shrink-0 text-[35px] w-[45px]"
                data-node-id="731:14859"
              >
                <p className="leading-[25px]">
                  {totalScore.toString().padStart(2, "0")}
                </p>
              </div>
              <div
                className="font-normal relative shrink-0 text-md text-nowrap"
                data-node-id="731:14860"
              >
                <p className="leading-[25px] whitespace-pre">SCORE</p>
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
                className="grid grid-cols-[1fr_1fr] w-full z-[9]"
                data-node-id="731:14872"
              >
                {headers.map((header, index) => (
                  <div
                    key={index}
                    className={`bg-[#dfdfdf] p-[16px] relative ${columnTypes[index] === "numeric" ? "flex justify-center" : ""}`}
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
                {medications.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className={`relative grid grid-cols-[1fr_1fr] w-full z-[8] ${
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
                        <p className="leading-[25px]">{row.name}</p>
                        <p className="leading-[25px] text-neutral-500 text-sm">
                          {row.dosage}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row items-center self-stretch basis">
                      <div
                        className="box-border content-stretch flex flex-col gap-[4px] h-full items-center px-[16px] py-[8px] relative shrink-0 w-full"
                        data-node-id="731:14885"
                      >
                        <div
                          aria-hidden="true"
                          className="absolute border-[#dfdfdf] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none"
                        />
                        <p className="leading-[25px]">{row.score}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  className={`relative grid grid-cols-[1fr_1fr] w-full z-[8] bg-[#AA1E311A] border-t-2 border-[#AA1E31] border-solid`}
                  data-node-id="731:14879"
                >
                  <div
                    className="px-[16px] py-[8px] relative font-bold border-r-1 border-[#D8D8D8] border-solid"
                    data-node-id="731:14880"
                  >
                    Total Fall-Risk Score:
                  </div>
                  <div
                    className="px-[16px] py-[8px] font-bold flex justify-center border-r-1 border-[#D8D8D8] border-solid"
                    data-node-id="731:14880"
                  >
                    {totalScore}
                  </div>
                </div>
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

export default FallRisk;
