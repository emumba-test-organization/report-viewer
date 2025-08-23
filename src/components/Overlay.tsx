import React from 'react';
import {Canvas, Rect, Text} from '@shopify/react-native-skia';

export type Detection = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  conf: number;
};

export default function Overlay({detections}: {detections: Detection[]}) {
  return (
    <Canvas style={{flex: 1}}>
      {detections.map((d, idx) => (
        <React.Fragment key={idx}>
          <Rect
            x={d.x}
            y={d.y}
            width={d.w}
            height={d.h}
            color="rgba(0,255,0,0.3)"
            strokeWidth={2}
          />
          <Text
            x={d.x}
            y={d.y - 4}
            text={`${d.label} ${(d.conf).toFixed(2)}`}
            color="white"
          />
        </React.Fragment>
      ))}
    </Canvas>
  );
}

