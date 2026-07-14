# ⚡ AI Learning Arena

A **gamified learning web app** for Malpani Group, built from the *AI Complete Teaching Guide* — a beginner-friendly corporate curriculum for responsible, productive and human-centred AI use.

Employees level up from **🌱 AI Newcomer** to **🏆 AI Champion** by clearing 23 levels across 3 stages — reading lessons, passing quizzes, collecting a toolkit of prompt cards, and completing graded practice missions.

## The three stages (23 levels)

- **🟢 Stage 1 · AI Ready** (Levels 0–6) — getting comfortable, what AI is/isn't, AI vs Google vs Human, safe/responsible use (Green-Yellow-Red), prompting (RTF / CTRO / CO-STAR), verification (PAUSE), image models.
- **🔵 Stage 2 · Advanced Toolkit** (Levels 7–14) — Projects, Documents & Vision, Research, Context Engineering & Tokens, Reverse Engineering, Skills/GPTs/Gems, Connectors, MCP.
- **🟣 Stage 3 · Automation Builder** (Builder Levels 1–8) — select the problem, map the process, choose the capability, design human control, build & test, security & approval, measure the result, and a capstone.

## The game

| System | What it does |
|---|---|
| 🗺️ **Learning Journey** | 23 levels across 3 stages, unlocked in order |
| 📖 **Lessons** | ~70 bite-size lesson cards distilled from the guide, with real case studies (Moderna, Morgan Stanley, Air Canada, Coca-Cola, BBVA, Klarna…) — +10 XP each |
| ⚔️ **Level Quizzes** | 5-question quiz per level, graded server-side, +10 XP per correct, +25 for a flawless first try. **Score 80%+ to pass** and unlock the next level. Retakes allowed — XP only for improving your best (no farming) |
| 🃏 **Prompt Toolkit (Vault)** | Every framework & template from the guide (RTF, CTRO, CO-STAR, PAUSE card, approval canvas…) as collectible cards with one-click copy. Unlock a level's cards by passing its quiz |
| 🎖️ **Graded Missions** | One practice mission per level. You **submit your work** and it's **auto-graded on a rubric out of 100** with a band (Needs support → Developing → Competent → Can guide others) and per-point feedback. XP scales with your marks; reach **Competent (65+)** for the badge |
| 🔥 **Streaks** | +5 XP for each new day you learn; streak badges at 3 and 7 days |
| 🏆 **Badges** | One per level + achievements + stage-completion badges (AI Ready, Toolkit Complete, Automation Builder, AI Champion) |
| 📊 **Leaderboard** | Real shared team leaderboard — all-time and this-week XP |

**Ranks:** AI Newcomer → AI Aware → Safe AI User → Prompt Practitioner → Toolkit Explorer → Advanced Operator → Automation Builder → AI Champion.

## How missions are graded

Each mission lists the task and the points it's scored on. When a learner submits, the server checks the text against a keyword rubric for each point, applies an effort/length check, and returns:

- a **mark out of 100**,
- a **4-point band** (Needs support / Developing / Competent / Can guide others),
- **per-criterion feedback** (which points were covered, which were missed),
- **XP scaled to the mark** (paid only for improving a previous best).

Grading is fully **offline and deterministic** — no AI API key required. Rubric keywords live server-side and are never sent to the browser (only the human-readable criteria labels are shown).

## Tech

- **Frontend:** React 18 + Vite + React Router — WHAM-style neon-arcade design (hot pink / electric green / zap yellow on deep purple), comic borders, confetti, WebAudio arcade sounds.
- **Backend:** Node + Express + SQLite (`better-sqlite3`) — real accounts (bcrypt + JWT), server-side quiz grading (answers never sent to the browser), XP event log for weekly rankings.
- No external services or API keys needed.

## Run it

```bash
# 1. Install everything (root + client)
npm run setup

# 2a. Development (server on :4000, client on :5173 with hot reload)
npm run dev
# → open http://localhost:5173

# 2b. Production (single server serves the built app)
npm run build
npm start
# → open http://localhost:4000
```

Requires **Node 18+**. The SQLite database is created automatically at `server/data/arena.sqlite` on first run.

### Deploying for the team

Any Node host works (Render, Railway, Fly.io, a small VPS):

1. Build: `npm run setup && npm run build`
2. Start: `npm start` (set `PORT` if needed; optionally set `JWT_SECRET` — otherwise one is generated and persisted)
3. Make sure `server/data/` is on a persistent disk so accounts and progress survive restarts.
4. Set `ALLOWED_ORIGINS` to your deployed frontend URL if you serve the client from a different origin.

Everyone on the team registers with their own account; the leaderboard is shared automatically.

### Configuration (environment variables)

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `4000` | Server port |
| `JWT_SECRET` | auto-generated & persisted | Signing key for auth tokens |
| `ALLOWED_ORIGINS` | `http://localhost:5173,http://localhost:4000` | Comma-separated CORS allowlist (same-origin and non-browser clients are always allowed) |
| `AUTH_RATE_LIMIT_MAX` | `20` | Max login/register attempts per IP per 15 min |

### Security

The backend is hardened against common web risks:

- **Auth** — passwords hashed with bcrypt; JWTs verified server-side (forged/tampered tokens rejected); login is timing-safe against email enumeration.
- **Rate limiting** — login and registration are throttled per IP (`AUTH_RATE_LIMIT_MAX`) to resist brute-force and spam.
- **Headers** — `helmet` sets a Content-Security-Policy (fonts + inline styles allowed, scripts locked to same-origin), `X-Frame-Options` (clickjacking), `nosniff`, and HSTS.
- **CORS** — restricted to an explicit allowlist rather than a wildcard.
- **Input** — request bodies capped at 32 KB; name/email/password length-limited; avatar validated against a fixed set; all DB access uses parameterized statements (no SQL injection).
- **Game integrity** — quiz answers are stripped from `/api/content`; XP is award-once / improvement-only; the "flawless" perfect bonus and badge require a genuine first-attempt ace (you can't fail, read the revealed answers, and resubmit to farm it).

Note: registering an email that already exists returns a clear "already registered" message (helpful for an internal tool); if you need to hide account existence entirely, add an email-verification flow.

## Project structure

```
├── server/
│   ├── index.js          # Express API + static serving
│   ├── db.js             # SQLite schema
│   └── content/          # 23 levels across 3 stage files + index (ranks, badges, XP)
│       ├── stage1.js     # AI Ready — Levels 0–6
│       ├── stage2.js     # Advanced Toolkit — Levels 7–14
│       ├── stage3.js     # Automation Builder — Builder Levels 1–8
│       └── index.js      # combines stages; ranks, badges, XP, public content
├── client/
│   └── src/
│       ├── pages/        # Dashboard, LevelMap, ModulePage, BossQuiz, Vault, Missions, Badges, Leaderboard, Auth
│       ├── components/   # Layout/HUD, LessonBlocks, PromptCard
│       └── styles.css    # WHAM neon-arcade design system
└── package.json          # setup / dev / build / start scripts
```

## Editing the content

All learning content lives in `server/content/stage1.js`, `stage2.js` and `stage3.js`. Each level is plain data — lessons (paragraph/list/table/callout/prompt blocks), a 5-question quiz with answers + explanations, prompt cards, and submission missions (each with a keyword rubric). To change the pass mark, edit `PASS_RATIO` in `server/index.js` (currently `0.8` = 80%). Ranks, XP values and badges live in `server/content/index.js`.
