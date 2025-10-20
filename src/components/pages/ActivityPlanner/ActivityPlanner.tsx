import A4Page from "@/components/shared/A4Page";
import { QrCode } from "lucide-react";

export default function ActivityPlanner() {
  return (
    <A4Page>
      {/* Title and QR Code */}
      <div className="flex justify-between items-start mb-8">
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

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-8">
        {/* Left Column - Activity Slots */}
        <div>
          <div className="border border-gray-300">
            <h3 className="text-sm font-bold text-gray-900 mb-4 bg-gray-200 p-3">
              Activity Slots
            </h3>

            <div className="space-y-4">
              {/* 08:00 AM */}
              <div className="flex items-start gap-4 px-3">
                <div className="text-xl text-gray-900 w-25 border-r border-gray-300">
                  08:00 AM
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">
                    Physiotherapy Exercise
                  </div>
                  <div className="text-xs text-gray-600">Daily</div>
                </div>
              </div>

              {/* 09:30 AM */}
              <div className="flex items-start gap-4 px-3">
                <div className="text-xl text-gray-900 w-25 border-r border-gray-300">
                  09:30 AM
                </div>
                <div className="flex-1">
                  <span className="bg-info text-white text-xs px-2 py-1 rounded mr-2">
                    Exercise
                  </span>
                  <span className="text-sm font-medium">Daily</span>
                  <div className="text-xs text-gray-600 mt-1">
                    Any one activity from Exercise
                  </div>
                </div>
              </div>

              {/* 12:30 PM */}
              <div className="flex items-start gap-4 px-3">
                <div className="text-xl text-gray-900 w-25 border-r border-gray-300">
                  12:30 PM
                </div>
                <div className="flex-1">
                  <span className="bg-success text-white text-xs px-2 py-1 rounded mr-2">
                    Mental
                  </span>
                  <span className="text-sm font-medium">Alternating Days</span>
                  <div className="text-xs text-gray-600 mt-1">
                    Any one activity from Mental
                  </div>
                </div>
              </div>

              {/* 05:00 PM */}
              <div className="flex items-start gap-4 px-3">
                <div className="text-xl text-gray-900 w-25 border-r border-gray-300">
                  05:00 PM
                </div>
                <div className="flex-1">
                  <span className="bg-warning text-white text-xs px-2 py-1 rounded mr-2">
                    Relaxation
                  </span>
                  <span className="text-sm font-medium">Daily</span>
                  <div className="text-xs text-gray-600 mt-1">
                    Any five activities from Relaxation
                  </div>
                </div>
              </div>

              {/* 07:00 PM */}
              <div className="flex items-start gap-4 px-3">
                <div className="text-xl text-gray-900 w-25 border-r border-gray-300">
                  07:00 PM
                </div>
                <div className="flex-1">
                  <span className="bg-link text-white text-xs px-2 py-1 rounded mr-2">
                    Group B
                  </span>
                  <span className="text-sm font-medium">Fridays</span>
                  <div className="text-xs text-gray-600 mt-1">
                    Any one activity from Group B
                  </div>
                </div>
              </div>

              {/* 09:30 PM */}
              <div className="flex items-start gap-4 px-3">
                <div className="text-xl text-gray-900 w-25 border-r border-gray-300">
                  09:30 PM
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">
                    Physiotherapy Exercise
                  </div>
                  <div className="text-xs text-gray-600">Daily</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Activity Groups */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 pb-1">
            Activity Groups
          </h3>

          <div className="space-y-2">
            {/* Exercise Group */}
            <div className="bg-gray-200 p-1 rounded">
              <div className="flex p-2">
                <div className="bg-purple-600 text-white text-xs px-2 py-1 rounded">
                  Exercise
                </div>
              </div>

              <div className="space-y-1 text-sm bg-white rounded p-2">
                <div className="border-b">
                  <div className="font-medium">Side to side Reach</div>
                  <div className="text-gray-600">Duration: 5 min</div>
                  <div className="text-gray-600">
                    Reach one arm to the side, then to the other.
                  </div>
                </div>

                <div className="border-b">
                  <div className="font-medium">Neck stretches</div>
                  <div className="text-gray-600">Duration: 5 min</div>
                  <div className="text-gray-600">
                    Side-to-side, forward/backward
                  </div>
                </div>

                <div>
                  <div className="font-medium">Shoulder rolls & stretches</div>
                  <div className="text-gray-600">Duration: 5 min</div>
                  <div className="text-gray-600">
                    Loosen upper back and shoulders
                  </div>
                </div>
              </div>
            </div>

            {/* Relaxation Group */}
            <div className="bg-gray-200 p-1 rounded">
              <div className="flex p-2">
                <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
                  Relaxation
                </div>
              </div>

              <div className="space-y-1 text-sm bg-white rounded p-2">
                <div className="border-b">
                  <div className="font-medium">Music</div>
                  <div className="text-gray-600">Duration: 30 min</div>
                  <div className="text-gray-600">
                    Listen to calming music to unwind.
                  </div>
                </div>

                <div className="border-b">
                  <div className="font-medium">Yoga</div>
                  <div className="text-gray-600">Duration: 15 min</div>
                  <div className="text-gray-600">
                    1. Engage in a calming yoga session focusing on deep
                    breathing and gentle stretches.
                    <br />
                    2. Hold each pose for at least 30 seconds, allowing your
                    body to relax and release tension.
                  </div>
                </div>

                <div>
                  <div className="font-medium">Shoulder rolls & stretches</div>
                  <div className="text-gray-600">Duration: 1 min</div>
                  <div className="text-gray-600">
                    Loosen upper back and shoulders
                  </div>
                </div>
              </div>
            </div>

            {/* Group B */}
            <div className="bg-gray-200 p-1 rounded">
              <div className="flex p-2">
                <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  Group B
                </div>
              </div>

              <div className="space-y-1 text-sm bg-white rounded p-2">
                <div className="border-b">
                  <div className="font-medium">(Activity)</div>
                  <div className="text-gray-600">Duration: 15 min</div>
                  <div className="text-gray-600">(Text)</div>
                </div>

                <div className="border-b">
                  <div className="flex gap-2">
                    <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                      Mental
                    </span>
                    <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded">
                      Exercise
                    </span>
                  </div>
                </div>

                <div>
                  <div className="font-medium">Name the Object</div>
                  <div className="text-gray-600">Duration: 3 min</div>
                  <div className="text-gray-600">
                    1. Hold up simple objects (ball, spoon, scarf).
                    <br />
                    2. Ask: "What is this or what color is this?"
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </A4Page>
  );
}
