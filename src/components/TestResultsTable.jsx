import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";

const TestResultsTable = ({ results }) => {
  if (!results.length) return null;

  const headers = Object.keys(results[0]);

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Test Results</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-muted">
            <tr>
              {headers.map((h) => (
                <th key={h} className="border px-3 py-2 text-left font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((row, i) => (
              <tr key={i} className="even:bg-muted/50">
                {headers.map((h) => (
                  <td key={h} className="border px-3 py-2">
                    {row[h]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default TestResultsTable;
