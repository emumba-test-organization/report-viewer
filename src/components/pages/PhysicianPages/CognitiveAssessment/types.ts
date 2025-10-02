export type CognitiveAssessmentSection =
    | "1. Cognition-focused evaluation"
    | "2. Medical decision making"
    | "3. Functional assessment, including ADLs"
    | "4. High-risk-medication review & reconciliation"
    | "5. Neuropsychiatric & behavioral evaluation"
    | "6. Safety evaluation"
    | "7. Caregiver identification"
    | "8. Advance care planning";

export type CognitiveAssessmentItem = {
    text: string;
    checkbox: boolean;
    value?: number;
};

export type CognitiveAssessmentData = {
    [section in CognitiveAssessmentSection]: CognitiveAssessmentItem[];
};