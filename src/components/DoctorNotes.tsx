const DoctorNotes = ({ notes }) => {
  return (
    <section style={{ marginBottom: 20 }}>
      <h2>Doctor’s Notes</h2>
      <p
        style={{
          background: "#fafafa",
          padding: "10px",
          borderLeft: "4px solid #00539C",
        }}
      >
        {notes}
      </p>
    </section>
  );
};

export default DoctorNotes;
