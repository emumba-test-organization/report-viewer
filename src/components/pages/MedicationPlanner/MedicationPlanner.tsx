import type { JSX } from "react";
import { Badge } from "@/components/ui/badge";
import schedule from "./data.json";
import type { MedicationPlannerData } from "./types";
import { Sunrise, Moon, SunMedium, Pill, Syringe, Droplet } from "lucide-react";

type Props = {
  data?: MedicationPlannerData;
};

// Tailwind doesn't support @page or print size directly via classes.
// You need to add this CSS in your global stylesheet (e.g., index.css or a CSS module):
//
// @media print {
//   @page {
//     size: landscape;
//   }
// }
//
// There is no direct Tailwind class for @page size: landscape.
const timeSlots = ["Morning", "Afternoon", "Evening"];

const MedicationPlanner = ({ data = schedule }: Props) => {
  const { title, medications } = data;
  
  const timeSlotIcons: Record<(typeof timeSlots)[number], JSX.Element> = {
    Morning: <Sunrise className="w-4 h-4" />,
    Afternoon: <SunMedium className="w-4 h-4" />,
    Evening: <Moon className="w-4 h-4" />,
  };

  const medicineIcons = {
    "Oral tablet": <Pill className="w-3 h-3" />,
    "Oral capsule": <Pill className="w-3 h-3" />,
    Solution: <Droplet className="w-3 h-3" />,
    Injection: <Syringe className="w-3 h-3" />,
  };

  return (
    <div className="break-before-page m-4 w-full print-landscape">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        {title || "Medication Planner"}
      </h2>
      <table
        border={1}
        cellPadding="8"
        className="border-1 table-border-collapse"
      >
        <thead>
          <tr>
            {medications.map((day) => (
              <th
                key={day.date}
                className="bg-neutral-200 border-r-1 border-neutral-300 text-left p-2"
              >
                <div className="flex gap-0.5 items-center">
                  <Badge
                    variant="outline"
                    className="rounded bg-neutral-300 border-neutral-400 text-xs py-0 px-1.5"
                  >
                    {day.day.substring(0, 3)}
                  </Badge>{" "}
                  <br />
                  <span className="text-xs">
                    {new Date(day.date).toLocaleDateString("en-GB", {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot) => (
            <tr key={slot}>
              {/* <td>
                <strong>{slot}</strong>
              </td> */}
              {medications.map((day) => (
                <td key={day.date + slot} className="border-1">
                  <div className="flex items-center gap-1 font-semibold text-xs p-1 bg-neutral-100 border-b border-neutral-200">
                    {timeSlotIcons[slot]} {slot}
                  </div>
                  {day.schedule[slot] && day.schedule[slot].length > 0 ? (
                    day.schedule[slot].map((med, i) => (
                      <div key={i} className="flex flex-col p-1 gap-1">
                        <div className="flex items-center gap-1 text-xs">
                          <span>
                            {
                              medicineIcons[
                                med.type as keyof typeof medicineIcons
                              ]
                            }
                          </span>
                          <span className="font-bold">{med.name}</span>
                          {med.isSOS && (
                            <Badge className=" bg-red-700 text-white px-1 py-0.5 text-[10px] font-bold rounded">
                              SOS
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center text-xs">
                          {med.dosage}{" "}
                          {med.instructions && <>{med.instructions}</>}
                        </div>
                      </div>
                    ))
                  ) : (
                    <em>—</em>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicationPlanner;
