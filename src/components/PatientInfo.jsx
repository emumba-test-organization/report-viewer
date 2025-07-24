import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";

const PatientInfo = ({ info }) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Patient Information</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-y-1">
          {Object.entries(info).map(([label, value]) => (
            <div key={label} className="flex gap-2">
              <dt className="font-medium w-40">{label}:</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
};

export default PatientInfo;
