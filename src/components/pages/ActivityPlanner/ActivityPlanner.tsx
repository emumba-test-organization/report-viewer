import A4Page from "@/components/shared/A4Page";
import ActivityPlannerHeader from "./ActivityPlannerHeader";
import ActivitySlots, { type ActivitySlotType } from "./ActivitySlots";
import ActivityGroups, { type ActivityGroupType } from "./ActivityGroups";

export type ActivityPlannerData = {
  slots: ActivitySlotType[];
  groups: ActivityGroupType[];
};

export default function ActivityPlanner({ data }: { data: ActivityPlannerData }) {
  return (
    <A4Page>
      <ActivityPlannerHeader />

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-8">
        {/* Left Column - Activity Slots */}
        <ActivitySlots slots={data.slots} />

        {/* Right Column - Activity Groups */}
        <ActivityGroups groups={data.groups} />
      </div>
    </A4Page>
  );
}
