import "./Spectrum.css";

const Spectrum = ({
  min = 0,
  max = 20,
  target = 6.9,
  current = 13,
  veryHigh = 12,
  targetLabel = "Target <",
  veryHighLabel = "Very High",
}) => {
  // Convert value to percentage
  const toPercent = (value: number) => ((value - min) / (max - min)) * 100;

  const targetPos = toPercent(target);
  const currentPos = toPercent(current);
  const veryHighPos = toPercent(veryHigh);

  return (
    <div className="spectrum-container">
      <div className="spectrum-bar" />

      {/* Target Marker */}
      <div className="spectrum-marker" style={{ left: `${targetPos}%` }}>
        <div className="marker-line"></div>
        <div className="marker-label">{`${targetLabel} ${target}`}</div>
      </div>

      {/* Current Value Box */}
      <div className="spectrum-current" style={{ left: `${currentPos}%` }}>
        {current}
      </div>

      {/* Very High Marker */}
      <div className="spectrum-marker" style={{ left: `${veryHighPos}%` }}>
        <div className="marker-line"></div>
        <div className="marker-label">{veryHighLabel}</div>
      </div>
    </div>
  );
};

export default Spectrum;
