/**
 * DashCam screen
 *
 * Install deps:
 *   npm i react-native-vision-camera react-native-worklets-core @shopify/react-native-skia react-native-fast-tflite expo-keep-awake react-native-permissions react-native-reanimated
 *
 * Prebuild & run:
 *   npx expo prebuild
 *   eas build --profile development
 *   expo start --dev-client
 *
 * app.json plugin snippets:
 *   {
 *     "plugins": [
 *       "react-native-vision-camera",
 *       "@shopify/react-native-skia",
 *       ["react-native-fast-tflite", { "models": ["./assets/models/yolo-int8.tflite"] }]
 *     ]
 *   }
 *
 * Android/iOS permission strings should include camera usage descriptions.
 * Android manifest also requires a Foreground Service notification channel for long sessions.
 */

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {Camera, useCameraDevices, useFrameProcessor} from 'react-native-vision-camera';
import {runOnJS} from 'react-native-reanimated';
import {useTFLiteModel} from 'react-native-fast-tflite';
import type {Frame} from 'react-native-vision-camera';

import Overlay from '../components/Overlay';
import labels from '../../assets/models/labels.json';
import meta from '../../assets/models/model.meta.json';
import {postprocess} from '../ml/postprocess';
import {sendEvents} from '../net/uploader';

const INFERENCE_SIZE = meta.inputSize || 320;
const FRAME_PROCESSOR_FPS = 12;
const PREVIEW_FPS = 30;
const TOP_K = 20;
const CONF_THR = meta.confThr || 0.25;
const NMS_IOU = meta.nmsIou || 0.45;

type Detection = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  conf: number;
};

export default function DashCam() {
  const devices = useCameraDevices();
  const device = devices.back;
  const cameraRef = useRef<Camera>(null);
  const [running, setRunning] = useState(false);
  const [detections, setDetections] = useState<Detection[]>([]);
  const lastInference = useRef(0);
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const model = useTFLiteModel(require('../../assets/models/yolo-int8.tflite'));

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      if (status !== 'authorized') {
        console.warn('Camera permission not granted');
      }
    })();
  }, []);

  const frameProcessor = useFrameProcessor((frame: Frame) => {
    'worklet';
    if (model.state !== 'loaded') return;
    const now = Date.now();
    if (now - lastInference.current < 1000 / FRAME_PROCESSOR_FPS) return;
    lastInference.current = now;
    const result = model.runSync(frame, {
      inputShape: [1, INFERENCE_SIZE, INFERENCE_SIZE, 3],
    }) as Float32Array;
    const boxes = postprocess(result, frame.width, frame.height, labels, {
      inputSize: INFERENCE_SIZE,
      confThr: CONF_THR,
      nmsIou: NMS_IOU,
    }, TOP_K);
    runOnJS(setDetections)(boxes);
  }, [model]);

  const start = useCallback(() => setRunning(true), []);
  const stop = useCallback(() => {
    setRunning(false);
    setDetections([]);
  }, []);

  useEffect(() => {
    if (!running || detections.length === 0) return;
    // Optional hook to send events
    runOnJS(sendEvents)(detections);
  }, [running, detections]);

  return (
    <View style={styles.container}>
      {device && (
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={running}
          fps={PREVIEW_FPS}
          frameProcessor={frameProcessor}
          frameProcessorFps={FRAME_PROCESSOR_FPS}
        />
      )}
      <Overlay detections={detections} />
      <View style={styles.controls}>
        <Button title={running ? 'Stop' : 'Start'} onPress={running ? stop : start} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  controls: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
});

