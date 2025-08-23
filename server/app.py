import os
import json
import uuid
import tempfile
from flask import Flask, request, jsonify, send_file
from detection import run_on_video

app = Flask(__name__)

@app.get('/health')
def health():
  return jsonify({'status': 'ok'})

@app.post('/events')
def events():
  data = request.get_json(force=True)
  os.makedirs('events', exist_ok=True)
  with open(os.path.join('events', f"{uuid.uuid4().hex}.json"), 'w') as f:
    json.dump(data, f)
  return jsonify({'ok': True})

@app.post('/annotate')
def annotate():
  clip = request.files.get('clip')
  meta = json.loads(request.form.get('meta', '{}'))
  tmp_in = tempfile.NamedTemporaryFile(delete=False, suffix='.mp4')
  tmp_out = tempfile.NamedTemporaryFile(delete=False, suffix='.mp4')
  if clip:
    clip.save(tmp_in.name)
  run_on_video(
    tmp_in.name,
    tmp_out.name,
    meta.get('conf', float(os.getenv('CONF_THR', 0.25))),
    meta.get('iou', float(os.getenv('NMS_IOU', 0.45))),
    meta.get('labels')
  )
  tmp_in.close()
  return send_file(tmp_out.name, mimetype='video/mp4')

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000)
