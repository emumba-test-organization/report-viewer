import A4Page from "@/components/shared/A4Page";
import ActivityPlannerHeader from "./ActivityPlannerHeader";
import ActivitySlots from "./ActivitySlots";
import ActivityGroups from "./ActivityGroups";

export default function ActivityPlanner() {
  return (
    <A4Page>
      <ActivityPlannerHeader />

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-8">
        {/* Left Column - Activity Slots */}
        <ActivitySlots />

        {/* Right Column - Activity Groups */}
        <ActivityGroups />
      </div>
    </A4Page>
  );
}
