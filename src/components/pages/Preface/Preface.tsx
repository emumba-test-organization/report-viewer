/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Brain, FileText, Apple, CheckCircle } from "lucide-react";
import A4Page from "../../shared/A4Page";

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
      <h2 className="text-4xl font-bold text-gray-900 mb-8">{data?.title}</h2>

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Purpose of This Report */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
            Purpose of This Report
          </h3>
          <div className="space-y-4 text-xs text-gray-700 leading-relaxed">
            {purposeParagraphs.map((p: any, i: any) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {/* About RestoreU Method */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
            About RestoreU Method
          </h3>
          <div className="space-y-4 text-xs text-gray-700 leading-relaxed">
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
                  <Brain className="w-8 h-8 text-gray-800" />
                  <p className="text-xs font-medium text-gray-900">
                    Cognitive Assessment
                  </p>
                </div>
                <div className="w-2 h-2 border-3 border-violet-900 rounded-full"></div>
                <div className="w-1 h-4 bg-violet-900"></div>

                <div className="flex items-center justify-center flex-col bg-gray-100 w-full py-4 px-6 text-center gap-1">
                  <FileText className="w-8 h-8 text-gray-800" />
                  <p className="text-xs font-medium text-gray-900">
                    Medications, Medical History and Lab Reports
                  </p>
                </div>
                <div className="w-2 h-2 border-3 border-violet-900 rounded-full"></div>
                <div className="w-1 h-4 bg-violet-900"></div>

                <div className="flex items-center justify-center flex-col bg-gray-100 w-full py-4 px-6 text-center gap-1">
                  <Apple strokeWidth={3} className="w-6 h-6 text-gray-800" />
                  <p className="text-xs font-medium text-gray-900">
                    Lifestyle and Habits
                  </p>
                </div>
                <div className="w-2 h-2 border-3 border-violet-900 rounded-full"></div>
                <div className="w-1 h-4 bg-violet-900"></div>

                <div className="flex items-center justify-center flex-col bg-violet-900 w-full py-4 px-6 text-center gap-1">
                  <CheckCircle strokeWidth={3} className="w-6 h-6 text-white" />
                  <p className="text-xs font-medium text-white px-3 py-1">
                    Your Personalized Report
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - What to Expect */}
          <div className="col-span-3">
            <h3 className="text-lg font-bold text-black mb-4 border-b-2 border-gray-300 pb-2">
              Reading This Report
            </h3>
            {reading.intro.map((p: any, i: any) => (
              <p key={i} className="text-xs text-gray-600 mb-4">
                {p}
              </p>
            ))}
            <div className="space-y-6">
              {reading.steps.map(({ title, description }: any, idx: any) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 border-2 border-violet-900 text-violet-900 rounded-full flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-2 leading-4">
                      {title}
                    </h4>
                    <p className="text-xs text-gray-600">{description}</p>
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
