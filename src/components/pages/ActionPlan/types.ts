import type { SupplementData } from "../Supplements";

export type MedicationType = {
  title: string;
  intro: string[];
  steps: string[];
  medications: {
    medication: string;
    dosageDetails: string;
    reasoning: Action[];
    guidance: string;
    alreadyTaking?: string;
  }[];
  supplements: SupplementData;
};

type Action = {
  action: string;
  reasons: Reason[];
};
type Reason = {
  name?: string;
  action?: string;
  currentValue?: string;
  currentLevel?: string;
};
