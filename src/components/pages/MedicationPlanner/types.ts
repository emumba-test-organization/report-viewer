export type MedicationItem = {
  name: string;
  dosage: string;
  instructions: string;
  isSOS: boolean;
  type: string;
};

export type MedicationSchedule = {
  [timeOfDay: string]: MedicationItem[];
};

export type MedicationPlannerItem = {
  date: string;
  day: string;
  schedule: MedicationSchedule;
};

export type MedicationPlannerData = MedicationPlannerItem[];

type MedicationItemType = {
  date: string;
  medicines: {
    morning: string[];
    afternoon: string[];
    evening: string[];
  };
};

export type MedicationItemData = MedicationItemType[];
