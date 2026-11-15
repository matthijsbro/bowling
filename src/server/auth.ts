// Accounts without passwords: you give an email address, the server mails a six-digit code, you type it in.
// Nothing here is needed to play; an account only carries your history and remembered rules between devices.
import { createHash, randomBytes, randomInt, timingSafeEqual } from 'node:crypto';
import type { DatabaseSync } from 'node:sqlite';

const CODE_MINUTES = 10, MAX_TRIES = 5, WINDOW = 10 * 60e3;
const sha = (s: string) => createHash('sha256').update(s).digest('hex');
const sameHash = (a: string, b: string) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));
export const cleanEmail = (v: unknown) => {
  const e = typeof v === 'string' ? v.trim().toLowerCase() : '';
  return e.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) ? e : '';
};

// how often an address or a caller may ask for a code; kept in memory, which is enough for one server
const asked = new Map<string, number[]>();
function allow(key: string, max: number, now: number) {
  const recent = (asked.get(key) ?? []).filter((t) => now - t < WINDOW);
  if (recent.length >= max) { asked.set(key, recent); return false; }
  asked.set(key, [...recent, now]);
  return true;
}

/** Makes a code for this address and hands it to `send`. Says "ok" either way unless the caller is asking too often. */
export async function requestCode(db: DatabaseSync, emailIn: unknown, ip: string, now: number, send: (email: string, code: string) => Promise<void> | void): Promise<'ok' | 'bad-email' | 'too-many'> {
  const email = cleanEmail(emailIn);
  if (!email) return 'bad-email';
  if (!allow(`ip:${ip}`, 10, now) || !allow(`mail:${email}`, 3, now)) return 'too-many';
  const code = String(randomInt(1e6)).padStart(6, '0');
  db.prepare('INSERT OR REPLACE INTO codes (email, hash, expires, tries) VALUES (?, ?, ?, 0)').run(email, sha(`${email}:${code}`), now + CODE_MINUTES * 60e3);
  await send(email, code);
  return 'ok';
}

/** Right code in time: you get a session token. Wrong five times and the code is dead. */
export function verifyCode(db: DatabaseSync, emailIn: unknown, codeIn: unknown, now: number): { token: string; email: string } | null {
  const email = cleanEmail(emailIn), code = typeof codeIn === 'string' ? codeIn.replace(/\D/g, '') : '';
  const row = email && (db.prepare('SELECT hash, expires, tries FROM codes WHERE email = ?').get(email) as { hash: string; expires: number; tries: number } | undefined);
  if (!row) return null;
  if (row.expires < now || row.tries >= MAX_TRIES) { db.prepare('DELETE FROM codes WHERE email = ?').run(email); return null; }
  if (!sameHash(row.hash, sha(`${email}:${code}`))) { db.prepare('UPDATE codes SET tries = tries + 1 WHERE email = ?').run(email); return null; }
  db.prepare('DELETE FROM codes WHERE email = ?').run(email);
  db.prepare('INSERT OR IGNORE INTO users (email, created) VALUES (?, ?)').run(email, now);
  const user = (db.prepare('SELECT id FROM users WHERE email = ?').get(email) as { id: number }).id;
  const token = randomBytes(32).toString('hex');
  db.prepare('INSERT INTO sessions (hash, user, created) VALUES (?, ?, ?)').run(sha(token), user, now); // only the hash is kept
  return { token, email };
}

export const userOf = (db: DatabaseSync, token: string | undefined): number | undefined =>
  token ? (db.prepare('SELECT user FROM sessions WHERE hash = ?').get(sha(token)) as { user: number } | undefined)?.user : undefined;
export const signOut = (db: DatabaseSync, token: string) => { db.prepare('DELETE FROM sessions WHERE hash = ?').run(sha(token)); };

export type Played = { score: number; frames: number; mode: string; title: string };
export function recordGame(db: DatabaseSync, user: number, g: Played, now: number) {
  db.prepare('INSERT INTO games (user, at, score, frames, mode, title) VALUES (?, ?, ?, ?, ?, ?)')
    .run(user, now, Math.round(Number(g.score)) || 0, g.frames === 10 ? 10 : 5, String(g.mode).slice(0, 10), String(g.title).slice(0, 120));
}
export function setRules(db: DatabaseSync, user: number, rules: unknown) {
  const list = Array.isArray(rules) ? rules.filter((r): r is string => typeof r === 'string' && r.length < 30).slice(0, 5) : [];
  db.prepare('UPDATE users SET rules = ? WHERE id = ?').run(JSON.stringify(list), user);
}
export function profile(db: DatabaseSync, user: number) {
  const u = db.prepare('SELECT email, rules FROM users WHERE id = ?').get(user) as { email: string; rules: string } | undefined;
  if (!u) return null;
  const games = db.prepare('SELECT at, score, frames, mode, title FROM games WHERE user = ? ORDER BY at DESC LIMIT 12').all(user);
  return { email: u.email, rules: JSON.parse(u.rules) as string[], games };
}
