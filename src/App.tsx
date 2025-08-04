import { useEffect, useState } from "react";
import "./App.css";
import HealthReport from "./components/HealthReport";
import Preface from "./components/Preface";
import ActionPlan from "./components/ActionPlan";

type Report = {
  preface: unknown; // Replace 'any' with the actual type if known
  healthReport: unknown;
  actionPlan: unknown;
  // Add other properties as needed
};

function App() {
  const [report, setReport] = useState<Report | null>(null);

  useEffect(() => {
    fetch("/report.json")
      .then((res) => res.json())
      .then(setReport)
      .catch((err) => console.error("Failed to load report:", err));
  }, []);

  useEffect(() => {
    console.log("Report loaded:", report);
  }, [report]);

  if (!report) return <p>Loading report…</p>;

  return (
    <div>
      <Preface data={report?.preface} />
      <HealthReport data={report?.healthReport} />
      <ActionPlan data={report?.actionPlan} />
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
