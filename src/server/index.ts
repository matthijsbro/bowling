// Serves the built client, the login API and the game socket.
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import nodemailer from 'nodemailer';
import { WebSocketServer } from 'ws';
import { profile, recordGame, requestCode, setRules, signOut, userOf, verifyCode } from './auth.ts';
import { db } from './db.ts';
import { LIMITS, ipOf } from './limits.ts';
import { serve } from './rooms.ts';

const DIST = resolve('dist');
const TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json',
  '.json': 'application/json',
};

// Mail for login codes. Without SMTP settings the code is printed here instead, which is enough to try things out.
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM } = process.env;
const mailer = SMTP_HOST ? nodemailer.createTransport({ host: SMTP_HOST, port: Number(SMTP_PORT ?? 587), secure: Number(SMTP_PORT) === 465, auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined }) : null;
async function sendCode(email: string, code: string) {
  if (!mailer) return console.log(`[login] code for ${email}: ${code} (no SMTP_HOST set, so it is printed here)`);
  await mailer.sendMail({
    from: MAIL_FROM ?? SMTP_USER, to: email, subject: `${code} is your Split Decision code`,
    text: `Your code for Split Decision is ${code}.\n\nIt works for ten minutes. If you did not ask for it, you can ignore this mail.\n\nWalter, at Split Decision`,
  });
}

const cookie = (req: IncomingMessage) => /(?:^|;\s*)sid=([a-f0-9]{64})/.exec(req.headers.cookie ?? '')?.[1];
const json = (res: ServerResponse, status: number, body: unknown, headers: Record<string, string> = {}) =>
  res.writeHead(status, { 'content-type': 'application/json', 'cache-control': 'no-store', ...headers }).end(JSON.stringify(body));
async function body(req: IncomingMessage): Promise<Record<string, unknown>> {
  let raw = '';
  for await (const chunk of req) { raw += chunk; if (raw.length > 4096) throw new Error('too big'); }
  const v = raw ? JSON.parse(raw) : {};
  return v && typeof v === 'object' ? v : {};
}

async function api(req: IncomingMessage, res: ServerResponse, path: string) {
  if (path === '/api/health') return json(res, 200, { ok: true });
  const sid = cookie(req), user = userOf(db(), sid), now = Date.now();
  if (path === '/api/me' && req.method === 'GET') return user ? json(res, 200, profile(db(), user)) : json(res, 401, { error: 'not signed in' });
  if (req.method !== 'POST') return json(res, 404, { error: 'not found' });
  const b = await body(req);
  if (path === '/api/login/request') {
    const r = await requestCode(db(), b.email, ipOf(req), now, sendCode);
    return r === 'ok' ? json(res, 200, { ok: true }) : json(res, r === 'too-many' ? 429 : 400, { error: r === 'too-many' ? 'Too many codes asked for. Try again in ten minutes.' : 'That does not look like an email address.' });
  }
  if (path === '/api/login/verify') {
    const s = verifyCode(db(), b.email, b.code, now, ipOf(req));
    if (s === 'full') return json(res, 503, { error: 'No new accounts can be made right now. Try again tomorrow; you can play without one.' });
    if (!s) return json(res, 400, { error: 'That code is wrong or has expired.' });
    const secure = req.headers['x-forwarded-proto'] === 'https' ? '; Secure' : '';
    return json(res, 200, profile(db(), userOf(db(), s.token)!), { 'set-cookie': `sid=${s.token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=31536000${secure}` });
  }
  if (path === '/api/logout') { if (sid) signOut(db(), sid); return json(res, 200, { ok: true }, { 'set-cookie': 'sid=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0' }); }
  if (!user) return json(res, 401, { error: 'not signed in' });
  // your own games and rules, reported by your own device: nobody else is affected if you lie about them
  if (path === '/api/me/game') { recordGame(db(), user, b as never, now); setRules(db(), user, b.rules); return json(res, 200, { ok: true }); }
  if (path === '/api/me/rules') { setRules(db(), user, b.rules); return json(res, 200, { ok: true }); }
  return json(res, 404, { error: 'not found' });
}

const http = createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url ?? '/', 'http://x').pathname);
  if (path.startsWith('/api/')) return api(req, res, path).catch(() => json(res, 400, { error: 'bad request' }));
  const file = normalize(join(DIST, path));
  const inDist = file.startsWith(DIST); // blocks ../ escapes
  for (const f of inDist && extname(file) ? [file] : [join(DIST, 'index.html')]) {
    try {
      const data = await readFile(f);
      res.writeHead(200, { 'content-type': TYPES[extname(f)] ?? 'application/octet-stream' }).end(data);
      return;
    } catch { /* fall through to 404 */ }
  }
  res.writeHead(404).end('not found');
});
// game connections: a ceiling for the whole server and one per address, so one caller cannot fill it
let open = 0;
const perIp = new Map<string, number>();
new WebSocketServer({ server: http, path: '/ws', maxPayload: 4096 }).on('connection', (sock, req) => {
  const ip = ipOf(req), mine = perIp.get(ip) ?? 0;
  const full = LIMITS.MAX_CONNECTIONS && open >= LIMITS.MAX_CONNECTIONS, greedy = LIMITS.MAX_CONNECTIONS_PER_IP && mine >= LIMITS.MAX_CONNECTIONS_PER_IP;
  if (full || greedy) {
    sock.send(JSON.stringify({ t: 'error', msg: full ? 'The alley is full right now. Try again in a little while, or play on this device.' : 'Too many connections from your network. Close a few tabs and try again.' }));
    return sock.close(1013, 'busy'); // 1013: try again later
  }
  open++; perIp.set(ip, mine + 1);
  sock.on('close', () => { open--; const n = (perIp.get(ip) ?? 1) - 1; if (n) perIp.set(ip, n); else perIp.delete(ip); });
  serve(sock, userOf(db(), cookie(req)), ip);
});
http.listen(Number(process.env.PORT ?? 8080), () => console.log(`Split Decision server up${mailer ? '' : ' (no SMTP: login codes are printed in this log)'}`));
