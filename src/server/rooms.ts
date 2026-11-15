// Online play: a team is a room with a short id. The server runs the same engine as the browser,
// keeps the only full copy of the game, and sends each player a view without the others' hidden votes.
import { randomInt } from 'node:crypto';
import type { WebSocket } from 'ws';
import { CARDS } from '../shared/cards/index.ts';
import { RULES } from '../shared/cards/rules.ts';
import { newGame, step, summary, toRemember, type Ev, type Game, type View } from '../shared/engine.ts';
import type { Claim } from '../shared/types.ts';
import { recordGame } from './auth.ts';
import { db as open } from './db.ts';

type Member = { token: string; name: string; user?: number; sock?: WebSocket };
/** `rules` is what the alley remembers of this team from earlier nights. */
type Room = { id: string; members: Member[]; game: Game | null; rules: Claim[] };

const db = open();
db.prepare('DELETE FROM rooms WHERE updated < ?').run(Date.now() - 30 * 86400e3); // teams untouched for a month are forgotten
const rooms = new Map<string, Room>();
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O or 1/I to mix up when read aloud

function save(r: Room) {
  db.prepare('INSERT OR REPLACE INTO rooms VALUES (?, ?, ?)').run(r.id, JSON.stringify({ members: r.members.map(({ token, name, user }) => ({ token, name, user })), game: r.game, rules: r.rules }), Date.now());
}
function load(id: string): Room | undefined {
  if (rooms.has(id)) return rooms.get(id);
  const row = db.prepare('SELECT json FROM rooms WHERE id = ?').get(id) as { json: string } | undefined;
  if (!row) return;
  const r: Room = { id, rules: [], ...JSON.parse(row.json) };
  rooms.set(id, r);
  return r;
}

/** What one player may see: their own vote, and who else has voted. Secret frames stay secret until closing time. */
function view(g: Game, pid: string): View {
  const hide = (votes: Game['votes']) => Object.fromEntries(Object.entries(votes).filter(([p]) => p === pid));
  return {
    ...g,
    votes: g.phase === 'card' ? hide(g.votes) : g.votes,
    voted: Object.keys(g.votes),
    log: g.phase === 'end' ? g.log : g.log.map((l) => (CARDS[l.card].kind === 'secret' ? { ...l, votes: hide(l.votes) } : l)),
  };
}

function broadcast(r: Room) {
  save(r);
  r.members.forEach((m, you) => m.sock?.send(JSON.stringify({
    t: 'room', team: r.id, you, members: r.members.map((x) => ({ name: x.name, online: !!x.sock })), rules: r.rules.map((c) => RULES[c]),
    game: r.game && view(r.game, `p${you}`),
  })));
}

const text = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export function serve(sock: WebSocket, user?: number) {
  let room: Room | undefined, me: Member | undefined;
  const fail = (msg: string) => sock.send(JSON.stringify({ t: 'error', msg }));
  const seat = (r: Room, token: string, name: string) => {
    let m = r.members.find((x) => x.token === token);
    if (!m) {
      if (r.game && r.game.phase !== 'end') return fail('That team is in the middle of a game. Ask them to let you in after this one.');
      if (r.members.length >= 6) return fail('That team is full: six bowlers is the limit.');
      r.members.push((m = { token, name }));
    }
    if (user) m.user = user; // signed in: this seat's games go into that account's history
    m.sock?.close(); // the same seat opened somewhere else: the newest device wins
    m.sock = sock; m.name = name || m.name;
    room = r; me = m;
    broadcast(r);
  };

  sock.on('message', (raw) => {
    let msg: any;
    try { msg = JSON.parse(String(raw)); } catch { return; }
    const token = text(msg?.token, 64), name = text(msg?.name, 20) || 'Bowler';
    if (msg?.t === 'create' && token) {
      let id = '';
      do id = Array.from({ length: 6 }, () => ALPHABET[randomInt(ALPHABET.length)]).join(''); while (load(id));
      const r: Room = { id, members: [], game: null, rules: [] };
      rooms.set(id, r);
      return seat(r, token, name);
    }
    if (msg?.t === 'join' && token) {
      const r = load(text(msg.team, 6).toUpperCase());
      return r ? seat(r, token, name) : fail('No team with that id. Check the six characters.');
    }
    if (!room || !me) return;
    const index = room.members.indexOf(me);
    if (msg.t === 'start' && index === 0 && (!room.game || room.game.phase === 'end')) {
      room.game = newGame(randomInt(2 ** 31), room.members.map((m) => m.name), { length: msg.length === 10 ? 10 : 5, remembered: room.rules });
      return broadcast(room);
    }
    if (msg.t === 'ev' && room.game) {
      const ev = msg.ev as Ev;
      // you can only vote and bowl as yourself; ways out of a Split and "next" belong to the whole group
      if ((ev?.t === 'vote' || ev?.t === 'throw') && ev.p !== `p${index}`) return;
      const next = step(room.game, ev);
      if (next === room.game) return;
      if (next.phase === 'end' && room.game.phase !== 'end') { // closing time: the alley notes the rules, and each account its game
        room.rules = toRemember(next);
        const title = summary(next).title;
        room.members.forEach((m, i) => { if (m.user) recordGame(db, m.user, { score: next.players[i]?.score ?? 0, frames: next.length, mode: 'team', title }, Date.now()); });
      }
      room.game = next; broadcast(room);
      return;
    }
    if (msg.t === 'forget' && index === 0 && (!room.game || room.game.phase === 'end')) { room.rules = []; return broadcast(room); }
    if (msg.t === 'leave') sock.close();
  });
  sock.on('close', () => {
    if (!room || !me || me.sock !== sock) return;
    me.sock = undefined;
    // a seat is only given up before the game starts; mid-game it waits for its owner
    if (!room.game) room.members = room.members.filter((m) => m !== me);
    broadcast(room);
  });
}
