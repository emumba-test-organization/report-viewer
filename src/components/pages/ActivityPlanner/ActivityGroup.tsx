import { Badge, type BadgeVariantsType } from "@/components/ui/badge";
import ActivityItem from "./ActivityItem";

interface ActivityGroupProps {
  first?: boolean;
  last?: boolean;
  tags: Array<{
    name: string;
    color: string;
  }>;
  activities: Array<{
    name: string;
    duration: string;
    description: string;
  }>;
  additionalTags?: Array<{
    name: string;
    color: string;
  }>;
}

export default function ActivityGroup({
  tags,
  activities,
  additionalTags,
}: ActivityGroupProps) {
  return (
    <div>
      <div className="flex gap-1 p-1 bg-[#F0F0F0] border-4 border-[#F5F5F5] border-b-0 rounded-tl-md rounded-tr-md">
        {tags.map(({ name, color }) => (
          <Badge variant={color as BadgeVariantsType} className="px-1">
            {name}
          </Badge>
        ))}
      </div>
      <div className="border-4 border-[#F5F5F5] border-t-0 rounded-bl-md rounded-br-md">
        <div className="space-y-1 text-sm bg-white rounded-md p-2">
          {activities.map((activity, index) => (
            <ActivityItem
              key={index}
              isFirst={index === 0}
              isLast={index === activities.length - 1 && !additionalTags}
              name={activity.name}
              duration={activity.duration}
              description={activity.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
