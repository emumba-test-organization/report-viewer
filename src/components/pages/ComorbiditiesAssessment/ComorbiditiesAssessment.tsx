import {
  PaginationWrapper,
  type BlockConfig,
  type BlockRenderer,
  type TableConfig,
} from "@/components/shared/PaginationWrapper";
import {
  ComorbiditiesTableHeaderBlock,
  ComorbiditiesTableRowBlock,
  CurrentComorboditiesTitle,
  InferredComorbiditiesTableHeaderBlock,
  InferredComorbiditiesTableRowBlock,
  InferredComorboditiesIntro,
  IntroBlock,
  MainTitleBlock,
  ReportedComorbiditiesTableHeaderBlock,
  ReportedComorbiditiesTableRowBlock,
  ReportedComorboditiesTitle,
  SectionBlock,
} from "./ComorbiditiesAssessmentBlocks";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ComorbiditiesAssessment = ({ data }: { data: any }) => {
  console.log("ComorbiditiesAssessment data:", data);
  const createHealthBlocks = (data: any): BlockConfig[] => [
    { id: "mainTitle", type: "mainTitle", data: data.medicalIssues },
    { id: "intro", type: "intro", data: data.medicalIssues },
    ...(data.medicalIssues.issues || []).map((section: any, index: number) => ({
      id: `health-section-${index}`,
      type: "issues-section",
      data: section,
    })),
    {
      id: "currentComorboditiesTitle",
      type: "currentComorboditiesTitle",
      data: data.comorbidities,
    },
    {
      id: "currentComorbiditiesHeader",
      type: "current-comorbidities-header",
    },
    ...data.comorbidities.comorbidities.map((section: any, index: number) => ({
      index,
      id: `current-comorbidities-row-${index}`,
      type: "current-comorbidities-row",
      data: section,
    })),
    {
      id: "reportedComorboditiesTitle",
      type: "reportedComorboditiesTitle",
      data: data.reportedAndInferredComorbidities,
    },
    {
      id: "reportedComorbiditiesHeader",
      type: "reported-comorbidities-header",
    },
    ...data.reportedAndInferredComorbidities.reported_comorbidities.reported_comorbidities_data.map(
      (section: any, index: number) => ({
        index,
        id: `reported-comorbidities-row-${index}`,
        type: "reported-comorbidities-row",
        data: section,
      })
    ),
    {
      id: "inferredComorboditiesIntro",
      type: "inferredComorboditiesIntro",
      data: data.reportedAndInferredComorbidities,
    },
    {
      id: "inferredComorbiditiesHeader",
      type: "inferred-comorbidities-header",
    },
    ...data.reportedAndInferredComorbidities.inferred_comorbidities.inferred_comorbidities_data.map(
      (section: any, index: number) => ({
        index,
        id: `inferred-comorbidities-row-${index}`,
        type: "inferred-comorbidities-row",
        data: section,
      })
    ),
  ];

  const renderHealthBlock: BlockRenderer = (block, key, index) => {
    const commonProps = {
      key,
      blockId: block.id,
      // Don't pass setRef here - it's handled by the wrapper
    };

    switch (block.type) {
      case "mainTitle":
        return <MainTitleBlock {...commonProps} data={block.data} />;
      case "intro":
        return <IntroBlock {...commonProps} data={block.data} />;
      case "issues-section":
        return <SectionBlock data={block.data} {...commonProps} />;
      case "currentComorboditiesTitle":
        return <CurrentComorboditiesTitle {...commonProps} data={block.data} />;
      case "current-comorbidities-header":
        return (
          <ComorbiditiesTableHeaderBlock data={undefined} {...commonProps} />
        );
      case "current-comorbidities-row":
        return (
          <ComorbiditiesTableRowBlock
            index={index}
            data={block.data}
            {...commonProps}
          />
        );
      case "reportedComorboditiesTitle":
        return (
          <ReportedComorboditiesTitle data={block.data} {...commonProps} />
        );
      case "reported-comorbidities-header":
        return (
          <ReportedComorbiditiesTableHeaderBlock
            data={undefined}
            {...commonProps}
          />
        );
      case "reported-comorbidities-row":
        return (
          <ReportedComorbiditiesTableRowBlock
            index={index}
            data={block.data}
            {...commonProps}
          />
        );
      case "inferredComorboditiesIntro":
        return (
          <InferredComorboditiesIntro data={block.data} {...commonProps} />
        );
      case "inferred-comorbidities-header":
        return (
          <InferredComorbiditiesTableHeaderBlock
            data={undefined}
            {...commonProps}
          />
        );
      case "inferred-comorbidities-row":
        return (
          <InferredComorbiditiesTableRowBlock
            index={index}
            data={block.data}
            {...commonProps}
          />
        );
      default:
        return null;
    }
  };

  const tableConfigs: TableConfig[] = [
    {
      headerType: "current-comorbidities-header",
      rowTypes: ["current-comorbidities-row"],
      headerId: "currentComorbiditiesHeader",
    },
    {
      headerType: "reported-comorbidities-header",
      rowTypes: ["reported-comorbidities-row"],
      headerId: "reportedComorbiditiesHeader",
    },
    {
      headerType: "inferred-comorbidities-header",
      rowTypes: ["inferred-comorbidities-row"],
      headerId: "inferredComorbiditiesHeader",
    },
  ];

  return (
    <PaginationWrapper
      data={data}
      createBlocks={createHealthBlocks}
      renderBlock={renderHealthBlock}
      tables={tableConfigs}
    />
  );
};

export default ComorbiditiesAssessment;
