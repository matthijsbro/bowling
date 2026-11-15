// The line to the server, for online play. Offline, none of this is touched.
import type { Ev, View } from '../shared/engine.ts';

export type Room = { team: string; members: { name: string; online: boolean }[]; rules: string[]; you: number; game: View | null };
export type Account = { email: string; rules: string[]; games: { at: number; score: number; frames: number; mode: string; title: string }[] };
type Out = { t: 'create' | 'join'; team?: string; name: string; token: string } | { t: 'start'; length: 5 | 10 } | { t: 'ev'; ev: Ev } | { t: 'leave' } | { t: 'forget' };

let sock: WebSocket | null = null, rejoin: Out | null = null, wanted = false;
let onRoom: (r: Room) => void = () => {}, onError: (msg: string) => void = () => {};

// a random secret kept on this device: it is what lets you back into your seat after a reconnect
export const token = () => {
  try { return (localStorage['sd.token'] ??= crypto.randomUUID()); } catch { return crypto.randomUUID(); }
};
/** The login API. Every call answers with the account, an error message, or nothing. */
export async function api(path: string, body?: unknown): Promise<{ account?: Account; error?: string }> {
  try {
    const r = await fetch(`/api/${path}`, body === undefined ? undefined : { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
    const j = await r.json();
    return r.ok ? { account: j.email ? j : undefined } : { error: j.error ?? 'Something went wrong.' };
  } catch { return { error: 'The server cannot be reached.' }; }
}
export const serverUp = () => fetch('/api/health').then((r) => r.ok && r.headers.get('content-type')?.includes('json') === true, () => false);

export function connect(first: Out, room: (r: Room) => void, error: (msg: string) => void) {
  onRoom = room; onError = error; rejoin = first; wanted = true;
  open();
}
function open() {
  sock = new WebSocket(`${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/ws`);
  sock.onopen = () => sock!.send(JSON.stringify(rejoin));
  sock.onmessage = (m) => {
    const msg = JSON.parse(m.data);
    if (msg.t === 'room') {
      rejoin = { t: 'join', team: msg.team, name: msg.members[msg.you].name, token: token() }; // after a drop, come back to the same seat
      onRoom(msg);
    } else if (msg.t === 'error') onError(msg.msg);
  };
  sock.onclose = () => { if (wanted) setTimeout(open, 2000); };
}
export const send = (msg: Out) => { if (sock?.readyState === WebSocket.OPEN) sock.send(JSON.stringify(msg)); };
export function leave() { wanted = false; send({ t: 'leave' }); sock?.close(); sock = null; }
