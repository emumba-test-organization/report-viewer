export type AllergyRow = {
  type: string;
  allergen: string;
  reaction: string;
};

export type AllergiesData = {
  title: string;
  description: string;
  headers: string[];
  rows: AllergyRow[];
};
