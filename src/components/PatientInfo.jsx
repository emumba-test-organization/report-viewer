const PatientInfo = ({ info }) => {
  return (
    <section style={{ marginBottom: 20 }}>
      <h2>Patient Information</h2>
      <dl>
        {Object.entries(info).map(([label, value]) => (
          <div key={label} style={{ marginBottom: 4 }}>
            <dt style={{ fontWeight: "bold", display: "inline" }}>{label}: </dt>
            <dd style={{ display: "inline" }}>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default PatientInfo;
