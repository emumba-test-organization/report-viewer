import "./App.css";
import HealthReport, {
  type HealthReportData,
} from "./components/pages/HealthReport/HealthReport";
import Preface, { type PrefaceData } from "./components/pages/Preface/Preface";
import {
  CurrentMedication,
  CurrentMedicationTables,
  type CurrentMedicationData,
} from "./components/pages/CurrentMedication";
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
import { useEffect, useState } from "react";
import "./App.css";
import ContentWithTables from "./components/shared/ContentWithTables";
import {
  ActionPlan,
  ActionPlanTables,
  type MedicationType,
} from "./components/pages/ActionPlan";
import { SupplementPlan } from "./components/pages/Supplements";
import { PdfLayoutProvider } from "./utils/PdfLayoutHelper/PdfLayoutContext";
import PaginatedTable from "./components/shared/PaginatedTable";
import MedicationPlan from "./components/pages/ActionPlan/MedicationPlan";
import Analyzer from "./components/shared/Analyzer";
import { CognitionPaginated } from "./components/pages/Cognition";

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
    <PdfLayoutProvider>
      <div>
        <Analyzer index={0}>
          <Preface data={report?.preface} />
        </Analyzer>
        <Analyzer index={1}>
          <HealthReport data={report?.healthReport} />
        </Analyzer>
        <Analyzer index={2}>
          <ActionPlan data={report?.actionPlan} />
        </Analyzer>
        <PaginatedTable
          index={3}
          headers={["Medication", "Reasoning", "Guidance", "Already Taking"]}
          rows={report?.actionPlan?.medications || []}
          tableComponent={MedicationPlan}
        />
        {/* <ContentWithTables
          index={3}
          data={report?.actionPlan}
          // preContentComponent={ActionPlan}
          tablesComponent={ActionPlanTables}
        /> */}
        {/* <ContentWithTables
          index={4}
          data={report?.currentMedication}
          // preContentComponent={CurrentMedication}
          tablesComponent={CurrentMedicationTables}
        /> */}

        {/* <CurrentMedication data={report?.currentMedication} /> */}
        {/* <SupplementPlan supplements={report?.actionPlan?.supplements} /> */}
        {/* <Lifestyle data={report?.lifestyle} /> */}
        {/* <div className="w-[210mm] h-[297mm] mx-auto p-6 bg-white">
          <NutritionSummary data={report?.nutrition?.summary} />
          <NutritionConsumption data={report?.nutrition?.consumption} />
        </div> */}
        {/* <NutritionRecommendation data={report?.nutrition?.recommendations} /> */}
        {/* <Analyzer index={4}>
          <Cognition data={report?.cognitiveFunction} />
        </Analyzer> */}
        {/* <PaginatedTable
          index={4}
          headers={["Cognitive Factor", "Your Score", "Optimal Range"]}
          rows={report?.cognitiveFunction?.factors || []}
          tableComponent={CognitionPaginated}
        /> */}
      </div>
    </PdfLayoutProvider>
  );
}

export default App;
