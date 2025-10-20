import type { FootnotesData } from "./types";

type Props = {
  data: FootnotesData;
};

const Footnotes = ({ data }: Props) => {
  return (
    <div className="w-[210mm] h-[297mm] mx-auto p-6 bg-white">
      <h1 className="mb-8">{data.heading || "Footnotes"}</h1>
      <ol className="font-semibold list-decimal space-y-2 text-sm">
        {data.footnotes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ol>
    </div>
  );
};

export default Footnotes;
