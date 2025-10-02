export type IntroData = {
  titles: string[];
  participant: {
    "Participant Name": string;
    "Participant identifier": string;
    "Care plan number": string;
  };
  practice: {
    "Physician": string;
    "Practice": string;
    "Created On": string;
    "Valid Until": string;
  };
  overview: Overview;
};

export type Overview = {
  [key: string]: {
    value: string;
    annotations: string[];
  };
};