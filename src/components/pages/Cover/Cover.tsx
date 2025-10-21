import A4Page from "@/components/shared/A4Page";
import { useReport } from "@/context";

const Cover = () => {
  const { report } = useReport();

  if (!report) {
    return <p>Loading report…</p>;
  }
  return (
    <A4Page>
      <h3 className="text-4xl font-normal">RestoreU Method</h3>
      <h1 className="text-6xl font-bold my-4">
        {report?.header.reportFor} Report
      </h1>
      <p className="text-4xl mb-8">
        for <span className="font-bold underline">{report?.header.name}</span>
      </p>
      <div className="grid grid-cols-3 gap-1.5 mb-8">
        <img
          src="/Stress Relief.png"
          alt="Cover Illustration"
          className="w-full h-auto grayscale rounded-sm"
        />
        <img
          src="/sudoku-puzzle.jpg"
          alt="Cover Illustration"
          className="w-full h-auto grayscale rounded-sm"
        />
        <img
          src="/biracial-woman.jpg"
          alt="Cover Illustration"
          className="w-full h-auto grayscale rounded-sm"
        />
        <img
          src="/nominated-already.jpg"
          alt="Cover Illustration"
          className="w-full h-auto grayscale rounded-sm"
        />
        <img
          src="/Restful Sleep.png"
          alt="Cover Illustration"
          className="w-full h-auto grayscale rounded-sm"
        />
        <img
          src="/Overnight Fasting.png"
          alt="Cover Illustration"
          className="w-full h-auto grayscale rounded-sm"
        />
      </div>
      <div className="flex gap-1.5 justify-between">
        <div>
            <p className="text-sm">Doctor:</p>
            <p className="text-sm font-bold">{report?.header.doctor}</p>
        </div>
        <div>
            <p className="text-sm">Clinic:</p>
            <p className="text-sm font-bold">{report?.header.clinic}</p>
        </div>
        <div>
            <p className="text-sm">Created:</p>
            <p className="text-sm font-bold">{report?.header.createdOn}</p>
        </div>
      </div>
      <p className="mt-6">{report?.header.coverText}</p>
    </A4Page>
  );
};

export default Cover;
