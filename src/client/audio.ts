// Every sound is made here from oscillators and noise. No audio files.
let ac: AudioContext | null = null, out: GainNode | null = null, roll: { g: GainNode; stop: () => void } | null = null;
let muted = (() => { try { return localStorage.getItem('sd.mute') === '1'; } catch { return false; } })();

export const isMuted = () => muted;
export function setMuted(m: boolean) {
  muted = m;
  try { localStorage.setItem('sd.mute', m ? '1' : '0'); } catch { /* private mode: forget it */ }
  if (out) out.gain.value = m ? 0 : 0.5;
  if (m) rollStop();
}
/** Browsers only allow sound after a tap. Call this from the first one. */
export function unlock() {
  if (!ac) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    ac = new AC(); out = ac.createGain(); out.gain.value = muted ? 0 : 0.5; out.connect(ac.destination);
  }
  if (ac.state === 'suspended') void ac.resume();
}

type Wave = OscillatorType;
/** One note: from `f` sliding to `to`, starting `at` seconds from now. */
function tone(f: number, dur: number, { type = 'square' as Wave, vol = 0.2, to = f, at = 0 } = {}) {
  if (!ac || !out || muted) return;
  const t = ac.currentTime + at, o = ac.createOscillator(), g = ac.createGain();
  o.type = type; o.frequency.setValueAtTime(f, t); o.frequency.exponentialRampToValueAtTime(Math.max(20, to), t + dur);
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o.connect(g).connect(out); o.start(t); o.stop(t + dur + 0.02);
}
function noiseBuffer(seconds: number) {
  const b = ac!.createBuffer(1, Math.ceil(ac!.sampleRate * seconds), ac!.sampleRate), d = b.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return b;
}
/** A burst of filtered noise: crashes, splats, thuds. */
function noise(dur: number, o: { vol?: number; freq?: number; q?: number; at?: number; kind?: BiquadFilterType; to?: number } = {}) {
  if (!ac || !out || muted) return;
  const { vol = 0.3, freq = 1200, q = 1, at = 0, kind = 'bandpass' } = o, to = o.to ?? freq;
  const t = ac.currentTime + at, src = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
  src.buffer = noiseBuffer(dur); f.type = kind; f.Q.value = q;
  f.frequency.setValueAtTime(freq, t); f.frequency.exponentialRampToValueAtTime(Math.max(30, to), t + dur);
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  src.connect(f).connect(g).connect(out); src.start(t);
}

/** The ball rumbling down the lane, until it stops. */
export function rollStart() {
  if (!ac || !out || muted || roll) return;
  const src = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
  src.buffer = noiseBuffer(1); src.loop = true; f.type = 'lowpass'; f.frequency.value = 260; g.gain.value = 0.28;
  src.connect(f).connect(g).connect(out); src.start();
  roll = { g, stop: () => src.stop() };
}
export function rollStop() {
  if (!roll || !ac) return;
  roll.g.gain.setTargetAtTime(0, ac.currentTime, 0.05);
  const r = roll; roll = null;
  setTimeout(() => r.stop(), 300);
}

export const sfx = {
  click: () => tone(520, 0.06, { type: 'triangle', vol: 0.12, to: 320 }),
  blip: () => [0, 0.07, 0.14].forEach((at, i) => tone(300 + i * 40, 0.05, { type: 'square', vol: 0.06, at })),
  thump: () => { noise(0.25, { vol: 0.6, freq: 180, kind: 'lowpass', to: 60 }); tone(110, 0.2, { type: 'sine', vol: 0.5, to: 45 }); },
  split: () => [0, 0.22, 0.44].forEach((at) => tone(620, 0.2, { type: 'sawtooth', vol: 0.16, to: 380, at })),
  crash: (big = 1) => { for (let i = 0; i < 5; i++) noise(0.12 + Math.random() * 0.15, { vol: 0.3 * big, freq: 1400 + Math.random() * 2600, q: 3, at: i * 0.045 }); tone(180, 0.2, { type: 'triangle', vol: 0.18 * big, to: 90 }); },
  gutter: () => { tone(140, 0.3, { type: 'sine', vol: 0.3, to: 60 }); noise(0.3, { vol: 0.2, freq: 300, kind: 'lowpass' }); },
  clang: () => [820, 1230, 1790].forEach((f) => tone(f, 0.5, { type: 'sine', vol: 0.12, to: f * 0.98 })),
  splat: () => { noise(0.35, { vol: 0.55, freq: 900, kind: 'lowpass', to: 120 }); tone(90, 0.25, { type: 'sine', vol: 0.4, to: 40 }); noise(0.5, { vol: 0.15, freq: 2500, q: 6, at: 0.08, to: 600 }); },
  honk: () => { tone(330, 0.18, { type: 'sawtooth', vol: 0.18, to: 300 }); tone(250, 0.28, { type: 'sawtooth', vol: 0.18, to: 210, at: 0.16 }); },
  pop: () => { noise(0.08, { vol: 0.4, freq: 2000, q: 0.7 }); [660, 880, 1100].forEach((f, i) => tone(f, 0.12, { type: 'triangle', vol: 0.12, at: 0.03 + i * 0.05 })); },
  pfft: () => noise(0.5, { vol: 0.2, freq: 500, q: 0.5, to: 150 }),
  strike: () => [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tone(f, i === 5 ? 0.45 : 0.13, { type: 'square', vol: 0.14, at: i * 0.11 })),
  spare: () => [784, 1047].forEach((f, i) => tone(f, 0.2, { type: 'triangle', vol: 0.18, at: i * 0.12 })),
  // wah, wah, wah, waaah
  trombone: () => [[311, 294], [294, 277], [277, 262], [262, 196]].forEach(([f, to], i) => tone(f, i === 3 ? 0.8 : 0.3, { type: 'sawtooth', vol: 0.15, to, at: i * 0.34 })),
  fanfare: () => [392, 392, 392, 523, 466, 523, 659].forEach((f, i) => tone(f, i > 4 ? 0.5 : 0.14, { type: 'square', vol: 0.14, at: i * 0.15 })),
  coo: () => [0, 0.25].forEach((at) => tone(420, 0.2, { type: 'sine', vol: 0.2, to: 330, at })),
  flap: () => { for (let i = 0; i < 6; i++) noise(0.05, { vol: 0.25, freq: 800, q: 0.6, at: i * 0.07 }); },
  clunk: () => { noise(0.1, { vol: 0.5, freq: 250, kind: 'lowpass' }); tone(70, 0.3, { type: 'square', vol: 0.15, to: 50, at: 0.12 }); },
  crunch: () => { for (let i = 0; i < 4; i++) noise(0.04, { vol: 0.3, freq: 3000 + Math.random() * 2000, q: 2, at: i * 0.05 }); },
  squeak: () => tone(900, 0.12, { type: 'sine', vol: 0.15, to: 1500 }),
  sneeze: () => { noise(0.25, { vol: 0.15, freq: 3000, q: 1, to: 5000 }); noise(0.3, { vol: 0.5, freq: 1500, kind: 'lowpass', at: 0.3, to: 300 }); },
};
