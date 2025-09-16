import type { FootnotesData } from "./types";

type Props = {
  data: FootnotesData;
};

const Footnotes = ({ data }: Props) => {
  return (
    <div className="w-[210mm] h-[297mm] mx-auto p-6 bg-white">
      <h2 className="text-5xl font-bold mb-8">{data.heading || "Footnotes"}</h2>
      <ol className="font-semibold list-decimal space-y-2 text-sm text-gray-700">
        {data.footnotes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ol>
    </div>
  );
};

export default Footnotes;
