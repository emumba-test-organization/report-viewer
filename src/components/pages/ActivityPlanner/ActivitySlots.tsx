import ActivitySlot from "./ActivitySlot";

export type ActivitySlotType = {
  time: string;
  title?: string;
  category?: string;
  categoryColor?: string;
  frequency: string;
  description?: string;
};

export default function ActivitySlots({
  slots,
}: {
  slots: ActivitySlotType[];
}) {
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
