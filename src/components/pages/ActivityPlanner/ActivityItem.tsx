interface ActivityItemProps {
  name: string;
  duration: string;
  description: string;
  isLast?: boolean;
  isFirst?: boolean;
}

export default function ActivityItem({ name, duration, description, isLast = false, isFirst = false }: ActivityItemProps) {
    const borderBottomClass = isLast ? "rounded-bl-md rounded-br-md" : "border-b";
    const borderTopClass = isFirst ? "rounded-tl-md rounded-tr-md" : "";
    
  return (
    <div className={`${borderBottomClass} ${borderTopClass}`}>
      <div className="font-semibold">{name}</div>
      <div className="font-semibold">Duration: {duration}</div>
      <p className="font-light text-sm">
        {description}
      </p>
    </div>
  );
}