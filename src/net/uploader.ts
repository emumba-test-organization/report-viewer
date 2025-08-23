import {API_BASE, SEND_EVENTS, UPLOAD_CLIPS} from '../config';

export async function sendEvents(events: Record<string, unknown>[]): Promise<void> {
  if (!SEND_EVENTS) return;
  try {
    await fetch(`${API_BASE}/events`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({events}),
    });
  } catch (e) {
    console.warn('sendEvents error', e);
  }
}

export async function uploadClip(
  fileUri: string,
  meta: Record<string, unknown>
): Promise<void> {
  if (!UPLOAD_CLIPS) return;
  try {
    const data = new FormData();
    data.append('clip', {
      uri: fileUri,
      type: 'video/mp4',
      name: 'clip.mp4',
    } as unknown as { uri: string; type: string; name: string });
    data.append('meta', JSON.stringify(meta));
    await fetch(`${API_BASE}/annotate`, {
      method: 'POST',
      body: data,
    });
  } catch (e) {
    console.warn('uploadClip error', e);
  }
}
