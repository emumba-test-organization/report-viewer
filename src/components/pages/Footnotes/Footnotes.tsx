import A4Page from "@/components/shared/A4Page";
import type { FootnotesData } from "./types";

type Props = {
  data: FootnotesData;
};

const Footnotes = ({ data }: Props) => {
  return (
    <A4Page>
      <h1 className="mb-8">{data.heading || "Footnotes"}</h1>
      <ol className="font-semibold list-decimal space-y-2 text-sm mx-4">
        {data.footnotes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ol>
    </A4Page>
  );
};

export default Footnotes;
