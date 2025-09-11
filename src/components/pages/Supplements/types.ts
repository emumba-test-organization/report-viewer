export type SupplementData = {
  title: string;
  intro: string[];
  meds: {
    medication: string;
    dosageDetails: string;
    reasoning: Action[];
    guidance: string;
    alreadyTaking?: string;
  }[];
};

type Action = {
  action: string;
  reasons: Reason[];
};
type Reason = {
  action?: string;
  name?: string;
  currentValue?: string;
  currentLevel?: string;
};
