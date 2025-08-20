type SpectrumProps = {
  inverse?: boolean;
  min?: number;
  max?: number;
  current?: number;
  width?: number;
  height?: number;
  showMinMaxLabel?: boolean;

  // Optional markers
  veryLow?: number;
  veryLowLabel?: string;

  low?: number;
  lowLabel?: string;

  normal?: number;
  normalLabel?: string;

  high?: number;
  highLabel?: string;

  veryHigh?: number;
  veryHighLabel?: string;

  target?: number;
  targetLabel?: string;
};

const Spectrum = ({
  inverse = false,
  min = 0,
  max = 20,
  current = 13,
  width = 600,
  height = 60,
  showMinMaxLabel = false,

  // Optional markers
  veryLow,
  veryLowLabel = "Very Low",

  low,
  lowLabel = "Low",

  normal,
  normalLabel = "Normal",

  high,
  highLabel = "High",

  veryHigh,
  veryHighLabel = "Very High",

  target,
  targetLabel = "Target <",
}: SpectrumProps) => {
  {
    /* Function to render a marker */
  }
  const renderMarker = (value: number, label: string) => {
    const x = xPos(value);
    return (
      <>
        <line
          x1={x}
          y1={barY + barHeight}
          x2={x}
          y2={barY + barHeight + markerLineHeight}
          stroke="black"
          strokeWidth="1"
        />
        <text
          x={x}
          y={barY + barHeight + markerLineHeight + 12}
          fontSize="12"
          textAnchor="middle"
        >
          {label}
        </text>
      </>
    );
  };

  const barHeight = 20;
  const markerLineHeight = 10;
  const padding = 20;

  const xPos = (value: number) =>
    padding + ((value - min) / (max - min)) * (width - 2 * padding);

  const barY = height / 2 - barHeight / 2;

  return (
    <svg width={width} height={height}>
      {/* Gradient */}
      <defs>
        <linearGradient
          id={`spectrumGradient-${inverse ? "inverse" : "normal"}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor={inverse ? "red" : "green"} />
          <stop offset="50%" stopColor="gold" />
          <stop offset="100%" stopColor={inverse ? "green" : "red"} />
        </linearGradient>
      </defs>

      {/* Bar */}
      <rect
        x={padding}
        y={barY}
        width={width - 2 * padding}
        height={barHeight}
        fill={`url(#spectrumGradient-${inverse ? "inverse" : "normal"})`}
      />

      {/* Min / Max labels */}
      {showMinMaxLabel && (
        <>
          <text x={padding} y={barY - 5} fontSize="12" textAnchor="middle">
            {min}
          </text>
          <text
            x={width - padding}
            y={barY - 5}
            fontSize="12"
            textAnchor="middle"
          >
            {max}
          </text>
        </>
      )}

      {/* Optional markers */}
      {veryLow !== undefined && renderMarker(veryLow, veryLowLabel)}
      {low !== undefined && renderMarker(low, lowLabel)}
      {normal !== undefined && renderMarker(normal, normalLabel)}
      {high !== undefined && renderMarker(high, highLabel)}
      {veryHigh !== undefined && renderMarker(veryHigh, veryHighLabel)}
      {target !== undefined && renderMarker(target, `${targetLabel}`)}

      {/* Current value highlight */}
      <g>
        <rect
          x={xPos(current) - 14}
          y={barY}
          width="28"
          height={barHeight}
          fill="#ffffff66"
        />
        <rect
          x={xPos(current) - 14}
          y={barY}
          width="1"
          height={barHeight}
          fill="#fff"
        />
        <rect
          x={xPos(current) + 14}
          y={barY}
          width="1"
          height={barHeight}
          fill="#fff"
        />
        <text
          x={xPos(current)}
          y={barY + barHeight / 2 + 4}
          fontSize="12"
          textAnchor="middle"
          fontWeight="bolder"
          stroke="#fff"
          strokeWidth={0.3}
        >
          {current}
        </text>
      </g>
    </svg>
  );
};

export default Spectrum;
