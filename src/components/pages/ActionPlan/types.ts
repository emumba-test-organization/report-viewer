import type { SupplementData } from "../Supplements";

export type MedicationType = {
  title: string;
  intro: string[];
  steps: string[];
  medications: {
    medication: string;
    dosageDetails: string;
    reasoning: {
      action: string;
      name?: string;
      currentValue?: string;
    }[];
    guidance: string;
    alreadyTaking?: string;
  }[];
  supplements: SupplementData;
};
