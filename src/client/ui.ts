// Paper overlays: everything that is not the lane or the cast. Pure functions from state to HTML.
import { isMuted } from './audio.ts';
import { lang, t } from './i18n.ts';
import { pinsetter } from './cast/cast.ts';
import type { Account, Room } from './net.ts';
import { CARDS } from '../shared/cards/index.ts';
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

/** One line under the title, picked at random. */
export const QUIPS = ['A bowling game in which every frame starts with a decision.', 'Walter, the heron who runs the alley, is setting up the pins.', 'Every decision you make goes on the board as a house rule.', 'If you go against one of your own house rules, the alley calls a Split.'];

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const face = `<div class="who"><svg viewBox="84 0 118 118" class="ink">${pinsetter('calm')}</svg></div>`;
const stamps = (g: View) => g.stamps.map((s) => `<span class="stamp ${s.struck ? 'struck' : ''} ${s.why ? 'why' : ''}">${esc(t(s.text))}</span>`).join(' ');
const nameOf = (g: View, id: string) => g.players.find((p) => p.id === id)?.name ?? '';
const multi = (g: View) => g.players.length > 1;
const error = (u: Ui) => (u.error ? `<p class="error">${esc(t(u.error))}</p>` : '');
const lengths = (act: string) => `<button class="go" data-act="${act}" data-len="5">${t('Quick game, five frames')}</button>
  <button class="go" data-act="${act}" data-len="10">${t('Full game, ten frames')}</button>`;
const back = () => `<button data-act="home"><small>${t('Back to the start')}</small></button>`;
const mute = () => `<button class="mute" data-act="mute" aria-pressed="${isMuted()}"><small>${t(isMuted() ? 'Sound: off' : 'Sound: on')}</small></button>`;
// each language's button is written in that language, so you can find it whichever one is showing
const langBtn = () => `<button class="mute" data-act="lang" lang="${lang === 'nl' ? 'en' : 'nl'}"><small>${lang === 'nl' ? 'English' : 'Nederlands'}</small></button>`;

const title = (u: Ui) => `<div class="title home">
  <div><h1><span>SPLIT</span><span>DECISION</span></h1><p class="quip">${t(u.quip)}</p></div>
  <div class="rules"><details ${u.best || u.remembered.length ? '' : 'open'}><summary>${t('How it works')}</summary><ol>
    <li>${t('Something is wrong with the lane. You get two options.')}</li>
    <li>${t('Decide. With friends: talk, then vote.')}</li>
    <li>${t('Bowl the lane you chose. Your pins are your own.')}</li>
    <li>${t('The alley remembers. Contradict yourself and it calls a Split.')}</li>
  </ol></details>
  ${lengths('start')}
  <button class="go alt" data-act="names">${t('With friends, passing this device round')}</button>
  ${u.serverUp ? `<button class="go alt" data-act="online">${t('With friends, each on their own phone')}</button>` : ''}
  ${u.remembered.length ? `<p class="remember">${t('The alley remembers you:')} ${u.remembered.map((c) => `<span class="stamp">${t(RULES[c] ?? c)}</span>`).join(' ')} <button data-act="forget"><small>${t('Wipe the board')}</small></button></p>` : ''}
  ${u.serverUp ? `<button data-act="account"><small>${u.account ? t('Signed in as {0}', esc(u.account.email)) : t('Sign in, if you like. Nothing needs it.')}</small></button>` : ''}
  <small>${u.best ? t('Your best quick game alone: {0} pins.', u.best) : t('Playing alone stays on this device. Nothing leaves it.')}</small>${mute()}${langBtn()}</div>
</div>`;

const names = (u: Ui) => `<div class="title"><div class="rules">
  <h2>${t('Who is bowling?')}</h2><small>${t('Two to six names. You pass the device round for secret votes and for bowling.')}</small>
  ${Array.from({ length: 6 }, (_, i) => `<input name="n" maxlength="20" placeholder="${t('Bowler {0}', i + 1)}" value="${esc(u.names[i] ?? '')}" aria-label="${t('Name of bowler {0}', i + 1)}">`).join('')}
  ${error(u)}
  ${lengths('startPass')}${back()}</div></div>`;

const online = (u: Ui) => `<div class="title"><div class="rules">
  <h2>${t('Play online')}</h2><small>${t('Everyone joins the same team, each on their own phone or computer. No account needed.')}</small>
  <input id="name" maxlength="20" placeholder="${t('Your name')}" value="${esc(u.name)}" aria-label="${t('Your name')}">
  <button class="go" data-act="create">${t('Start a new team')}</button>
  <input id="team" maxlength="6" placeholder="${t('Team id, six characters')}" value="${esc(u.team)}" aria-label="${t('Team id')}" autocapitalize="characters">
  <button class="go" data-act="join">${t('Join that team')}</button>
  ${error(u)}${back()}</div></div>`;

