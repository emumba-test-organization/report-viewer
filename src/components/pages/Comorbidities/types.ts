export type ComorbidityRow = {
  comorbidity: string;
  dateDiagnosed: string;
};

export type ComorbiditiesData = {
  title: string;
  description: string;
  headers: string[];
  rows: ComorbidityRow[];
};
