import "./App.css";
import reportJson from "./report.json";
import HealthReport, { type HealthReportData } from "./components/HealthReport";
import Preface, { type PrefaceData } from "./components/Preface";
import {
  MedicationPlan,
  CurrentMedication,
  SupplementPlan,
  type MedicationType,
  type CurrentMedicationData,
} from "./components/pages/Medication";
import Lifestyle, { type LifestyleData } from "./components/pages/Lifestyle";
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

function App({ report = reportJson }: { report?: Report }) {
  return (
    <div>
      <Preface data={report?.preface} />
      <HealthReport data={report?.healthReport} />
      <MedicationPlan data={report?.actionPlan} />
      <CurrentMedication data={report?.currentMedication} />
      <SupplementPlan supplements={report?.actionPlan?.supplements} />
      <Lifestyle data={report?.lifestyle} />
      <div className="w-[210mm] h-[297mm] mx-auto p-6 bg-white">
        <NutritionSummary data={report?.nutrition?.summary} />
        <NutritionConsumption data={report?.nutrition?.consumption} />
      </div>
      <NutritionRecommendation data={report?.nutrition?.recommendations} />
      <Cognition data={report?.cognitiveFunction} />

      <div className="w-[210mm] h-[297mm] mx-auto p-6 bg-white">
        another page
      </div>
      <div className="w-[210mm] h-[297mm] mx-auto p-6 bg-white">
        another page 2
      </div>
    </div>
  );
}

export default App;
