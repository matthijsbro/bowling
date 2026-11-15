// Paper overlays: everything that is not the lane or the cast. Pure functions from state to HTML.
import { isMuted } from './audio.ts';
import { pinsetter } from './cast/cast.ts';
import type { Account, Room } from './net.ts';
import { RULES } from '../shared/cards/rules.ts';
import { cardOf, frameDone, reasonsFor, summary, type View } from '../shared/engine.ts';

export type Show = 'card' | 'react' | 'split' | 'bowl' | 'aftermath' | 'end';
export type Ui = {
  screen: 'title' | 'names' | 'online' | 'lobby' | 'game' | 'account';
  mode: 'solo' | 'pass' | 'online';
  show: Show;
  me: string;           // the player this device is acting for right now
  handed: boolean;      // pass-and-play: that player has confirmed they are holding the device
  read: boolean; explaining: boolean; boardOpen: boolean;
  sliders: boolean;     // throwing with sliders instead of a flick
  thump: { text: string; cls: string } | null;
  note: string; best: number;
  serverUp: boolean; room: Room | null; qr: string; error: string; name: string; team: string; names: string[]; quip: string;
  account: Account | null; codeFor: string;   // signed-in account, and the address a code was just sent to
  remembered: string[];                         // rules the alley remembers of you alone
};

/** What the Pinsetter is doing while you look at the title. */
export const QUIPS = ['The Pinsetter is counting the pins. Again.', 'The lanes have been oiled. Nobody will say with what.', 'Tonight: bowling. Also consequences.', 'The pigeon has been informed of your arrival.', 'Shoes are optional. Opinions are not.', 'The vending machine is confident about tomorrow.', 'All pins present. One of them is nervous.'];

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const face = `<div class="who"><svg viewBox="84 0 118 118" class="ink">${pinsetter('calm')}</svg></div>`;
const stamps = (g: View) => g.stamps.map((s) => `<span class="stamp ${s.struck ? 'struck' : ''} ${s.why ? 'why' : ''}">${esc(s.text)}</span>`).join(' ');
const nameOf = (g: View, id: string) => g.players.find((p) => p.id === id)?.name ?? '';
const multi = (g: View) => g.players.length > 1;
const lengths = (act: string) => `<button class="go" data-act="${act}" data-len="5">Quick game, five frames</button>
  <button class="go" data-act="${act}" data-len="10">Full game, ten frames</button>`;
const back = `<button data-act="home"><small>Back to the start</small></button>`;
const mute = () => `<button class="mute" data-act="mute" aria-pressed="${isMuted()}"><small>Sound: ${isMuted() ? 'off' : 'on'}</small></button>`;
// asked for, written down nowhere
const shoes = `<input maxlength="4" inputmode="numeric" placeholder="Shoe size (the alley does not use this)" aria-label="Shoe size. The alley does not use this.">`;

const title = (u: Ui) => `<div class="title home">
  <div><h1><span>SPLIT</span><span>DECISION</span></h1><p class="quip">${u.quip}</p></div>
  <div class="rules"><details ${u.best || u.remembered.length ? '' : 'open'}><summary>How it works</summary><ol>
    <li>Something is wrong with the lane. You get two options.</li>
    <li>Decide. With friends: talk, then vote.</li>
    <li>Bowl the lane you chose. Your pins are your own.</li>
    <li>The alley remembers. Contradict yourself and it calls a Split.</li>
  </ol></details>
  ${lengths('start')}
  <button class="go alt" data-act="names">With friends, passing this device round</button>
  ${u.serverUp ? `<button class="go alt" data-act="online">With friends, each on their own phone</button>` : ''}
  ${u.remembered.length ? `<p class="remember">The alley remembers you: ${u.remembered.map((c) => `<span class="stamp">${RULES[c] ?? c}</span>`).join(' ')} <button data-act="forget"><small>Wipe the board</small></button></p>` : ''}
  ${u.serverUp ? `<button data-act="account"><small>${u.account ? `Signed in as ${esc(u.account.email)}` : 'Sign in, if you like. Nothing needs it.'}</small></button>` : ''}
  <small>${u.best ? `Your best quick game alone: ${u.best} pins. It is watching.` : 'Playing alone stays on this device. Nothing leaves it.'}</small>${mute()}</div>
</div>`;

const names = (u: Ui) => `<div class="title"><div class="rules">
  <h2>Who is bowling?</h2><small>Two to six names. You pass the device round for secret votes and for bowling.</small>
  ${Array.from({ length: 6 }, (_, i) => `<input name="n" maxlength="20" placeholder="Bowler ${i + 1}" value="${esc(u.names[i] ?? '')}" aria-label="Name of bowler ${i + 1}">`).join('')}
  ${shoes}${u.error ? `<p class="error">${esc(u.error)}</p>` : ''}
  ${lengths('startPass')}${back}</div></div>`;

