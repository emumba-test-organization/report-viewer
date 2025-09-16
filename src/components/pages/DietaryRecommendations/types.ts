export type DietaryRecommendationsData = {
  heading: string;
  items: Array<{
    title: string;
    description: string;
    inclusionType: string;
    table: TableRow[];
  }>;
};

type TableRow = {
  label: string;
  value: string;
  inclusionType: string;
};
