# Split Decision

A bowling game in which every frame starts with something wrong on the lane and a dilemma about what to do with it. The group decides, then everyone bowls the result for their own score. The alley remembers what you decided: contradict yourselves and it calls a Split.

The full design is in [Split Decision — gameplay and scenarios.md](<Split Decision — gameplay and scenarios.md>).

It is a PWA: it runs in the browser on phones and computers and can be installed to the home screen.

## Ways to play

| Mode | Needs the server | Notes |
| --- | --- | --- |
| Alone | No | Works offline once loaded. The alley remembers your rules on this device. |
| Passing one device round | No | 2 to 6 names. Votes are private: the screen says who to hand it to. |
| Each on their own phone | Yes | Start a team, others join by its six-character id or by scanning the QR code. |

Accounts are optional and have no password: you get a six-digit code by email. An account keeps your games and remembered rules across devices.

Quick game: 5 frames. Full game: 10 frames, plus an eleventh with bumpers if nobody shrugged at a Split.

## Running it

### With Docker (production)

```bash
cp .env.example .env    # optional: mail settings and limits
docker compose up -d --build
```

The game is then served on port 8080. Its database lives in the `split-data` volume.

The server is meant to sit behind Caddy. A minimal Caddyfile:

```
bowling.example.com {
    reverse_proxy localhost:8080
}
```

Caddy handles HTTPS, which installing the app and the service worker need. The server believes the player address Caddy passes in `X-Forwarded-For` (`TRUST_PROXY`, on by default). So make sure Caddy is the only way in: publish the port only on localhost by changing the ports line in `docker-compose.yml` to `"127.0.0.1:8080:8080"`, or leave it out if Caddy runs in the same Docker network.

### For development

Needs Node 24 or newer (the server uses the built-in `node:sqlite`).

```bash
npm install
npm run dev       # the game, with live reload, on http://localhost:5173
npm run server    # the game server on :8080, for online play and accounts
npm test
npm run build     # type-checks and builds into dist/, which the server serves
```

Without `npm run server` the game still works; the online options just do not appear.

`http://localhost:5173/cast.html` shows every character in each mood.

## Settings

Everything goes in `.env`; all of it is optional. See [.env.example](.env.example) for the full list with defaults.

- **Mail**: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`. Without `SMTP_HOST`, login codes are printed in the server log, which is enough to try things out.
- **`TRUST_PROXY`**: on by default. Set to `0` if the server faces the internet without Caddy.
- **Limits**: how fast teams and accounts may be made, how many may exist, how many connections the server takes, and how many game messages a connection may send. `0` switches a limit off. They are all defined in [src/server/limits.ts](src/server/limits.ts).

## Where things are

```
src/shared/          runs in the browser and on the server
  engine.ts          the rules: votes, Splits, stamps, scores, the end-of-game summary
  sim.ts             the bowling physics; the same throw always gives the same pins
  cards/             every dilemma as data: chains.ts, fatman.ts, oneoffs.ts, and the rules in rules.ts
src/client/          the game in the browser
  main.ts            ties it together
  ui.ts              the paper panels and screens
  scenes.ts          what is acted out on the lane for each card
  cast/              the characters, drawn as SVG
  stage/             the lane, the room, effects, the cast on stage
  audio.ts           every sound, synthesised; there are no audio files
src/server/          the online part
  rooms.ts           teams and online games
  auth.ts            email-code login and accounts
  limits.ts          every limit, changeable via .env
```

To add or change a dilemma, edit the files in `src/shared/cards/`; the tests in `src/shared/engine.test.ts` check that the card data hangs together and play 400 random games through to the end.
