import { useEffect, useState } from "react";

export type Report = {
  preface: unknown;
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
      <h1>Physician Report</h1>
    </div>
  );
}

export default PhysicianReport;