const online = (u: Ui) => `<div class="title"><div class="rules">
  <h2>Play online</h2><small>Everyone joins the same team, each on their own phone or computer. No account needed.</small>
  <input id="name" maxlength="20" placeholder="Your name" value="${esc(u.name)}" aria-label="Your name">${shoes}
  <button class="go" data-act="create">Start a new team</button>
  <input id="team" maxlength="6" placeholder="Team id, six characters" value="${esc(u.team)}" aria-label="Team id" autocapitalize="characters">
  <button class="go" data-act="join">Join that team</button>
  ${u.error ? `<p class="error">${esc(u.error)}</p>` : ''}${back}</div></div>`;

function account(u: Ui) {
  const a = u.account, err = u.error ? `<p class="error">${esc(u.error)}</p>` : '';
  if (a) return `<div class="title"><div class="rules"><h2>Your account</h2><p>${esc(a.email)}</p>
    <small>Your games and the rules the alley remembers of you follow you to any device you sign in on.</small>
    ${a.games.length ? `<table>${a.games.map((g) => `<tr><td>${new Date(g.at).toLocaleDateString()}</td><td>${g.score} pins</td><td>${g.frames} frames, ${g.mode === 'team' ? 'with a team' : 'alone'}</td></tr><tr><td colspan="3"><small>${esc(g.title)}</small></td></tr>`).join('')}</table>` : '<p>No games on record yet.</p>'}
    ${err}<button data-act="logout">Sign out</button> ${back}</div></div>`;
  return `<div class="title"><div class="rules"><h2>Sign in</h2>
    <small>Optional. An account keeps your games and remembered rules across devices. There is no password: you get a six-digit code by email.</small>
    ${u.codeFor
      ? `<p>A code is on its way to ${esc(u.codeFor)}. It works for ten minutes.</p>
         <input id="code" inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="Six-digit code" aria-label="Six-digit code">
         ${err}<button class="go" data-act="verify">Sign in</button><button data-act="account"><small>Use a different address</small></button>`
      : `<input id="email" type="email" autocomplete="email" maxlength="254" placeholder="Email address" aria-label="Email address">
         ${err}<button class="go" data-act="sendCode">Send me a code</button>`}
    ${back}</div></div>`;
}

function lobby(u: Ui) {
  const r = u.room!, host = r.you === 0;
  return `<div class="title"><div class="rules">
    <h2>Team ${r.team}</h2><small>Others join by typing this id, or by pointing their phone camera at the code.</small>
    <div class="qr">${u.qr}</div>
    ${r.rules.length ? `<p class="remember">The alley remembers this team: ${r.rules.map((t) => `<span class="stamp">${esc(t)}</span>`).join(' ')}${host ? ' <button data-act="forgetTeam"><small>Wipe the board</small></button>' : ''}</p>` : ''}
    <p>${r.members.map((m, i) => `<span class="chip ${m.online ? '' : 'away'}">${esc(m.name)}${i === r.you ? ' (you)' : ''}${m.online ? '' : ', away'}</span>`).join(' ')}</p>
    ${host ? (r.members.length > 1 ? lengths('startOnline') : '<p>Waiting for at least one more bowler.</p>') : `<p>Waiting for ${esc(r.members[0].name)} to start the game.</p>`}
    ${back}</div></div>`;
}

function hud(g: View, u: Ui) {
  const p = g.players.find((x) => x.id === u.me)!, liar = cardOf(g).id === 'liar' && g.phase !== 'end';
  const scores = multi(g) ? `<p>${[...g.players].sort((a, b) => b.score - a.score).map((x) => `${esc(x.name)} ${x.score}`).join(' &middot; ')}</p>` : '';
  return `<div class="hud"><span class="chip">${multi(g) ? `${esc(p.name)} &middot; ` : ''}Frame ${Math.min(g.frame + 1, g.cards.length)}/${g.cards.length} &middot; ${liar ? `${p.score + 3 + (g.frame % 4)} pins (wrong)` : `${p.score} pins`}</span>
    <button data-act="board" aria-expanded="${u.boardOpen}">House Rules &middot; ${g.stamps.filter((s) => !s.struck).length}</button></div>
  ${u.boardOpen ? `<div class="board"><h3>House Rules</h3><p>Every decision adds a rule here. Go against one later and the alley calls a Split.</p>${stamps(g) || '<p>No rules yet.</p>'}${scores}<button data-act="home"><small>Leave this game</small></button> ${mute()}</div>` : ''}`;
}

