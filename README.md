# ⚡ AI Sales Arena

A **gamified learning web app** for the Malpani Group sales team, built from *The AI Sales Productivity Playbook* (ChatGPT · Claude · Gemini).

Reps level up from **🐣 AI Rookie** to **👑 10× Seller** by clearing 16 modules — one per playbook section — beating boss quizzes, collecting prompt cards, and completing real-world missions at their actual desk.

## The game

| System | What it does |
|---|---|
| 🗺️ **Campaign Map** | 16 modules (Sections 0–15 of the playbook), unlocked in order |
| 📖 **Lessons** | 58 bite-size lesson cards distilled from the playbook (+10 XP each) |
| ⚔️ **Boss Quizzes** | 5-question fight per module, graded server-side, +10 XP per hit, +25 for a flawless run. Score 60%+ to win. Retakes allowed — XP only for improving your best (no farming) |
| 🃏 **Prompt Vault** | All 33 copy-paste prompts from the playbook as collectible cards (common → legendary) with one-click copy. Unlock a module's cards by beating its boss |
| 🎖️ **Missions** | 7 real-world actions (build your Sales Cockpit, connect your CRM, run a scrape…) worth +40 XP — this is where the actual 10× happens |
| 🔥 **Streaks** | +5 XP for each new day you show up; streak badges at 3 and 7 days |
| 🏆 **Badges** | 26 badges: one per module + achievements (Flawless Victory, Vault Master, Arena Champion…) |
| 📊 **Leaderboard** | Real shared team leaderboard — all-time and this-week XP |

**Ranks:** AI Rookie → Prompt Apprentice → Framework Fighter → Connector Cadet → Automation Operator → Lead Hunter → Deal Closer → 10× Seller.

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
│   └── content/          # All 16 modules: lessons, quizzes, prompts, missions, ranks, badges
├── client/
│   └── src/
│       ├── pages/        # Dashboard, LevelMap, ModulePage, BossQuiz, Vault, Missions, Badges, Leaderboard, Auth
│       ├── components/   # Layout/HUD, LessonBlocks, PromptCard
│       └── styles.css    # WHAM neon-arcade design system
└── package.json          # setup / dev / build / start scripts
```

## Editing the content

All learning content lives in `server/content/modules-a.js` (modules 0–7) and `modules-b.js` (modules 8–15). Each module is plain data — lessons (paragraph/list/table/callout/prompt blocks), a quiz with answers + explanations, prompt cards, and missions — so updating the playbook is just editing those files. Ranks, XP values and badges live in `server/content/index.js`.
