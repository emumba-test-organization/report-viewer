/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Brain, FileText, Clock, CheckCircle } from "lucide-react";
import Header from "./shared/Header";

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
    <div className="w-[210mm] h-[297mm] mx-auto p-6 bg-white">
      <Header />

      {/* Preface Title */}
      <h2 className="text-3xl font-bold text-gray-900 mb-8">{data?.title}</h2>

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
            {/* <p>
              Given your blood test results, medical history, family history,
              and other relevant indicators, it is appropriate to initiate a
              targeted program to address the underlying factors contributing to
              cognitive impairment.
            </p>
            <p>
              Symptoms of cognitive impairment may include the inability to
              focus, make decisions, find words, or remember names, faces, or
              places of interest.
            </p> */}

            {/* Purple Statistics Box
            <div className="bg-purple-600 text-white p-4 rounded-lg my-6">
              <div className="flex items-start gap-3">
                <div className="text-2xl">✚</div>
                <div>
                  <p className="font-semibold">
                    40% of all adults over the age of 65 have some memory loss —
                    you are not alone.
                  </p>
                </div>
              </div>
            </div>

            <p>
              Thankfully, <strong>there is hope</strong> for those worried about
              memory changes. This personalized report offers insight into your
              current cognitive health and is tailored to your unique needs.
            </p> */}
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
                <div className="flex items-center justify-center flex-col bg-gray-100 w-full py-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                    <Brain className="w-8 h-8 text-gray-600" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-gray-900">
                      Cognitive Assessment
                    </p>
                  </div>
                </div>

                <div className="w-px h-4 bg-gray-300"></div>

                <div className="flex items-center justify-center flex-col bg-gray-100 w-full py-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                    <FileText className="w-8 h-8 text-gray-600" />
                  </div>
                  <div className="text-center w-50">
                    <p className="text-xs font-medium text-gray-900">
                      Medications, Medical History and Lab Reports
                    </p>
                  </div>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="flex items-center justify-center flex-col bg-gray-100 w-full py-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                    <Clock className="w-8 h-8 text-gray-600" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-gray-900">
                      Lifestyle and Habits
                    </p>
                  </div>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="flex items-center justify-center flex-col bg-purple-600 w-full py-4">
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
            </div>
          </div>

          {/* Right Side - What to Expect */}
          <div className="col-span-3">
            <h3 className="text-lg font-bold text-black mb-4 border-b-2 border-black pb-2">
              Reading This Report
            </h3>
            {reading.intro.map((p: any, i: any) => (
              <p key={i} className="text-xs text-gray-600 mb-4">
                {p}
              </p>
            ))}
            {/* <div className="mb-4">
              <p className="text-xs text-gray-600 font-medium">
                Let's get started on a path to lasting brain health!
              </p>
            </div> */}
            {/* <p className="text-xs text-gray-600 mb-4">
              As mentioned earlier, several medical factors—such as lab results,
              medical history, medications, diet, and lifestyle—can contribute
              to memory loss. This report is designed to help you understand and
              address those factors.
            </p> */}

            {/* <p className="text-xs text-gray-600 mb-4">
              Here's what you can expect:
            </p> */}

            {/* <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Overview of Risk Factors
                  </h4>
                  <p className="text-xs text-gray-600">
                    A summary of the factors currently in a healthy range, as
                    well as those outside the optimal range that may be
                    contributing to cognitive decline or memory issues.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Personalized Action Plan
                  </h4>
                  <p className="text-xs text-gray-600">
                    Practical, personalized steps you can take to reduce the
                    impact of these risk factors and support your brain health.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    In-Depth Insights
                  </h4>
                  <p className="text-xs text-gray-600">
                    For those who want more detailed information, an explanation
                    of how specific blood test results relate to cognitive
                    impairment and memory loss.
                  </p>
                </div>
              </div>
            </div> */}
            <div className="space-y-6">
              {reading.steps.map(({ title, description }: any, idx: any) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
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
    </div>
  );
};

export default Preface;
