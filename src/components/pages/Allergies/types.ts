export type AllergyRow = {
  type: string;
  allergen: string;
  reaction: string;
};

export type AllergiesData = {
  heading: string;
  description: string;
  headers: string[];
  rows: AllergyRow[];
};
