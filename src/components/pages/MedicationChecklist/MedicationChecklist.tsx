import React, { useMemo, type JSX } from "react";
import type { MedicationPlannerData } from "../MedicationPlanner/types";
import type { MedicationChecklistData } from "./types.";
import schedule from "../MedicationPlanner/data.json";
import { Droplet, Moon, Pill, SunMedium, Sunrise, Syringe } from "lucide-react";

type Props = {
  data?: MedicationPlannerData;
};

function convertToMatrix(dayBasedData: MedicationPlannerData) {
  const timeSlots = ["Morning", "Afternoon", "Evening"];
  const dates = dayBasedData.map((d) =>
    new Date(d.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })
  );

  const medications: MedicationChecklistData[] = [];

  dayBasedData.forEach((day) => {
    timeSlots.forEach((slot) => {
      day.schedule[slot]?.forEach((med) => {
        // Keep entries unique by both med name and slot
        let existing = medications.find(
          (m) => m.name === med.name && m.time === slot
        );

        if (!existing) {
          // Create a new entry for this med+slot combo
          existing = {
            time: slot,
            name: med.name,
            dosage: med.dosage,
            type: med.type,
            isSOS: med.isSOS || false,
            schedule: {},
          };
          // Initialize schedule for all dates as false
          dates.forEach((d) => {
            existing!.schedule[d] = false;
          });
          medications.push(existing);
        }

        // Mark this date as "taken"
        existing.schedule[day.date] = true;
      });
    });
  });

  return { timeSlots, dates, medications };
}

const MedicationChecklist = ({ data = schedule }: Props) => {
  const { timeSlots, dates, medications } = useMemo(
    () => convertToMatrix(data),
    [data]
  );

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
    <div className="break-before-page m-4 print-landscape">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Your Medication Planner
      </h2>
      <table className="border-1 table-border-collapse w-full">
        <thead>
          <tr className="bg-neutral-200">
            <th className="border-1 border-neutral-200"></th>
            {dates.map((date, i) => (
              <th
                key={date}
                className={`${
                  i % 2 === 0 ? "bg-neutral-100" : "transparent"
                } text-center text-sm font-medium h-18 border-1 border-neutral-200`}
              >
                <span className="inline-block rotate-[-70deg] whitespace-nowrap">
                  {date}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot) => (
            <React.Fragment key={slot}>
              <tr>
                <td
                  //   colSpan={dates.length + 1}
                  className="flex gap-1.5 bg-neutral-100 text-left p-2 font-bold text-xs border-1 border-b-0 border-r-0 border-neutral-200"
                >
                  {timeSlotIcons[slot]}
                  {slot}
                </td>
                {dates.map((_, i) => (
                  <td
                    key={i}
                    className={`${
                      i % 2 === 0 ? "bg-neutral-50" : "bg-neutral-100"
                    } text-center border-1 border-b-0 border-r-0 border-neutral-200`}
                  ></td>
                ))}
              </tr>
              {medications
                .filter((med) => med.time === slot)
                .map((med, j) => (
                  <tr key={j}>
                    <td className="flex items-center gap-1.5 font-semibold text-xs p-2 border-1 border-b-0 border-r-0 border-neutral-200">
                      {medicineIcons[med.type as keyof typeof medicineIcons]}
                      {med.name}
                    </td>
                    {dates.map((date, k) => (
                      <td
                        key={date}
                        className={`${
                          k % 2 === 0 ? "bg-white" : "bg-neutral-100"
                        } text-center border-1 border-b-0 border-r-0 border-neutral-200`}
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 m-2 rounded-none"
                          readOnly
                        />
                      </td>
                    ))}
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicationChecklist;
