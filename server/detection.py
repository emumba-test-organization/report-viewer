import os
from typing import List, Optional
from ultralytics import YOLO
import cv2

_model: Optional[YOLO] = None

def load_model() -> YOLO:
  global _model
  if _model is None:
    path = os.getenv('MODEL_PATH', 'models/yolo.pt')
    _model = YOLO(path)
  return _model

def run_on_video(path_in: str, path_out: str, conf: float, iou: float, labels: Optional[List[str]] = None):
  model = load_model()
  cap = cv2.VideoCapture(path_in)
  fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
  w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
  h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
  fourcc = cv2.VideoWriter_fourcc(*'mp4v')
  writer = cv2.VideoWriter(path_out, fourcc, fps, (w, h))
  while True:
    ret, frame = cap.read()
    if not ret:
      break
    res = model(frame, conf=conf, iou=iou)[0]
    for box in res.boxes:
      x1, y1, x2, y2 = box.xyxy[0].tolist()
      cls = int(box.cls)
      label = labels[cls] if labels and cls < len(labels) else str(cls)
      cf = float(box.conf)
      cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
      cv2.putText(frame, f"{label} {cf:.2f}", (int(x1), int(y1) - 2), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1)
    writer.write(frame)
  cap.release()
  writer.release()
  return path_out
