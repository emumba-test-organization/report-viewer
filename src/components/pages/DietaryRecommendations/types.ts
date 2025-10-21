export type DietaryRecommendationsData = {
  heading: string;
  preface?: string[];
  items: Array<{
    title: string;
    description: string;
    inclusionType: string;
    table: TableRow[];
  }>;
  models: DietaryRecommendationsModel
};

type TableRow = {
  label: string;
  value: string;
  inclusionType: string;
};

type SpanType = "full" | "left" | "right";
type InclusionType = "include" | "avoid";

interface HeaderSection {
  type: "header";
  key: string;
  span?: SpanType;
  heading: string;
  subHeading?: string;
  preface?: string;
}

export interface ListItem {
  label?: string | null;
  value?: string;
  inclusionType?: InclusionType;
}

interface ListSection {
  type: "list-section";
  span?: SpanType;
  inclusionType?: InclusionType;
  heading?: string;
  items: (ListItem | string)[];
}

interface ChipsSection {
  type: "chips-section";
  span?: SpanType;
  inclusionType?: InclusionType;
  heading: string;
  items: string[];
}

interface ListOnly {
  type: "list";
  span?: SpanType;
  items: string[];
}

type NutritionSection = HeaderSection | ListSection | ChipsSection | ListOnly;

export type DietaryRecommendationsModel = NutritionSection[][];
