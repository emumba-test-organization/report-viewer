import { QrCode } from "lucide-react";

export default function ActivityPlannerHeader() {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl">
        Your Activity Planner
      </h1>
      <div className="flex items-center gap-4">
        <div className="text-right text-xs text-gray-600">
          <p>Scan to download your next month's planner</p>
          <a className="text-blue-600" href="https://umethod.com/planner/medication">
            https://umethod.com/planner/medication
          </a>
        </div>
        <div className="w-16 h-16 border-2 border-gray-300 flex items-center justify-center">
          <QrCode className="w-12 h-12" />
        </div>
      </div>
    </div>
  );
}