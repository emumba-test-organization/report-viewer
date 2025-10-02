import { OverviewBlock, SummaryBlock, TitleBlock } from "./Intro.blocks";
import type { IntroData } from "./types";

type Props = {
  data: IntroData;
};

const Intro = ({ data }: Props) => {
  return (
    <div>
      <TitleBlock data={data} blockId="title" />
      <SummaryBlock data={data} blockId="summary" />
      <OverviewBlock data={data.overview} blockId="overview" />
    </div>
  );
};

export default Intro;
