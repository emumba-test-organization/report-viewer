import { Badge, type BadgeVariantsType } from "@/components/ui/badge";

interface ActivitySlotProps {
  time: string;
  title?: string;
  frequency: string;
  description?: string;
  category?: string;
  categoryColor?: string;
  alternate?: boolean;
}

export default function ActivitySlot({
  time,
  title,
  frequency,
  description,
  category,
  categoryColor,
  alternate = false,
}: ActivitySlotProps) {
  return (
    <div
      className={`flex items-center gap-4 p-4 h-[105px] ${
        alternate ? "bg-table-header/30" : "bg-transparent"
      }`}
    >
      <div className="text-xl text-center w-25">{time}</div>
      <div className="border-l border-border h-full w-1" />
      <div className="flex-1">
        {category && categoryColor && (
          <Badge
            variant={categoryColor as BadgeVariantsType}
            className="mr-2 px-1"
          >
            {category}
          </Badge>
        )}
        {title && <div className="text-sm font-medium">{title}</div>}
        {!title && category && (
          <span className="text-sm font-medium">{frequency}</span>
        )}
        {title && !category && (
          <div className="text-xs text-gray-600">{frequency}</div>
        )}
        {description && (
          <div className="text-xs text-gray-600 mt-1">{description}</div>
        )}
      </div>
    </div>
  );
}
