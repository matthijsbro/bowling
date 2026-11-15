import { afterEach, expect, test } from 'vitest';
import { requestCode, verifyCode } from './auth.ts';
import { openDb } from './db.ts';
import { LIMITS, Window, allow, under } from './limits.ts';

const saved = { ...LIMITS };
afterEach(() => Object.assign(LIMITS, saved));

test('a window lets the limit through, refuses the next, and forgets after its time', () => {
  LIMITS.TEAMS_PER_HOUR_PER_IP = 2;
  const w = new Window('TEAMS_PER_HOUR_PER_IP', 1000);
  expect([allow(0, [w, 'a']), allow(10, [w, 'a']), allow(20, [w, 'a']), allow(20, [w, 'b'])]).toEqual([true, true, false, true]);
  expect(allow(1001, [w, 'a'])).toBe(true); // the first one has expired
});

test('a refusal by one window costs nothing in the others', () => {
  LIMITS.TEAMS_PER_HOUR_PER_IP = 5; LIMITS.TEAMS_PER_HOUR = 1;
  const perIp = new Window('TEAMS_PER_HOUR_PER_IP', 1000), all = new Window('TEAMS_PER_HOUR', 1000);
  expect(allow(0, [perIp, 'a'], [all, 'all'])).toBe(true);
  for (let i = 0; i < 9; i++) expect(allow(1, [perIp, 'b'], [all, 'all'])).toBe(false);
  expect(allow(1, [perIp, 'b'])).toBe(true); // 'b' still has its five
});

test('0 switches a limit off', () => {
  LIMITS.TEAMS_PER_HOUR = 0; LIMITS.MAX_TEAMS = 0;
  const w = new Window('TEAMS_PER_HOUR', 1000);
  for (let i = 0; i < 50; i++) expect(allow(i, [w, 'all'])).toBe(true);
  expect(under('MAX_TEAMS', 1e9)).toBe(true);
  LIMITS.MAX_TEAMS = 3;
  expect([under('MAX_TEAMS', 2), under('MAX_TEAMS', 3)]).toEqual([true, false]);
});

test('new accounts are capped per caller, per day and in total; existing accounts still sign in', async () => {
  LIMITS.ACCOUNTS_PER_DAY_PER_IP = 1; LIMITS.ACCOUNTS_PER_DAY = 100; LIMITS.MAX_ACCOUNTS = 2;
  const db = openDb(':memory:'), sent: Record<string, string> = {};
  const login = async (email: string, ip: string, now: number) => {
    await requestCode(db, email, `${ip}-${now}`, now, (e, c) => { sent[e] = c; });
    return verifyCode(db, email, sent[email], now, ip);
  };
  expect(typeof await login('a@example.com', 'ip1', 1000)).toBe('object');
  expect(await login('b@example.com', 'ip1', 2000)).toBe('full');           // second new account from the same caller today
  expect(verifyCode(db, 'b@example.com', sent['b@example.com'], 2001, 'ip2')).not.toBe('full'); // the code was kept, so it works from elsewhere
  expect(await login('c@example.com', 'ip3', 3000)).toBe('full');           // two accounts exist: the ceiling
  expect(typeof await login('a@example.com', 'ip1', 4000)).toBe('object');  // signing in again is never limited
});
