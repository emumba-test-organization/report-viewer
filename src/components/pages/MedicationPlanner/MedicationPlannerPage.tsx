import { useMemo } from "react";
import type { MedicationItemData } from "./types";
import {
  PaginationWrapper,
  type BlockConfig,
  type BlockRenderer,
  type TableConfig,
} from "@/components/shared/PaginationWrapper";
import {
  MedicationPlannerDatesHeader,
  MedicationPlannerOverview,
  MedicationPlannerTimeHeader,
  MedicationPlannerTimeRow,
} from "./MedicationPlannerBlocks";

/* eslint-disable @typescript-eslint/no-explicit-any */

function transformMedicineSchedule(medicineData: MedicationItemData) {
  interface MedicineSchedule {
    morning: { [key: string]: string[] };
    afternoon: { [key: string]: string[] };
    evening: { [key: string]: string[] };
  }

  const result: MedicineSchedule = {
    morning: {},
    afternoon: {},
    evening: {},
  };

  // Iterate through each day in the schedule
  medicineData.forEach((day) => {
    const date = day.date;

    // Process morning medicines
    day.medicines.morning.forEach((medicine) => {
      if (!result.morning[medicine]) {
        result.morning[medicine] = [];
      }
      result.morning[medicine].push(date);
    });

    // Process afternoon medicines
    day.medicines.afternoon.forEach((medicine) => {
      if (!result.afternoon[medicine]) {
        result.afternoon[medicine] = [];
      }
      result.afternoon[medicine].push(date);
    });

    // Process evening medicines
    day.medicines.evening.forEach((medicine) => {
      if (!result.evening[medicine]) {
        result.evening[medicine] = [];
      }
      result.evening[medicine].push(date);
    });
  });

  return result;
}

const MedicationPlannerPage = ({ data }: { data: any }) => {
  const createHealthBlocks = (data: any): BlockConfig[] => {
    const blocks: BlockConfig[] = [];

    // Add the initial dates header
    blocks.push(
      { id: "medicationPlannerOverview", type: "medicationPlannerOverview" },
      {
        id: "medicationPlannerDatesHeader",
        type: "medicationPlannerDatesHeader",
        data: data,
      }
    );

    // Transform the medicine schedule
    const transformedSchedule = transformMedicineSchedule(data);

    // Define the day times in the order you want them to appear
    const dayTimes = ["morning", "afternoon", "evening"] as const;

    // Create blocks for each day time
    dayTimes.forEach((dayTime) => {
      const medicinesForDayTime = transformedSchedule[dayTime];

      // Only create blocks if there are medicines for this day time
      if (Object.keys(medicinesForDayTime).length > 0) {
        // Create time header block for this day time
        blocks.push({
          id: `medicationPlannerTimeHeader${
            dayTime.charAt(0).toUpperCase() + dayTime.slice(1)
          }`,
          type: `medicationPlannerTimeHeader${
            dayTime.charAt(0).toUpperCase() + dayTime.slice(1)
          }`,
          data: {
            dayTime,
            originalData: data,
          },
        });

        // Create row blocks for each medicine in this day time
        Object.entries(medicinesForDayTime).forEach(([medicineName, dates]) => {
          blocks.push({
            id: `medicationPlanner${
              dayTime.charAt(0).toUpperCase() + dayTime.slice(1)
            }Row_${medicineName.replace(/\s+/g, "_")}`,
            type: `medicationPlannerRow${
              dayTime.charAt(0).toUpperCase() + dayTime.slice(1)
            }`,
            data: {
              dayTime,
              medicineName,
              dates,
              originalData: data,
            },
          });
        });
      }
    });
    console.log("MedicationPlannerPage blocks:", blocks);
    return blocks;
  };

  const renderHealthBlock: BlockRenderer = (block, key) => {
    const commonProps = {
      key,
      blockId: block.id,
      // Don't pass setRef here - it's handled by the wrapper
    };

    if (block.type === "medicationPlannerOverview") {
      return <MedicationPlannerOverview {...commonProps} data={undefined} />;
    }

    if (block.type === "medicationPlannerDatesHeader") {
      return (
        <MedicationPlannerDatesHeader {...commonProps} data={block.data} />
      );
    }

    if (block.type.startsWith("medicationPlannerTimeHeader")) {
      return <MedicationPlannerTimeHeader {...commonProps} data={block.data} />;
    }

    if (block.type.startsWith("medicationPlannerRow")) {
      return <MedicationPlannerTimeRow {...commonProps} data={block.data} />;
    }
  };

  const tableConfigs: TableConfig[] = useMemo(() => {
    const configs: TableConfig[] = [];
    configs.push({
      headerType: "medicationPlannerDatesHeader",
      rowTypes: [], // No direct rows, but serves as parent
      headerId: "medicationPlannerDatesHeader",
      headerData: data,
      priority: 100, // Highest priority - should be placed first
    });

    // Transform the medicine schedule to get available day times
    const transformedSchedule = transformMedicineSchedule(data);

    // Define the day times in the order you want them to appear
    const dayTimes = ["morning", "afternoon", "evening"] as const;

    // Create table config for each day time that has medicines
    dayTimes.forEach((dayTime) => {
      const medicinesForDayTime = transformedSchedule[dayTime];

      // Only create config if there are medicines for this day time
      if (Object.keys(medicinesForDayTime).length > 0) {
        const capitalizedDayTime =
          dayTime.charAt(0).toUpperCase() + dayTime.slice(1);

        configs.push({
          headerType: `medicationPlannerTimeHeader${capitalizedDayTime}`,
          rowTypes: [`medicationPlannerRow${capitalizedDayTime}`],
          headerId: `medicationPlannerTimeHeader${capitalizedDayTime}`,
          headerData: {
            dayTime,
            originalData: data,
          },
          parentHeaders: ["medicationPlannerDatesHeader"], // Requires dates header
          priority: 50,
        });
      }
    });

    return configs;
  }, [data]);

  return (
    <PaginationWrapper
      data={data}
      createBlocks={createHealthBlocks}
      renderBlock={renderHealthBlock}
      tables={tableConfigs}
    />
  );
};

export default MedicationPlannerPage;