function account(u: Ui) {
  const a = u.account, err = error(u);
  if (a) return `<div class="title"><div class="rules"><h2>${t('Your account')}</h2><p>${esc(a.email)}</p>
    <small>${t('Your games and the rules the alley remembers of you follow you to any device you sign in on.')}</small>
    ${a.games.length ? `<table>${a.games.map((g) => `<tr><td>${new Date(g.at).toLocaleDateString(lang)}</td><td>${t('{0} pins', g.score)}</td><td>${t(g.mode === 'team' ? '{0} frames, with a team' : '{0} frames, alone', g.frames)}</td></tr><tr><td colspan="3"><small>${esc(t(g.title))}</small></td></tr>`).join('')}</table>` : `<p>${t('No games on record yet.')}</p>`}
    ${err}<button data-act="logout">${t('Sign out')}</button> ${back()}</div></div>`;
  return `<div class="title"><div class="rules"><h2>${t('Sign in')}</h2>
    <small>${t('Optional. An account keeps your games and remembered rules across devices. There is no password: you get a six-digit code by email.')}</small>
    ${u.codeFor
      ? `<p>${t('A code is on its way to {0}. It works for ten minutes.', esc(u.codeFor))}</p>
         <input id="code" inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="${t('Six-digit code')}" aria-label="${t('Six-digit code')}">
         ${err}<button class="go" data-act="verify">${t('Sign in')}</button><button data-act="account"><small>${t('Use a different address')}</small></button>`
      : `<input id="email" type="email" autocomplete="email" maxlength="254" placeholder="${t('Email address')}" aria-label="${t('Email address')}">
         ${err}<button class="go" data-act="sendCode">${t('Send me a code')}</button>`}
    ${back()}</div></div>`;
}

function lobby(u: Ui) {
  const r = u.room!, host = r.you === 0;
  return `<div class="title"><div class="rules">
    <h2>${t('Team {0}', r.team)}</h2><small>${t('Others join by typing this id, or by pointing their phone camera at the code.')}</small>
    <div class="qr">${u.qr}</div>
    ${r.rules.length ? `<p class="remember">${t('The alley remembers this team:')} ${r.rules.map((x) => `<span class="stamp">${esc(t(x))}</span>`).join(' ')}${host ? ` <button data-act="forgetTeam"><small>${t('Wipe the board')}</small></button>` : ''}</p>` : ''}
    <p>${r.members.map((m, i) => `<span class="chip ${m.online ? '' : 'away'}">${esc(m.name)}${i === r.you ? t(' (you)') : ''}${m.online ? '' : t(', away')}</span>`).join(' ')}</p>
    ${host ? (r.members.length > 1 ? lengths('startOnline') : `<p>${t('Waiting for at least one more bowler.')}</p>`) : `<p>${t('Waiting for {0} to start the game.', esc(r.members[0].name))}</p>`}
    ${back()}</div></div>`;
}

function hud(g: View, u: Ui) {
  const p = g.players.find((x) => x.id === u.me)!, liar = cardOf(g).id === 'liar' && g.phase !== 'end';
  const scores = multi(g) ? `<p>${[...g.players].sort((a, b) => b.score - a.score).map((x) => `${esc(x.name)} ${x.score}`).join(' &middot; ')}</p>` : '';
  return `<div class="hud"><span class="chip">${multi(g) ? `${esc(p.name)} &middot; ` : ''}Frame ${Math.min(g.frame + 1, g.cards.length)}/${g.cards.length} &middot; ${liar ? t('{0} pins (wrong)', p.score + 3 + (g.frame % 4)) : t('{0} pins', p.score)}</span>
    <button data-act="board" aria-expanded="${u.boardOpen}">${t('House Rules')} &middot; ${g.stamps.filter((s) => !s.struck).length}</button></div>
  ${u.boardOpen ? `<div class="board"><h3>${t('House Rules')}</h3><p>${t('Every decision adds a rule here. Go against one later and the alley calls a Split.')}</p>${stamps(g) || `<p>${t('No rules yet.')}</p>`}${scores}<button data-act="home"><small>${t('Leave this game')}</small></button> ${mute()} ${langBtn()}</div>` : ''}`;
}

