export type CognitionData = {
  title: string;
  intro: string;
  factors: {
    section: string;
    entries: {
      description: string;
      severity: string;
      measurement: string;
      currentLevel: string;
      targetLevel: string;
      image: string | null;
    }[];
  }[];
};
