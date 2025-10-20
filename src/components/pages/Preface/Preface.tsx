/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import A4Page from "../../shared/A4Page";
import {
  AppleIcon,
  BrainIcon,
  CircledCheckIcon,
  ClipboardHeartIcon,
} from "@/components/icons";

export type PrefaceData = {
  title: string;
  purposeParagraphs: string[];
  aboutParagraphs: string[];
  reading: {
    intro: string[];
    steps: { title: string; description: string }[];
  };
};

const Preface = ({ data }: { data: PrefaceData }) => {
  const { purposeParagraphs, aboutParagraphs, reading } = data;
  return (
    <A4Page>
      {/* Preface Title */}
      <h1 className="mb-6">{data?.title}</h1>

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Purpose of This Report */}
        <div>
          <h2 className="mb-4">Purpose of This Report</h2>
          <div className="space-y-4 text-xs leading-relaxed">
            {purposeParagraphs.map((p: any, i: any) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {/* About RestoreU Method */}
        <div>
          <h2 className="text-lg font-semibold mb-4 border-b-2 border-heading-underline pb-1">
            About RestoreU Method
          </h2>
          <div className="space-y-4 text-xs leading-relaxed">
            {aboutParagraphs.map((p: any, i: any) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Reading This Report Section */}
      <div>
        <div className="grid grid-cols-5 gap-8">
          {/* Left Side - Process Flow */}
          <div className="col-span-2">
            <div className="space-y-6">
              {/* Process Steps */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center flex-col bg-gray-100 w-full py-4 px-6 text-center gap-1">
                  <BrainIcon />
                  <p className="text-xs font-medium">
                    Cognitive Assessment
                  </p>
                </div>
                <div className="w-2.5 h-2.5 border-2 border-info rounded-full"></div>
                <div className="w-1 h-5 bg-info bg-gradient-to-b from-white to-info"></div>

                <div className="flex items-center justify-center flex-col bg-gray-100 w-full py-4 px-6 text-center gap-1">
                  <ClipboardHeartIcon />
                  <p className="text-xs font-medium">
                    Medications, Medical History and Lab Reports
                  </p>
                </div>
                <div className="w-2.5 h-2.5 border-2 border-info rounded-full"></div>
                <div className="w-1 h-5 bg-info bg-gradient-to-b from-white to-info"></div>

                <div className="flex items-center justify-center flex-col bg-gray-100 w-full py-4 px-6 text-center gap-1">
                  {/* <Apple strokeWidth={3} className="w-6 h-6 text-gray-800" /> */}
                  <AppleIcon />
                  <p className="text-xs font-medium">
                    Lifestyle and Habits
                  </p>
                </div>
                <div className="w-2.5 h-2.5 border-2 border-info rounded-full"></div>
                <div className="w-1 h-5 bg-info bg-gradient-to-b from-white to-info"></div>

                <div className="flex items-center justify-center flex-col bg-info w-full py-4 px-6 text-center gap-1">
                  <CircledCheckIcon />
                  <p className="text-xs font-medium text-white px-3 py-1">
                    Your Personalized Report
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - What to Expect */}
          <div className="col-span-3">
            <h2 className="mb-4">Reading This Report</h2>
            {reading.intro.map((p: any, i: any) => (
              <p key={i} className="text-xs mb-4">
                {p}
              </p>
            ))}
            <div className="space-y-6">
              {reading.steps.map(({ title, description }: any, idx: any) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 border border-info text-info rounded-full flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-2 leading-4">
                      {title}
                    </h4>
                    <p className="text-xs">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </A4Page>
  );
};

export default Preface;