function card(g: View, u: Ui) {
  const c = cardOf(g), many = multi(g), secret = c.kind === 'secret';
  const head = `<div class="panel">${face}<h2>${t(c.title)}</h2>`;
  // one thing at a time, so the panel stays small and the scene stays visible
  if (!u.read) return `${head}<p>${t(c.text)}</p>${many
    ? `<p><b>${t(secret ? 'No talking. Everyone chooses in private.' : 'Talk it over. Then everyone votes in private, and the majority decides.')}</b></p>${secret ? '' : '<div class="talk"><i></i></div>'}
       <button class="go" data-act="read">${t(secret ? 'Start choosing' : 'We are ready to vote')}</button>`
    : `<button class="go" data-act="read">${t('What can I do?')}</button>`}</div>`;
  if (u.mode === 'online' && g.votes[u.me]) return `${head}<p>${t('Your vote is in. Waiting for the others: {0} of {1} have voted.', g.voted?.length ?? 1, g.players.length)}</p></div>`;
  if (u.mode === 'pass' && !u.handed) return `${head}<p>${t('Pass the device to {0}. Nobody else looks.', `<b>${esc(nameOf(g, u.me))}</b>`)}</p>
    <button class="go" data-act="handed">${t('I am {0}', esc(nameOf(g, u.me)))}</button></div>`;
  return `${head}${many ? `<p>${t(secret ? '{0}, your choice:' : '{0}, your vote:', `<b>${esc(nameOf(g, u.me))}</b>`)}</p>` : ''}<div class="opts">${c.options.map((o) => `<button data-act="vote" data-o="${o.id}"><b>${t(o.label)}</b><small>${t(o.effect)}</small></button>`).join('')}
    <button data-act="unread"><small>${t('Read the problem again')}</small></button></div></div>`;
}

/** Where a rule on the board came from, in a full sentence, because players forget earlier frames. */
function earlier(g: View, s: View['stamps'][number]) {
  const log = g.log[s.frame], c = log && CARDS[log.card], chose = c?.options.find((o) => o.id === log.decision);
  if (s.old) return t('The alley remembers this rule from an earlier night:');
  const where = `<b>${t(c.title)}</b>`, who = multi(g) ? 'the group' : 'you'; // in Dutch the word order changes with who it was, so each is a whole sentence
  if (s.why) return t(`At an earlier Split, in {0}, ${who} gave a reason, and it became this rule:`, where);
  if (s.back) return t(`At an earlier Split, in {0}, ${who} took a rule back, and this rule replaced it:`, where);
  return t(`Earlier tonight, in {0}, ${who} chose {1}. That put this rule on the board:`, where, `<b>${t(chose?.label ?? '')}</b>`);
}

function split(g: View, u: Ui) {
  const c = cardOf(g), old = g.stamps[g.splitAgainst!], now = c.options.find((o) => o.id === g.decision)!, reasons = reasonsFor(g);
  return `<div class="panel">${face}<h2 class="splitword">SPLIT!</h2>
    <p>${earlier(g, old)} <span class="stamp ${old.why ? 'why' : ''}">${t(old.text)}</span></p>
    <p>${t(`Now ${multi(g) ? 'the group' : 'you'} chose {0}. That goes against this rule, so the alley calls a Split.`, `<b>${t(now.label)}</b>`)}</p>${u.explaining
    ? `<p>${t('Why is this case different? Pick the reason closest to yours. It becomes a rule on the board, and later choices can go against it too.')}</p><div class="opts">${reasons.map((d, i) => `<button data-act="diff" data-i="${i}"><b>${t(d.text)}</b></button>`).join('')}
       <button data-act="back"><small>${t('Back to the ways out')}</small></button></div>`
    : `<p>${t(multi(g) ? 'Decide together what to do about it.' : 'What do you want to do about it?')}</p><div class="opts">
       ${reasons.length ? `<button data-act="explain"><b>${t('Explain the difference')}</b><small>${t('Say why the two cases are not the same. Your reason is added to the board as a new rule.')}</small></button>` : ''}
       <button data-act="way" data-w="takeBack"><b>${t('Take the earlier rule back')}</b><small>${t('The old rule is replaced by its opposite, or removed. This costs nothing.')}</small></button>
       <button data-act="way" data-w="shrug"><b>${t('Shrug')}</b><small>${t('Leave the contradiction. Both rules stay, but next frame only the two far corner pins are set up.')}</small></button></div>`}</div>`;
}

