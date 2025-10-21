import {
  CheckIcon,
  CircleCheckIcon,
  CircleXIcon,
  Grape,
  Hamburger,
  Weight,
  XIcon,
} from "lucide-react";
import type { DietaryRecommendationsData, ListItem } from "./types";
import {
  AppleIcon,
  AvocadoIcon,
  EggIcon,
  GrainIcon,
  LollipopIcon,
  StomachIcon,
  TeaLeafIcon,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import A4Page from "@/components/shared/A4Page";

type Props = {
  data: DietaryRecommendationsData;
};

const iconMap = {
  "good fats": <AvocadoIcon className="w-5 h-5 text-white" />,
  "bad fats": <Hamburger className="w-5 h-5 text-white" />,
  "vegetables and fruits": (
    <AppleIcon color="#fff" className="w-5 h-5 text-white" />
  ),
  "foods with low-glycemic load": (
    <LollipopIcon className="w-5 h-5 text-white" />
  ),
  "soluble fiber": <GrainIcon className="w-5 h-5 text-white" />,
  "lean protein": <EggIcon className="w-5 h-5 text-white" />,
  "prebiotics and probiotics": <StomachIcon className="w-5 h-5 text-white" />,
  cyp1a2: <TeaLeafIcon className="w-5 h-5 text-white" />,
  "targeting a body mass index (bmi) under 25": (
    <Weight className="w-5 h-5 text-white" />
  ),
};

const colorMap = {
  include: "success",
  avoid: "danger",
};

const tableIconMap = {
  include: (
    <CircleCheckIcon strokeWidth={2.5} size={22} color="white" className="" />
  ),
  avoid: <CircleXIcon strokeWidth={2.5} size={22} color="white" className="" />,
};

const DietaryRecommendationsModel = ({ data }: Props) => {
  const { heading, preface, models } = data;
  return (
    <A4Page>
      <h3 className="mb-4">{heading}</h3>
      {preface && preface.length > 0 && (
        <div className="mb-6">
          {preface.map((line, index) => (
            <p key={index} className="mb-4">
              {line}
            </p>
          ))}
        </div>
      )}
      <div className="space-y-6">
        {models.map((model, index) => (
          <div key={index} className="grid grid-cols-[1fr_1fr]  gap-x-2">
            {model.map((item, idx) => {
              const rowStart = item.type === "header"
                ? `row-start-1`
                : "row-start-2";
              const spanClass =
                item.span === "full"
                  ? "col-span-2"
                  : item.span === "left"
                  ? `${rowStart} col-start-1`
                  : item.span === "right"
                  ? `${rowStart} col-start-2`
                  : "col-span-1";

              let component: React.ReactNode = null;
              if (item.type === "header") {
                component = (
                  <HeaderBlock
                    key={idx}
                    heading={item.heading}
                    subHeading={item.subHeading}
                    preface={item.preface}
                    itemKey={item.key}
                  />
                );
              } else if (item.type === "list-section") {
                component = (
                  <ListSectionBlock
                    key={idx}
                    heading={item.heading}
                    inclusionType={item.inclusionType}
                    items={item.items}
                  />
                );
              } else if (item.type === "chips-section") {
                component = (
                  <ChipsSectionBlock
                    key={idx}
                    heading={item.heading}
                    inclusionType={item.inclusionType}
                    items={item.items}
                  />
                );
              } else if (item.type === "list") {
                component = <ListBlock key={idx} items={item.items} />;
              }
              return (
                <div key={idx} className={`${spanClass}`}>
                  {component}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </A4Page>
  );
};

export default DietaryRecommendationsModel;

type HeaderBlockProps = {
  heading?: string;
  subHeading?: string;
  preface?: string;
  itemKey: string;
};

const HeaderBlock = ({
  heading,
  subHeading,
  preface,
  itemKey,
}: HeaderBlockProps) => {
  return (
    <div className={`bg-box-gray py-4 px-6 pb-2`}>
      <div
        className={`flex gap-3 mb-3 ${
          subHeading || preface ? "items-start" : "items-center"
        }`}
      >
        <span
          className={`text-lg font-semibold rounded-full bg-info p-3 ${
            subHeading || preface ? "mt-[5px]" : ""
          }`}
        >
          {iconMap[itemKey.toLowerCase() as keyof typeof iconMap] || (
            <Grape className="w-5 h-5 text-white" />
          )}
        </span>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{heading || ""}</h3>
          <p className="text-sm font-semibold mb-2">{subHeading || ""}</p>
          <p className="text-sm font-normal">{preface || ""}</p>
        </div>
      </div>
    </div>
  );
};

type ListSectionBlockProps = {
  heading?: string;
  inclusionType?: string;
  items: (ListItem | string)[];
};

const ListSectionBlock = ({
  inclusionType,
  heading,
  items,
}: ListSectionBlockProps) => {
  return (
    <div
      className={`border-2 h-fit border-${
        colorMap[inclusionType as keyof typeof colorMap] || "border-border"
      }`}
    >
      <div
        className={`bg-${colorMap[inclusionType as keyof typeof colorMap]} p-1`}
      >
        <div className=" flex items-center gap-x-3 p-3">
          {tableIconMap[inclusionType as keyof typeof tableIconMap]}
          <p className="text-white font-bold leading-none">{heading}</p>
        </div>
      </div>
      <div className="overflow-hidden py-4 pl-8 pr-6">
        <ul className="list-disc space-y-2 text-sm">
          {/* Data Rows */}
          {items.map((row, idx) => {
            if (typeof row === "string") {
              return <li key={idx}>{row}</li>;
            }
            return (
              <li key={idx}>
                {row.label ? <b>{row.label}: </b> : null} {row.value}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

type ChipsSectionBlockProps = {
  heading?: string;
  inclusionType?: string;
  items: string[];
};

const ChipsSectionBlock = ({
  inclusionType,
  heading,
  items,
}: ChipsSectionBlockProps) => {
  return (
    <div
      className={`border-2 h-fit border-${
        colorMap[inclusionType as keyof typeof colorMap] || "border-border"
      }`}
    >
      <div
        className={`bg-${colorMap[inclusionType as keyof typeof colorMap]} p-1`}
      >
        <div className=" flex items-center gap-x-3 p-3">
          {tableIconMap[inclusionType as keyof typeof tableIconMap]}
          <p className="text-white font-bold leading-none">{heading}</p>
        </div>
      </div>
      <div className="overflow-hidden p-2">
        <div className="flex flex-wrap gap-1 text-sm">
          {/* Data Rows */}
          {items.map((item, idx) => {
            return (
              <Badge
                key={idx}
                variant="outline"
                className="flex items-center gap-1 text-xs p-1 rounded"
              >
                {inclusionType === "avoid" && (
                  <XIcon size={5} className={`shrink-0 w-5 h-5 text-danger`} />
                )}
                {inclusionType === "include" && (
                  <CheckIcon
                    strokeWidth={2.5}
                    className={`shrink-0 w-5 h-5 text-success`}
                  />
                )}
                {item}
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
};

type ListBlockProps = {
  items: string[] | string;
};

const ListBlock = ({ items }: ListBlockProps) => {
  if (typeof items === "string") {
    return (
      <div className="bg-box-gray">
        <div className="overflow-hidden px-6 pb-6 pt-0">
          <p className="text-sm">
            {/* Data Rows */}
            {items}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-box-gray">
      <div className="overflow-hidden px-10 pb-6 pt-0">
        <ul className="list-disc space-y-2 text-sm">
          {/* Data Rows */}
          {items.map((item, idx) => {
            return <li key={idx}>{item}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};
