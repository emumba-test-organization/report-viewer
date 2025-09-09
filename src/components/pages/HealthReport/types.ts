/* eslint-disable @typescript-eslint/no-explicit-any */
export type HealthReportData = {
  title: string;
  currentStatus: {
    overview: {
      [key: string]: {
        value: string;
        annotations: string[];
      };
    };
  };
  healthStatusSections: {
    title: string;
    description: string;
    factors: string[];
    count: number;
  }[];
};
