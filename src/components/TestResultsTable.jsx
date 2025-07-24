const TestResultsTable = ({ results }) => {
  if (!results.length) return null;

  const headers = Object.keys(results[0]);

  return (
    <section style={{ marginBottom: 20 }}>
      <h2>Test Results</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                  background: "#f0f0f0",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.map((row, i) => (
            <tr key={i}>
              {headers.map((h) => (
                <td
                  key={h}
                  style={{ border: "1px solid #ccc", padding: "8px" }}
                >
                  {row[h]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default TestResultsTable;
