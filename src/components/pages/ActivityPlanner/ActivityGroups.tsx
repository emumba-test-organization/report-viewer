import ActivityGroup from "./ActivityGroup";

export default function ActivityGroups() {
  const exerciseActivities = [
    {
      name: "Side to side Reach",
      duration: "5 min",
      description: "Reach one arm to the side, then to the other.",
    },
    {
      name: "Neck stretches",
      duration: "5 min",
      description: "Side-to-side, forward/backward",
    },
    {
      name: "Shoulder rolls & stretches",
      duration: "5 min",
      description: "Loosen upper back and shoulders",
    },
  ];

  const relaxationActivities = [
    {
      name: "Music",
      duration: "30 min",
      description: "Listen to calming music to unwind.",
    },
    {
      name: "Yoga",
      duration: "15 min",
      description:
        "1. Engage in a calming yoga session focusing on deep breathing and gentle stretches.\r\n2. Hold each pose for at least 30 seconds, allowing your body to relax and release tension.",
    },
    {
      name: "Shoulder rolls & stretches",
      duration: "1 min",
      description: "Loosen upper back and shoulders",
    },
  ];

  const groupBActivities = [
    {
      name: "(Activity)",
      duration: "15 min",
      description: "(Text)",
    },
  ];

  const groupCActivities = [
    {
      name: "Name the Object",
      duration: "3 min",
      description:
        '1. Hold up simple objects (ball, spoon, scarf).\n2. Ask: "What is this or what color is this?"',
    },
  ];

  const groupBTags = [
    { name: "Mental", color: "successEmphasis" },
    { name: "2 People", color: "dark" },
  ];

  return (
    <div>
      <h3 className="text-sm font-bold text-gray-900 pb-1">Activity Groups</h3>

      <div className="space-y-2">
        <ActivityGroup
          first
          tags={[{ name: "Exercise", color: "infoEmphasis" }]}
          activities={exerciseActivities}
        />

        <ActivityGroup
          tags={[{ name: "Relaxation", color: "warning" }]}
          activities={relaxationActivities}
        />

        <ActivityGroup
          last
          tags={[{ name: "Group B", color: "blueEmphasis" }]}
          activities={groupBActivities}
        />
        <ActivityGroup tags={groupBTags} activities={groupCActivities} />
      </div>
    </div>
  );
}
