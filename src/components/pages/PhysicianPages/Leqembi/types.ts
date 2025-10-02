export type LeqembiCriterion = {
    criterion: string;
    status: "Met" | "unknown" | "Not recommended";
    reasoning: string | string[];
};

export type LeqembiData = {
    heading: string;
    legend_preface: string;
    legend: string[];
    preface: string;
    conclusion: string;
    headers: string[];
    criteria: LeqembiCriterion[];
    eligibility: string;
};
