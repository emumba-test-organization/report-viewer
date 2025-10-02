export type FallRiskMedication = {
    name: string;
    dosage: string;
    score: string;
};

export type FallRiskData = {
    heading: string;
    preface: string[];
    headers: string[];
    columnTypes: ("numeric" | "alpha")[];
    medications: FallRiskMedication[];
    totalScore: number;
};
