// Every limit the server enforces, in one place. Each one can be changed with an environment
// variable of the same name (see .env.example). Setting a limit to 0 switches it off.
import type { IncomingMessage } from 'node:http';

const num = (name: string, fallback: number) => {
  const v = Number(process.env[name]);
  return process.env[name] !== undefined && process.env[name] !== '' && Number.isFinite(v) && v >= 0 ? v : fallback;
};

export const LIMITS = {
  // teams
  TEAMS_PER_HOUR_PER_IP: num('TEAMS_PER_HOUR_PER_IP', 10),
  TEAMS_PER_HOUR: num('TEAMS_PER_HOUR', 300),
  MAX_TEAMS: num('MAX_TEAMS', 5000),                       // teams stored at once; unused ones are forgotten after 30 days
  JOINS_PER_MINUTE_PER_IP: num('JOINS_PER_MINUTE_PER_IP', 30), // also stops anyone guessing team ids
  // accounts and login codes
  ACCOUNTS_PER_DAY_PER_IP: num('ACCOUNTS_PER_DAY_PER_IP', 5),
  ACCOUNTS_PER_DAY: num('ACCOUNTS_PER_DAY', 200),
  MAX_ACCOUNTS: num('MAX_ACCOUNTS', 10000),
  CODES_PER_10_MIN_PER_IP: num('CODES_PER_10_MIN_PER_IP', 10),
  CODES_PER_10_MIN_PER_ADDRESS: num('CODES_PER_10_MIN_PER_ADDRESS', 3),
  // load
  MAX_CONNECTIONS: num('MAX_CONNECTIONS', 500),            // open game connections, all players together
  MAX_CONNECTIONS_PER_IP: num('MAX_CONNECTIONS_PER_IP', 20), // one household on one wifi still fits
  MESSAGES_PER_10_SECONDS: num('MESSAGES_PER_10_SECONDS', 100), // game messages (votes, throws) per open game connection; not mail
};
export type Limit = keyof typeof LIMITS;

/** The server runs behind Caddy, which sets X-Forwarded-For. Set TRUST_PROXY=0 when it faces the internet directly,
 *  or anyone could pick their own address and slip past the per-address limits. */
const TRUST_PROXY = !['0', 'false', 'no'].includes(String(process.env.TRUST_PROXY ?? '').toLowerCase());
export const ipOf = (req: IncomingMessage) =>
  (TRUST_PROXY && String(req.headers['x-forwarded-for'] ?? '').split(',')[0].trim()) || req.socket.remoteAddress || 'unknown';

/** Counts events per key over a sliding time window, against one of the LIMITS. Kept in memory: enough for one server. */
export class Window {
  private hits = new Map<string, number[]>();
  private limit: Limit; private ms: number;
  constructor(limit: Limit, ms: number) { this.limit = limit; this.ms = ms; }
  private recent(key: string, now: number) {
    const list = (this.hits.get(key) ?? []).filter((t) => now - t < this.ms);
    if (list.length) this.hits.set(key, list); else this.hits.delete(key);
    return list;
  }
  /** Is there room for one more, without counting it? */
  ok(key: string, now = Date.now()) { const max = LIMITS[this.limit]; return !max || this.recent(key, now).length < max; }
  hit(key: string, now = Date.now()) {
    this.hits.set(key, [...this.recent(key, now), now]);
    if (this.hits.size > 20000) for (const k of [...this.hits.keys()]) this.recent(k, now); // forget callers who went quiet
  }
}

/** Counts one event against every window only if all of them still have room, so a refusal costs nothing. */
export function allow(now: number, ...checks: [Window, string][]) {
  if (!checks.every(([w, key]) => w.ok(key, now))) return false;
  for (const [w, key] of checks) w.hit(key, now);
  return true;
}
/** A fixed ceiling, like the number of stored teams: 0 means none. */
export const under = (limit: Limit, count: number) => !LIMITS[limit] || count < LIMITS[limit];
