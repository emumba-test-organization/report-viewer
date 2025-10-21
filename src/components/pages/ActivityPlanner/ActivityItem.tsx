interface ActivityItemProps {
  name: string;
  duration: string;
  description: string;
  isLast?: boolean;
  isFirst?: boolean;
}

export default function ActivityItem({ name, duration, description, isLast = false, isFirst = false }: ActivityItemProps) {
    const borderBottomClass = isLast ? "rounded-bl-md rounded-br-md pb-2" : "";
    const borderTopClass = isFirst ? "rounded-tl-md rounded-tr-md pt-2" : "";
    
  return (
    <div className={`bg-white px-2 ${borderBottomClass} ${borderTopClass}`}>
      <div className="font-semibold">{name}</div>
      <div className="font-semibold text-sm">Duration: {duration}</div>
      <p className="font-normal text-sm">
        {description}
      </p>
      {!isLast && <hr className="my-2 border-border" />}
    </div>
  );
}