export type ImmuneScoreData = {
    title: string;
    preface: string;
    score: string;
    headers: [string, string, string];
    factors: Array<{
        factor: string;
        severity: string;
        score: string;
        target: string;
    }>;
    highValues: Array<{
        factor: string;
        severity: string;
        score: string;
        target: string;
    }>;
    postface: string[];
    disclaimer: string;
};
