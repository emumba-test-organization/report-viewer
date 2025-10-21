import ActivityGroup from "./ActivityGroup";

type Activity = {
  name: string;
  duration: string;
  description: string;
};

type Tags = {
  name: string;
  color: string;
};

export type ActivityGroupType = {
  tags: Tags[];
  activities: Activity[];
};

export default function ActivityGroups({
  groups,
}: {
  groups: ActivityGroupType[];
}) {
  return (
    <div>
      <h3 className="font-bold pb-1">Activity Groups</h3>

      <div className="space-y-2">
        {groups.map(({ tags, activities }, index) => {
          return (
            <div key={index} className="space-y-2">
              <ActivityGroup
                first={index === 0}
                last={index === groups.length - 1}
                tags={tags}
                activities={activities}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
