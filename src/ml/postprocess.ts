export type Detection = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  conf: number;
  id?: number;
};

export interface Meta {
  inputSize: number;
  confThr: number;
  nmsIou: number;
}

export function postprocess(
  output: Float32Array,
  frameWidth: number,
  frameHeight: number,
  labels: string[],
  meta: Meta,
  topK: number
): Detection[] {
  const stride = 5 + labels.length;
  const numDet = output.length / stride;
  const proposals: Detection[] = [];
  for (let i = 0; i < numDet; i++) {
    const o = i * stride;
    const conf = output[o + 4];
    if (conf < meta.confThr) continue;
    let best = 0;
    let cls = 0;
    for (let c = 0; c < labels.length; c++) {
      const score = output[o + 5 + c] * conf;
      if (score > best) {
        best = score;
        cls = c;
      }
    }
    const cx = output[o];
    const cy = output[o + 1];
    const w = output[o + 2];
    const h = output[o + 3];
    const x = (cx - w / 2) / meta.inputSize * frameWidth;
    const y = (cy - h / 2) / meta.inputSize * frameHeight;
    proposals.push({
      x,
      y,
      w: (w / meta.inputSize) * frameWidth,
      h: (h / meta.inputSize) * frameHeight,
      label: labels[cls] || String(cls),
      conf: best,
    });
  }
  return nms(proposals, meta.nmsIou, topK);
}

export function nms(dets: Detection[], iouThr: number, topK: number): Detection[] {
  const res: Detection[] = [];
  dets.sort((a, b) => b.conf - a.conf);
  for (const d of dets) {
    if (res.length >= topK) break;
    let keep = true;
    for (const r of res) {
      if (iou(d, r) > iouThr) {
        keep = false;
        break;
      }
    }
    if (keep) res.push(d);
  }
  return res;
}

export function iou(a: Detection, b: Detection): number {
  const x1 = Math.max(a.x, b.x);
  const y1 = Math.max(a.y, b.y);
  const x2 = Math.min(a.x + a.w, b.x + b.w);
  const y2 = Math.min(a.y + a.h, b.y + b.h);
  const inter = Math.max(0, x2 - x1) * Math.max(0, y2 - y1);
  const union = a.w * a.h + b.w * b.h - inter;
  return union === 0 ? 0 : inter / union;
}

// simple IOU tracker
export class SimpleTracker {
  private tracks: Detection[] = [];
  private nextId = 0;

  update(dets: Detection[]): Detection[] {
    const updated: Detection[] = [];
    for (const d of dets) {
      let best = -1;
      let bestIoU = 0;
      for (let i = 0; i < this.tracks.length; i++) {
        const iouVal = iou(d, this.tracks[i]);
        if (iouVal > bestIoU) {
          bestIoU = iouVal;
          best = i;
        }
      }
      if (best !== -1 && bestIoU > 0.3) {
        d.id = this.tracks[best].id;
        this.tracks[best] = d;
      } else {
        d.id = this.nextId++;
        this.tracks.push(d);
      }
      updated.push(d);
    }
    this.tracks = updated;
    return updated;
  }
}

