/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Brain, FileText, Clock, CheckCircle } from "lucide-react";
import A4Page from "../../shared/A4Page";
import { useEffect, useRef } from "react";
import { usePdfLayout } from "@/utils/PdfLayoutHelper/PdfLayoutHook";

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
  const containerRef = useRef<HTMLElement>(null);
  const { analyzeLayout, overflowingElements, currentPageOccupied } =
    usePdfLayout();

  useEffect(() => {
    if (containerRef.current) {
      analyzeLayout(containerRef, 0);
    }
  }, []);

  return (
    <div
      className="w-[210mm] screen:mx-auto screen:p-6 bg-white break-inside-auto break"
      ref={containerRef}
    >
      {/* Preface Title */}
      <h2 className="text-3xl font-bold text-gray-900 mb-8 break-inside-avoid break-after-avoid">
        {data?.title}
      </h2>

      {/* Two Column Layout */}
      <div className="grid grid-cols-[1fr_1fr] grid-flow-col gap-8 mb-8 break-inside-auto">
        {/* Purpose of This Report */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2 break-inside-avoid break-before-column">
            Purpose of This Report
          </h3>
          <div className="space-y-4 text-xs text-gray-700 leading-relaxed break-inside-auto">
            {purposeParagraphs.map((p: any, i: any) => (
              <p key={i} /*  style={{marginBottom: 50}} */>{p}</p>
            ))}
          </div>
        </div>

        {/* About RestoreU Method */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2 break-inside-avoid break-before-column">
            About RestoreU Method
          </h3>
          <div className="space-y-4 text-xs text-gray-700 leading-relaxed break-inside-auto">
            {aboutParagraphs.map((p: any, i: any) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Reading This Report Section */}
      <div className="break-inside-auto grid grid-cols-[1fr_1.5fr] grid-flow-col gap-8">
        {/* Left Side - Process Flow */}
        {/* Process Steps */}
        <div className="break-inside-auto flex flex-col items-center">
          <div className="break-inside-avoid flex items-center justify-center flex-col bg-gray-100 w-full py-4">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
              <Brain className="w-8 h-8 text-gray-600" />
            </div>
            <div className="text-center">
              <p className="text-xs font-medium text-gray-900">
                Cognitive Assessment
              </p>
            </div>
          </div>

          <div className="break-inside-avoid w-px h-4 bg-gray-300"></div>

          <div className="break-inside-avoid flex items-center justify-center flex-col bg-gray-100 w-full py-4">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
              <FileText className="w-8 h-8 text-gray-600" />
            </div>
            <div className="text-center w-50">
              <p className="text-xs font-medium text-gray-900">
                Medications, Medical History and Lab Reports
              </p>
            </div>
          </div>
          <div className="break-inside-avoid w-px h-4 bg-gray-300"></div>
          <div className="break-inside-avoid flex items-center justify-center flex-col bg-gray-100 w-full py-4">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
              <Clock className="w-8 h-8 text-gray-600" />
            </div>
            <div className="text-center">
              <p className="text-xs font-medium text-gray-900">
                Lifestyle and Habits
              </p>
            </div>
          </div>
          <div className="break-inside-avoidw-px h-4 bg-gray-300"></div>
          <div className="break-inside-avoid flex items-center justify-center flex-col bg-purple-600 w-full py-4">
            <div className="flex items-center justify-center w-10 h-10 bg-purple-600 rounded-full">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div className="text-center">
              <p className="text-xs font-medium text-white bg-purple-600 px-3 py-1 rounded">
                Your Personalized Report
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - What to Expect */}
        <div className="col-span-3 break-inside-auto">
          <h3 className="break-inside-avoid text-lg font-bold text-black mb-4 border-b-2 border-black pb-2">
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
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
                  <p className="text-xs text-gray-600">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="break-after-page"></div>
    </div>
  );
};

export default Preface;
