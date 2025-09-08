import "./App.css";
import Preface, { type PrefaceData } from "./components/pages/Preface/Preface";
import {
  CurrentMedication,
  CurrentMedicationTables,
  type CurrentMedicationData,
} from "./components/pages/CurrentMedication";
// import Lifestyle, { type LifestyleData } from "./components/pages/Lifestyle";
import {
  NutritionConsumption,
  NutritionRecommendation,
  type NutritionRecommendationsData,
  type NutritionConsumptionData,
} from "./components/pages/Nutrition";
import {
  NutritionSummary,
  type NutritionSummaryData,
} from "./components/pages/Nutrition";
import Cognition, {
  type CognitionData,
} from "./components/pages/Cognition/Cognition";
import { useEffect, useState } from "react";
import "./App.css";
import ContentWithTables from "./components/shared/ContentWithTables";
import {
  // ActionPlan,
  // ActionPlanTables,
  type MedicationType,
} from "./components/pages/ActionPlan";
import { SupplementPlan } from "./components/pages/Supplements";
import {
  PaginatedHealthReport,
  type HealthReportData,
} from "./components/pages/HealthReport";
import type { LifestyleData } from "./components/pages/Lifestyle";
import PaginatedActionPlan from "./components/pages/ActionPlan/PaginatedActionPlan";
// import PaginatedActionPlan from "./components/pages/ActionPlan/PaginatedActionPlan";

type Report = {
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
      {/* <HealthReport data={report?.healthReport} /> */}
      <PaginatedHealthReport data={report?.healthReport} />
      {/* <PaginatedActionPlanTest /> */}
      <PaginatedActionPlan data={report?.actionPlan} />
      {/* <ContentWithTables
        data={report?.actionPlan}
        preContentComponent={ActionPlan}
        tablesComponent={ActionPlanTables}
      /> */}
      <ContentWithTables
        data={report?.currentMedication}
        preContentComponent={CurrentMedication}
        tablesComponent={CurrentMedicationTables}
      />
      <SupplementPlan supplements={report?.actionPlan?.supplements} />
      {/* <Lifestyle data={report?.lifestyle} /> */}
      <div className="w-[210mm] h-[297mm] mx-auto p-6 bg-white">
        <NutritionSummary data={report?.nutrition?.summary} />
        <NutritionConsumption data={report?.nutrition?.consumption} />
      </div>
      <NutritionRecommendation data={report?.nutrition?.recommendations} />
      <Cognition data={report?.cognitiveFunction} />

      <div className={`w-[210mm] h-[${297}mm] mx-auto p-6 bg-white`}>
        another page
      </div>
      <div className="w-[210mm] h-[297mm] mx-auto p-6 bg-white">
        another page 2
      </div>
    </div>
  );
}

export default App;
