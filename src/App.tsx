import "./App.css";
import Preface, { type PrefaceData } from "./components/pages/Preface/Preface";
import { type CurrentMedicationData } from "./components/pages/CurrentMedication";
// import Lifestyle, { type LifestyleData } from "./components/pages/Lifestyle";
import {
  type NutritionRecommendationsData,
  type NutritionConsumptionData,
} from "./components/pages/Nutrition";
import { type NutritionSummaryData } from "./components/pages/Nutrition";
import { useEffect, useState } from "react";
import "./App.css";
import { ActionPlan, type MedicationType } from "./components/pages/ActionPlan";
import { type HealthReportData } from "./components/pages/HealthReport";
import type { LifestyleData } from "./components/pages/Lifestyle";
import HealthReport from "./components/pages/HealthReport/HealthReport";
import NutritionAndDiet from "./components/pages/Nutrition/NutritionAndDiet";
import { SupplementPlan } from "./components/pages/Supplements";
import type { AllergiesData } from "./components/pages/Allergies/types";
import type { ComorbiditiesData } from "./components/pages/Comorbidities/types";
import { KnownMedicalConditions } from "./components/pages/KnownMedicalConditions";
import type { CognitionData } from "./components/pages/Cognition";
import CognitionPage from "./components/pages/Cognition/CognitionPage";

export type Report = {
  preface: PrefaceData;
  healthReport: HealthReportData;
  actionPlan: MedicationType;
  lifestyle: LifestyleData;
  nutrition: {
    summary: NutritionSummaryData;
    consumption: NutritionConsumptionData;
    recommendations: NutritionRecommendationsData;
  };
  currentMedication: CurrentMedicationData;
  cognitiveFunction: CognitionData;
  allergies: AllergiesData;
  reportedProblems: ComorbiditiesData;
};

function App() {
  const [report, setReport] = useState<Report | null>(null);

  useEffect(() => {
    fetch("/report.json")
      .then((res) => res.json())
      .then(setReport)
      .catch((err) => console.error("Failed to load report:", err));
  }, []);

  if (!report) return <p>Loading report…</p>;

  return (
    <div>
      <Preface data={report?.preface} />
      <HealthReport data={report?.healthReport} />
      <ActionPlan data={report?.actionPlan} />
      <SupplementPlan data={report?.actionPlan?.supplements} />
      <NutritionAndDiet data={report?.nutrition} />
      {/* <Lifestyle data={report?.lifestyle} /> */}
      <CognitionPage data={report?.cognitiveFunction} />
      <KnownMedicalConditions data={report} />
    </div>
  );
}

export default App;