function bowlStrip(g: View, u: Ui) {
  const c = cardOf(g), b = g.bowl[u.me], lane = b?.lane;
  if (u.mode === 'online' && b && frameDone(b)) return `<div class="chip strip">${t('Waiting for the others to finish bowling.')}</div>`;
  const bits = [multi(g) && u.mode === 'pass' ? t('{0} bowls.', nameOf(g, u.me)) : '',
    t(c.options.find((o) => o.id === (g.decision ?? g.votes[u.me]))?.effect ?? (c.kind === 'plain' ? c.text : '')),
    t(lane?.ball === 'wobble' ? 'You have a wobbly ball: it swerves left and right.' : lane?.ball === 'perfect' ? 'You have a perfect ball: it steers itself towards the pins.' : ''),
    g.dry ? t('The lanes are dry, so every ball is slow.') : '', g.sloppy ? t('Timo has left the machine room, so two pins are missing from every rack.') : '', g.strikeAt < 10 ? t('{0} or more pins counts as ten.', g.strikeAt) : '',
    lane?.bumpers ? t('Bumpers are up, so the ball cannot fall in the gutter.') : '', g.sevenTen ? t('Only the two corner pins are set up, because of the shrug at the Split.') : ''].filter(Boolean);
  return bits.length ? `<div class="chip strip">${esc(bits.join(' '))}</div>` : '';
}

/** For anyone who cannot or would rather not flick: set where and how hard, then press Throw. */
function aimer(g: View, u: Ui) {
  const b = g.bowl[u.me];
  if (!b || frameDone(b)) return '';
  return u.sliders
    ? `<div class="aimer chip"><label>${t('Where')}<input id="aim" type="range" min="-41" max="41" value="0" aria-label="${t('Where the ball starts, left to right')}"></label>
       <label>${t('How hard')}<input id="power" type="range" min="0" max="100" value="60" aria-label="${t('How hard to throw')}"></label>
       <label>${t('Curve')}<input id="curve" type="range" min="-100" max="100" value="0" aria-label="${t('Curve, left to right')}"></label>
       <button class="go" data-act="sliderThrow">${t('Throw')}</button><button data-act="sliders"><small>${t('Back to flicking')}</small></button></div>`
    : `<button class="aimer-toggle" data-act="sliders"><small>${t('Throw without flicking')}</small></button>`;
}

function aftermath(g: View, u: Ui) {
  const lines = g.after ?? [], last = g.frame + 1 >= g.cards.length, mine = g.bowl[u.me].pins;
  return `<div class="panel">${face}<h2>${multi(g) ? t('This frame') : t(mine === 1 ? '{0} pin' : '{0} pins', mine)}</h2>
    ${multi(g) ? `<p>${g.players.map((p) => `${esc(p.name)} ${g.bowl[p.id].pins}`).join(' &middot; ')}</p>` : ''}
    ${lines.map((l) => `<p>${esc(t(l))}</p>`).join('')}
    <button class="go" data-act="next">${t(last ? 'Total it up' : 'Next frame')}</button></div>`;
}

function end(g: View, u: Ui) {
  const s = summary(g), r = s.record, ranked = [...s.receipts].sort((a, b) => b.score - a.score);
  const again = u.mode === 'solo' ? lengths('start') : u.mode === 'pass' ? lengths('startPass')
    : u.room?.you === 0 ? lengths('startOnline') : `<p>${t('Waiting for {0} to start another game.', esc(u.room?.members[0].name ?? t('the host')))}</p>`;
  return `<div class="end"><div><h1>${t('Closing time')}</h1>
    ${multi(g) ? `<p class="big">${t("The night's winner: {0}", esc(ranked[0].name))}</p>${ranked.map((p) => `<p><b>${esc(p.name)}</b> ${t('{0} pins', p.score)} &nbsp;<small style="display:inline">${p.frames.join(' + ')}</small></p>`).join('')}`
      : `<p class="big">${t('{0} pins', ranked[0].score)}</p><p>${ranked[0].frames.join(' + ')}${g.length === 5 && u.best && ranked[0].score >= u.best ? ` &mdash; ${t('a new best.')}` : ''}</p>`}
    <h2>${t('The House Record')}</h2><p class="big">${esc(t(s.title))}</p>
    <p>${t('Splits explained: {0}', r.explained)}${r.explained ? ` ${t('(stood by in a twist: {0})', r.survived)}` : ''} &middot; ${t('taken back: {0}', r.takenBack)} &middot; ${t('shrugged: {0}', r.shrugged)}</p>
    <p>${stamps(g) || t('The board is empty: no rules were made tonight.')}</p>
    <h2>${t('What became of everyone')}</h2>${s.epilogue.map((l) => `<p>${t(l)}</p>`).join('')}
    <h2>${t(multi(g) ? 'Receipts' : 'Your receipt')}</h2>${s.receipts.map((p) => `<div class="receipt"><p><b>${esc(multi(g) ? p.name : t(p.name))}: ${t(p.title)}</b></p>${p.lines.map((l) => `<p>${t(l)}</p>`).join('')}<p>${t('Thank you for bowling.')}</p></div>`).join('')}
    <details><summary>${t('What these dilemmas were about')}</summary>${s.review.map((x) => `<p><b>${t(x.title)}.</b> ${t(x.about)}</p>`).join('')}</details>
    ${again}${back()}</div></div>`;
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
