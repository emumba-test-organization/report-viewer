export type MedicationChecklistData = {
  time: string;
  name: string;
  dosage: string;
  type: string;
  isSOS: boolean;
  schedule: {
    [date: string]: boolean;
  };
};
