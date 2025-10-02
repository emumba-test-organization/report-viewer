export type AcbData = {
  title: string;
  root_preface: string;
  criteria: {
    preface: string;
    items: {
      score: number;
      description: string;
    }[];
  };
  medications: {
    headers: string[];
    data: {
      medication: string;
      dosage: string;
      score: number;
      alternatives: string[];
    }[];
  };
  totals: {
    total_acb_score: number;
    definite_anticholinergics: number;
    mmse_effect: number;
  };
  postface: {
    text: string;
    mights: string[];
    notes: string[];
  };
};
