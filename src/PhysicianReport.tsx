import { useEffect, useState } from "react";
import { Intro, type IntroData } from "./components/pages/PhysicianPages/Intro";
import {
  CognitiveAssessment,
  type CognitiveAssessmentData,
} from "./components/pages/PhysicianPages/CognitiveAssessment";
import {
  Stopbang,
  type StopBangRiskData,
} from "./components/pages/PhysicianPages/Stopbang";
import { Acb, type AcbData } from "./components/pages/PhysicianPages/Acb";
import {
  Leqembi,
  type LeqembiData,
} from "./components/pages/PhysicianPages/Leqembi";
import {
  FallRisk,
  type FallRiskData,
} from "./components/pages/PhysicianPages/FallRisk";
import AdditionalDiagnostics from "./components/pages/PhysicianPages/AdditionalDiagnostics/AdditionalDiagnostics";
import type { AdditionalDiagnosticsData } from "./components/pages/PhysicianPages/AdditionalDiagnostics/types";

import { CognitiveFactorsSummary } from "./components/pages/CognitiveFactorsSummary";
import ComorbiditiesAssessment from "./components/pages/ComorbiditiesAssessment";
import MedicationsManagement from "./components/pages/MedicationsManagement";
import {
  ImmuneScore,
  type ImmuneScoreData,
} from "./components/pages/PhysicianPages/ImmuneScore";
import {
  LifestyleRecommendation,
  type LifestyleRecommendationsData,
} from "./components/pages/PhysicianPages/LifestyleRecommendation";

export type Report = {
  intro: IntroData;
  cognitive_assessment: CognitiveAssessmentData;
  stopbang: StopBangRiskData;
  acb: AcbData;
  leqembi: LeqembiData;
  fall_risk: FallRiskData;
  preface: object;
  cognitiveFactors: object;
  medicalIssues: object;
  comorbidities: object;
  reportedAndInferredComorbidities: object;
  currentMedications: object;
  additional_diagnostics: AdditionalDiagnosticsData;
  immuneScore: ImmuneScoreData;
  lifestyleRecommendation: LifestyleRecommendationsData;
};

function PhysicianReport() {
  const [report, setReport] = useState<Report | null>(null);

  useEffect(() => {
    fetch("/report_physician.json")
      .then((res) => res.json())
      .then(setReport)
      .catch((err) => console.error("Failed to load report:", err));
  }, []);

  useEffect(() => {
    console.log(report);
  }, [report]);

  if (!report) return <p>Loading report…</p>;

  return (
    <div>
      <div className="w-[210mm] mx-auto p-6 bg-white mb-8">
        <Intro data={report.intro} />
        <CognitiveAssessment data={report.cognitive_assessment} />
        <Stopbang data={report.stopbang} />
        <Acb data={report.acb} />
        <Leqembi data={report.leqembi} />
        <FallRisk data={report.fall_risk} />
        <AdditionalDiagnostics data={report.additional_diagnostics} />
        <LifestyleRecommendation data={report.lifestyleRecommendation} />
        <ImmuneScore data={report.immuneScore} />
      </div>
      <CognitiveFactorsSummary data={report?.cognitiveFactors} />
      <ComorbiditiesAssessment
        data={{
          medicalIssues: report?.medicalIssues,
          comorbidities: report?.comorbidities,
          reportedAndInferredComorbidities:
            report?.reportedAndInferredComorbidities,
        }}
      />
      <MedicationsManagement data={report?.currentMedications} />
    </div>
  );
}

export default PhysicianReport;
