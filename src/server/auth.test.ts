import { expect, test } from 'vitest';
import { profile, recordGame, requestCode, setRules, signOut, userOf, verifyCode } from './auth.ts';
import { openDb } from './db.ts';

const setup = () => {
  const db = openDb(':memory:'), sent: Record<string, string> = {};
  const ask = (email: string, ip: string, now = 1000) => requestCode(db, email, ip, now, (e, c) => { sent[e] = c; });
  return { db, sent, ask };
};

test('a code signs you in once, and the session can be ended', async () => {
  const { db, sent, ask } = setup();
  expect(await ask(' Ann@Example.com ', 'ip1')).toBe('ok');
  expect(sent['ann@example.com']).toMatch(/^\d{6}$/);
  const s = verifyCode(db, 'ann@example.com', sent['ann@example.com'], 2000)!;
  expect(s.email).toBe('ann@example.com');
  expect(verifyCode(db, 'ann@example.com', sent['ann@example.com'], 2000)).toBeNull(); // a code works once
  const user = userOf(db, s.token)!;
  expect(user).toBeGreaterThan(0);
  expect(userOf(db, 'not-a-token')).toBeUndefined();
  signOut(db, s.token);
  expect(userOf(db, s.token)).toBeUndefined();
});

test('wrong codes are refused, five wrong guesses kill the code, and codes expire', async () => {
  const { db, sent, ask } = setup();
  await ask('bo@example.com', 'ip2');
  const right = sent['bo@example.com'], wrong = right === '000000' ? '111111' : '000000';
  for (let i = 0; i < 5; i++) expect(verifyCode(db, 'bo@example.com', wrong, 2000)).toBeNull();
  expect(verifyCode(db, 'bo@example.com', right, 2000)).toBeNull(); // too late: the code is dead
  await ask('cy@example.com', 'ip3');
  expect(verifyCode(db, 'cy@example.com', sent['cy@example.com'], 1000 + 11 * 60e3)).toBeNull();
});

test('asking too often is refused, per address and per caller; nonsense addresses are refused', async () => {
  const { ask } = setup();
  for (let i = 0; i < 3; i++) expect(await ask('di@example.com', `ip-a${i}`)).toBe('ok');
  expect(await ask('di@example.com', 'ip-a9')).toBe('too-many');
  for (let i = 0; i < 10; i++) await ask(`e${i}@example.com`, 'ip-busy');
  expect(await ask('fresh@example.com', 'ip-busy')).toBe('too-many');
  expect(await ask('fresh@example.com', 'ip-busy', 1000 + 11 * 60e3)).toBe('ok'); // and allowed again later
  expect(await ask('not an email', 'ip-x')).toBe('bad-email');
});

test('an account keeps its games and its remembered rules', async () => {
  const { db, sent, ask } = setup();
  await ask('flo@example.com', 'ip4');
  const user = userOf(db, verifyCode(db, 'flo@example.com', sent['flo@example.com'], 2000)!.token)!;
  recordGame(db, user, { score: 41, frames: 5, mode: 'solo', title: 'Utilitarians, with a footnote' }, 3000);
  setRules(db, user, ['numbers:A', 42, 'x'.repeat(99), 'truth:B']);
  expect(profile(db, user)).toEqual({ email: 'flo@example.com', rules: ['numbers:A', 'truth:B'], games: [{ at: 3000, score: 41, frames: 5, mode: 'solo', title: 'Utilitarians, with a footnote' }] });
});
