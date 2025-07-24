import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";

const DoctorNotes = ({ notes }) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Doctor’s Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="border-l-4 border-primary pl-3 bg-muted/50 py-2">{notes}</p>
      </CardContent>
    </Card>
  );
};

export default DoctorNotes;
