interface Token {
    name: string;
    value: string | null;
    unit: string | null;
    risk: string | null;
    stage: string | null;
}

interface Test {
    test: string;
    explanation: string;
    tokens: Token[];
}

interface TestSegments {
    [key: string]: Test[];
}

export interface AdditionalDiagnosticsData {
    heading: string;
    segments: TestSegments;
    headers: string[];
}
