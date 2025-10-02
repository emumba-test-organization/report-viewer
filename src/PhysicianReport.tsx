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

export type Report = {
  intro: IntroData;
  cognitive_assessment: CognitiveAssessmentData;
  stopbang: StopBangRiskData;
  acb: AcbData;
  leqembi: LeqembiData;
  fall_risk: FallRiskData;
};

function PhysicianReport() {
  const [report, setReport] = useState<Report | null>(null);

  useEffect(() => {
    fetch("/report_physician.json")
      .then((res) => res.json())
      .then(setReport)
      .catch((err) => console.error("Failed to load report:", err));
  }, []);

  if (!report) return <p>Loading report…</p>;

  return (
    <div>
      <Intro data={report.intro} />
      <CognitiveAssessment data={report.cognitive_assessment} />
      <Stopbang data={report.stopbang} />
      <Acb data={report.acb} />
      <Leqembi data={report.leqembi} />
      <FallRisk data={report.fall_risk} />
    </div>
  );
}

export default PhysicianReport;
