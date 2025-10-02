export type StopBangRiskData = {
  title: string;
  preface: {
    definition: string;
    risk_intro: string;
    risk_rules: {
      [key: string]: string;
    };
  };
  headers: string[];
  table: Array<{
    code: string;
    question: string;
    answer: string;
    explanation: string;
  }>;
  postface: string;
  score: number;
  risk_level: "Low" | "Intermediate" | "High" | "";
  calculated_score: number;
};
