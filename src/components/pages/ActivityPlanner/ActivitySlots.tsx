import ActivitySlot from "./ActivitySlot";

const slots = [
  {
    time: "08:00 AM",
    title: "Physiotherapy Exercise",
    frequency: "Daily",
  },
  {
    time: "09:30 AM",
    category: "Exercise",
    categoryColor: "infoEmphasis",
    frequency: "Daily",
    description: "Any one activity from Exercise",
  },
  {
    time: "12:30 PM",
    category: "Mental",
    categoryColor: "successEmphasis",
    frequency: "Alternating Days",
    description: "Any one activity from Mental",
  },
  {
    time: "05:00 PM",
    category: "Relaxation",
    categoryColor: "warning",
    frequency: "Daily",
    description: "Any five activities from Relaxation",
  },
  {
    time: "07:00 PM",
    category: "Group B",
    categoryColor: "blueEmphasis",
    frequency: "Fridays",
    description: "Any one activity from Group B",
  },
  {
    time: "09:30 PM",
    title: "Physiotherapy Exercise",
    frequency: "Daily",
  },
];

export default function ActivitySlots() {
  return (
    <div>
      <div className="border border-gray-300">
        <h3 className="text-sm font-bold bg-table-header p-3">
          Activity Slots
        </h3>

        <div className="">
          {slots.map((slot, index) => (
            <ActivitySlot
              alternate={index % 2 === 1}
              key={index}
              time={slot.time}
              title={slot.title}
              category={slot.category}
              categoryColor={slot.categoryColor}
              frequency={slot.frequency}
              description={slot.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