function card(g: View, u: Ui) {
  const c = cardOf(g), many = multi(g), secret = c.kind === 'secret';
  const ex = c.role === 'twist' && c.chain ? g.explained[c.chain] : undefined;
  const tests = ex ? `<p>At the Split you gave this reason: <span class="stamp why">${g.stamps[ex.stamp].text}</span> This dilemma checks whether you stand by it.</p>` : '';
  const head = `<div class="panel">${face}<h2>${c.title}</h2>`;
  // one thing at a time, so the panel stays small and the scene stays visible
  if (!u.read) return `${head}<p>${c.text}</p>${tests}${many
    ? `<p><b>${secret ? 'No talking. Everyone chooses in private.' : 'Talk it over. Then everyone votes in private, and the majority decides.'}</b></p>${secret ? '' : '<div class="talk"><i></i></div>'}
       <button class="go" data-act="read">${secret ? 'Start choosing' : 'We are ready to vote'}</button>`
    : `<button class="go" data-act="read">What can I do?</button>`}</div>`;
  if (u.mode === 'online' && g.votes[u.me]) return `${head}<p>Your vote is in. Waiting for the others: ${g.voted?.length ?? 1} of ${g.players.length} have voted.</p></div>`;
  if (u.mode === 'pass' && !u.handed) return `${head}<p>Pass the device to <b>${esc(nameOf(g, u.me))}</b>. Nobody else looks.</p>
    <button class="go" data-act="handed">I am ${esc(nameOf(g, u.me))}</button></div>`;
  return `${head}${many ? `<p><b>${esc(nameOf(g, u.me))}</b>, your ${secret ? 'choice' : 'vote'}:</p>` : ''}<div class="opts">${c.options.map((o) => `<button data-act="vote" data-o="${o.id}"><b>${o.label}</b><small>${o.effect}</small></button>`).join('')}
    <button data-act="unread"><small>Read the problem again</small></button></div></div>`;
}

function split(g: View, u: Ui) {
  const c = cardOf(g), old = g.stamps[g.splitAgainst!], now = c.options.find((o) => o.id === g.decision)!, reasons = reasonsFor(g);
  return `<div class="panel">${face}<h2 class="splitword">SPLIT!</h2>
    <p>${old.old ? 'A rule the alley remembers from an earlier night' : 'An earlier rule on the board'}: <span class="stamp ${old.why ? 'why' : ''}">${old.text}</span> Now ${multi(g) ? 'the group' : 'you'} chose <b>${now.label}</b>, which goes against that rule. The alley calls this a Split.</p>${u.explaining
    ? `<p>Why is this case different? Pick the reason closest to yours. It becomes a rule on the board, and later choices can go against it too.</p><div class="opts">${reasons.map((d, i) => `<button data-act="diff" data-i="${i}"><b>${d.text}</b></button>`).join('')}
       <button data-act="back"><small>Back to the ways out</small></button></div>`
    : `<p>${multi(g) ? 'Decide together what to do about it.' : 'What do you want to do about it?'}</p><div class="opts">
       ${reasons.length ? `<button data-act="explain"><b>Explain the difference</b><small>Say why the two cases are not the same. Your reason is added to the board as a new rule.</small></button>` : ''}
       <button data-act="way" data-w="takeBack"><b>Take the earlier rule back</b><small>The old rule is replaced by its opposite, or removed. This costs nothing.</small></button>
       <button data-act="way" data-w="shrug"><b>Shrug</b><small>Leave the contradiction. Both rules stay, but next frame only the two far corner pins are set up.</small></button></div>`}</div>`;
}

function bowlStrip(g: View, u: Ui) {
  const c = cardOf(g), b = g.bowl[u.me], lane = b?.lane;
  if (u.mode === 'online' && b && frameDone(b)) return `<div class="chip strip">Waiting for the others to finish bowling.</div>`;
  const bits = [multi(g) && u.mode === 'pass' ? `${nameOf(g, u.me)} bowls.` : '',
    c.options.find((o) => o.id === (g.decision ?? g.votes[u.me]))?.effect ?? (c.kind === 'plain' ? c.text : ''),
    lane?.ball === 'wobble' ? 'You have a wobbly ball: it swerves left and right.' : lane?.ball === 'perfect' ? 'You have a perfect ball: it steers itself towards the pins.' : '',
    g.dry ? 'The lanes are dry, so every ball is slow.' : '', g.sloppy ? 'The Pin Boy is out: two pins are missing.' : '', g.strikeAt < 10 ? `${g.strikeAt} or more pins counts as ten.` : '',
    lane?.bumpers ? 'Bumpers are up, so the ball cannot fall in the gutter.' : '', g.sevenTen ? 'Only the two corner pins are set up, because of the shrug at the Split.' : ''].filter(Boolean);
  return bits.length ? `<div class="chip strip">${esc(bits.join(' '))}</div>` : '';
}

