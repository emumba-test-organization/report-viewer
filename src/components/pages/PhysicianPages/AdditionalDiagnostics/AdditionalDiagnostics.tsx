import { Badge } from "@/components/ui/badge";
import type { AdditionalDiagnosticsData } from "./types";
import { MoveDown, MoveUp } from "lucide-react";

type Props = {
  data: AdditionalDiagnosticsData;
};

const getRiskIcon = (risk: string) => {
  const lowArr = ["low", "none", "negative", "no", "below"];
  const highArr = ["high", "elevated", "positive", "severe", "critical", "above"];

  if (lowArr.some((term) => risk.toLowerCase().includes(term))) {
    return <MoveDown className="text-red-500" />;
  } else if (highArr.some((term) => risk.toLowerCase().includes(term))) {
    return <MoveUp className="text-green-500" />;
  }
  return null;
};

const AdditionalDiagnostics = ({ data }: Props) => {
  const { heading, segments, headers } = data;

  return (
    <div>
      <h2 className="font-bold text-3xl w-full mb-6">{heading}</h2>
      <div className="relative shrink-0 w-full" data-node-id="731:14871">
        <div className="content-stretch flex flex-col isolate items-start overflow-clip relative w-full">
          <div
            className="grid grid-cols-[1fr_1fr] w-full z-[9]"
            data-node-id="731:14872"
          >
            {headers.map((header, index) => (
              <div
                key={index}
                className={`bg-neutral-200 p-[16px] relative border-neutral-300 border-[1px_1px_1px_0px] border-solid`}
                data-node-id="731:14873"
              >
                <div
                  className="font-bold text-md text-nowrap"
                  data-node-id="731:14874"
                >
                  <p className="leading-[25px] whitespace-pre">{header}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full z-[9]" data-node-id="731:14872">
            {Object.entries(segments).map(([header, tests], index) => (
              <div
                key={index}
                className={`bg-neutral-200 relative w-full`}
                data-node-id="731:14873"
              >
                <div
                  aria-hidden="true"
                  className="absolute border-neutral-300 border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none"
                />
                <div
                  className="font-bold text-md text-nowrap p-[8px_16px]"
                  data-node-id="731:14874"
                >
                  <p className="leading-[25px] whitespace-pre">{header}</p>
                </div>
                <div className="relative w-full">
                  {tests.map((row, rowIndex) => (
                    <div
                      key={rowIndex}
                      className={`relative grid grid-cols-[1fr_1fr] w-full z-[8] ${
                        rowIndex % 2 === 0 ? "bg-white" : "bg-neutral-50"
                      }`}
                      data-node-id="731:14879"
                    >
                      <div
                        aria-hidden="true"
                        className="absolute border-neutral-300 border-[0px_0px_1px] border-solid bottom-0 left-0 pointer-events-none right-0 top-0"
                      />
                      <div
                        className="px-[16px] py-[8px] relative"
                        data-node-id="731:14880"
                      >
                        <div
                          aria-hidden="true"
                          className="absolute border-gray-300 border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none"
                        />
                        <div className="" data-node-id="731:14883">
                          <p className="leading-[25px]">{row.test}</p>
                        </div>
                      </div>
                      <div className="flex flex-row items-center self-stretch basis">
                        <div
                          className="box-border content-stretch flex flex-col gap-[4px] px-[16px] py-[8px] w-full"
                          data-node-id="731:14885"
                        >
                          <div
                            aria-hidden="true"
                            className="absolute border-gray-300 border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none"
                          />
                          <p className="leading-[25px]">{row.explanation}</p>
                          <div className="w-full flex gap-1.5">
                            {row.tokens.map((token, tokenIndex) => {
                              if (token.stage && !token.value) {
                                return (
                                  <div className="flex" key={tokenIndex}>
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
                                      {token.stage}
                                    </Badge>
                                  </div>
                                );
                              }
                              if (token.value) {
                                return (
                                  <div className="flex" key={tokenIndex}>
                                    {/* {token.risk} */}
                                    <Badge
                                      variant="outline"
                                      className="flex items-center text-xs p-0.5 rounded justify-center border-r-0 rounded-tr-none rounded-br-none"
                                    >
                                      {token.risk && getRiskIcon(token.risk)}
                                      {token.name}
                                    </Badge>
                                    {token.value && (
                                      <Badge
                                        variant="outline"
                                        className="flex items-center text-xs p-0.5 rounded justify-center rounded-tl-none rounded-bl-none"
                                      >
                                        {token.value}
                                        {token.unit || ""}
                                      </Badge>
                                    )}
                                  </div>
                                );
                              }
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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

export default AdditionalDiagnostics;
