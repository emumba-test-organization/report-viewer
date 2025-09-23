import {
  createAllergiesBlocks,
  tableConfigs as allergiesTableConfig,
} from "../Allergies/Allergies";
import {
  tableConfigs as comorbiditiesTableConfig,
  createComorbiditiesBlocks,
} from "../Comorbidities/Comorbidities";
import {
  PaginationWrapper,
  type BlockConfig,
  type BlockRenderer,
} from "@/components/shared/PaginationWrapper";
import {
  ComorbiditiesDescriptionBlock,
  ComorbiditiesTableHeaderBlock,
  ComorbiditiesTableRowBlock,
  ComorbiditiesTitleBlock,
} from "../Comorbidities/Comorbidities.blocks";
import {
  AllergiesDescriptionBlock,
  AllergiesTableHeaderBlock,
  AllergiesTableRowBlock,
  AllergiesTitleBlock,
} from "../Allergies/Allergies.blocks";
import type { Report } from "@/ParticipantReport";

type Props = {
  data: Report;
};

/* disable-eslint */
const createBlocks = (data: Report): BlockConfig[] => {
  const allergiesBlocks = createAllergiesBlocks(data.allergies);
  const comorbiditiesBlocks = createComorbiditiesBlocks(data.reportedProblems);
  return [
    {
      id: "knownMedicalConditionsTitle",
      type: "knownMedicalConditionsTitle",
      data: "Known Medical Conditions",
    },
    ...comorbiditiesBlocks,
    ...allergiesBlocks,
  ];
};

/* disable-eslint */
export const renderBlock: BlockRenderer = (block, key, index) => {
  const commonProps = {
    key,
    blockId: block.id,
    // Don't pass setRef here - it's handled by the wrapper
  };

  switch (block.type) {
    case "knownMedicalConditionsTitle":
      return (
        <h2 className="text-4xl font-bold mb-8" {...commonProps}>
          Known Medical Conditions
        </h2>
      );
    case "comorbiditiesTitle":
      return <ComorbiditiesTitleBlock {...commonProps} data={block.data} />;
    case "comorbiditiesDescription":
      return (
        <ComorbiditiesDescriptionBlock {...commonProps} data={block.data} />
      );
    case "comorbidities-header":
      return (
        <ComorbiditiesTableHeaderBlock data={block.data} {...commonProps} />
      );
    case "comorbidities-row":
      return (
        <ComorbiditiesTableRowBlock
          index={index}
          data={block.data}
          {...commonProps}
        />
      );
    case "allergiesTitle":
      return <AllergiesTitleBlock {...commonProps} data={block.data} />;
    case "allergiesDescription":
      return <AllergiesDescriptionBlock {...commonProps} data={block.data} />;
    case "allergies-header":
      return <AllergiesTableHeaderBlock data={block.data} {...commonProps} />;
    case "allergies-row":
      return (
        <AllergiesTableRowBlock
          index={index}
          data={block.data}
          {...commonProps}
        />
      );
    default:
      return null;
  }
};

const KnownMedicalConditions = ({ data }: Props) => {
  const blocks = () => createBlocks(data);
  const tableConfigs = [...comorbiditiesTableConfig, ...allergiesTableConfig];

  return (
    <PaginationWrapper
      data={data}
      createBlocks={blocks}
      renderBlock={renderBlock}
      tables={tableConfigs}
    />
  );
};

export default KnownMedicalConditions;