/** For anyone who cannot or would rather not flick: set where and how hard, then press Throw. */
function aimer(g: View, u: Ui) {
  const b = g.bowl[u.me];
  if (!b || frameDone(b)) return '';
  return u.sliders
    ? `<div class="aimer chip"><label>Where<input id="aim" type="range" min="-41" max="41" value="0" aria-label="Where the ball starts, left to right"></label>
       <label>How hard<input id="power" type="range" min="0" max="100" value="60" aria-label="How hard to throw"></label>
       <label>Curve<input id="curve" type="range" min="-100" max="100" value="0" aria-label="Curve, left to right"></label>
       <button class="go" data-act="sliderThrow">Throw</button><button data-act="sliders"><small>Back to flicking</small></button></div>`
    : `<button class="aimer-toggle" data-act="sliders"><small>Throw without flicking</small></button>`;
}

function aftermath(g: View, u: Ui) {
  const lines = g.after ?? [], last = g.frame + 1 >= g.cards.length, mine = g.bowl[u.me].pins;
  return `<div class="panel">${face}<h2>${multi(g) ? 'This frame' : `${mine} ${mine === 1 ? 'pin' : 'pins'}`}</h2>
    ${multi(g) ? `<p>${g.players.map((p) => `${esc(p.name)} ${g.bowl[p.id].pins}`).join(' &middot; ')}</p>` : ''}
    ${lines.map((l) => `<p>${esc(l)}</p>`).join('')}
    <button class="go" data-act="next">${last ? 'Total it up' : 'Next frame'}</button></div>`;
}

function end(g: View, u: Ui) {
  const s = summary(g), r = s.record, ranked = [...s.receipts].sort((a, b) => b.score - a.score);
  const again = u.mode === 'solo' ? lengths('start') : u.mode === 'pass' ? lengths('startPass')
    : u.room?.you === 0 ? lengths('startOnline') : `<p>Waiting for ${esc(u.room?.members[0].name ?? 'the host')} to start another game.</p>`;
  return `<div class="end"><div><h1>Closing time</h1>
    ${multi(g) ? `<p class="big">The night's winner: ${esc(ranked[0].name)}</p>${ranked.map((p) => `<p><b>${esc(p.name)}</b> ${p.score} pins &nbsp;<small style="display:inline">${p.frames.join(' + ')}</small></p>`).join('')}`
      : `<p class="big">${ranked[0].score} pins</p><p>${ranked[0].frames.join(' + ')}${g.length === 5 && u.best && ranked[0].score >= u.best ? ' &mdash; a new best. The old one has been told.' : ''}</p>`}
    <h2>The House Record</h2><p class="big">${s.title}</p>
    <p>Splits explained: ${r.explained}${r.explained ? ` (stood by in a twist: ${r.survived})` : ''} &middot; taken back: ${r.takenBack} &middot; shrugged: ${r.shrugged}</p>
    <p>${stamps(g) || 'The board is empty. That is also a position.'}</p>
    <h2>What became of everyone</h2>${s.epilogue.map((l) => `<p>${l}</p>`).join('')}
    <h2>${multi(g) ? 'Receipts' : 'Your receipt'}</h2>${s.receipts.map((p) => `<div class="receipt"><p><b>${esc(p.name)}: ${p.title}</b></p>${p.lines.map((l) => `<p>${l}</p>`).join('')}<p>Thank you for bowling. No refunds on principles.</p></div>`).join('')}
    <details><summary>What these dilemmas were about</summary>${s.review.map((x) => `<p><b>${x.title}.</b> ${x.about}</p>`).join('')}</details>
    ${again}${back}</div></div>`;
}

export function render(g: View | null, u: Ui): string {
  if (u.screen === 'names') return names(u);
  if (u.screen === 'online') return online(u);
  if (u.screen === 'account') return account(u);
  if (u.screen === 'lobby' && u.room) return lobby(u);
  if (u.screen !== 'game' || !g) return title(u);
  if (u.show === 'end') return end(g, u);
  return hud(g, u)
    + (u.show === 'card' ? card(g, u) : u.show === 'split' ? split(g, u) : u.show === 'aftermath' ? aftermath(g, u) : '')
    + (u.show === 'bowl' ? bowlStrip(g, u) + aimer(g, u) : '')
    + (u.show === 'react' && u.thump ? `<div class="thump ${u.thump.cls}">${esc(u.thump.text)}</div>` : '')
    + (u.note ? `<div class="note">${esc(u.note)}</div>` : '');
}
