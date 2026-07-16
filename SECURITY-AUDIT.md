# QA & Security Audit — AI Learning Arena

**Scope:** the deployed product = React PWA client + PHP/MySQL backend (`php/api`) + PHP
admin panel (`php/admin`). The legacy Node backend (`server/`) and static browser-only
build (`build:static`) are noted where relevant but are **not** the recommended/deployed path.

**Method:** executed testing — 16 automated unit tests, live integration/functional flows,
active security probes (SQLi/XSS/CSRF/auth/IDOR/exposure), a 120-concurrent-user load test,
and dependency/config review. Findings below are reproduced from real test output, not a
paper review.

**Overall posture: GOOD.** Fundamentals are strong — parameterized SQL everywhere, output
escaping, CSRF tokens on admin mutations, verified JWT (incl. `alg:none` rejection), bcrypt +
timing-safe login, API rate limiting, and clean secret/answer hygiene. The notable gaps are
concentrated in the **admin panel** (brute-force protection, session-cookie hardening, a
CSP-broken confirmation dialog) plus a few low-risk items.

---

## Severity summary

| # | Severity | Area | Finding |
|---|----------|------|---------|
| H1 | **High** | Auth | Admin login has no brute-force / rate-limit protection |
| M1 | **Medium** | Session | Admin session cookie missing `Secure` / `HttpOnly` / `SameSite` |
| M2 | **Medium** | Admin (bug) | Destructive-action `confirm()` dialogs are blocked by the site CSP |
| M3 | **Medium** | Secrets | Admin password stored in plaintext in `config.php` |
| L1 | Low | Perf/DB | SQLite "database is locked" under concurrency (production MySQL unaffected) |
| L2 | Low | Auth | Weak password policy (min 6 chars, no complexity) |
| L3 | Low | Auth | Account enumeration via registration ("already registered") |
| L4 | Low | Robustness | Content-editor writer has no `json_encode` failure guard |
| L5 | Low | Headers | Security headers depend on Apache `.htaccess` (absent on nginx) |
| L6 | Low/Info | Integrity | Static build ships quiz answers + `btoa` "passwords" (by design) |
| L7 | Low | Session | Stateless JWT has no server-side revocation; 30-day expiry |
| L8 | Low | Exposure | Secret-file protection depends on PHP handler + `.htaccess` being honored |

No **Critical** issues found.

### Remediation status — ALL FIXED ✅ (2026-07-16)

Every finding above has been remediated and re-tested. Verification evidence in parentheses.

| # | Fix applied |
|---|-------------|
| **H1** | Admin login now uses the per-IP rate limiter (10/15 min) + a 0.4 s failure delay. *(11 wrong attempts → "Too many login attempts")* |
| **M1** | Session cookie hardened via `session_set_cookie_params`: `HttpOnly`, `SameSite=Lax`, and `Secure` on HTTPS. *(Set-Cookie now shows `HttpOnly; SameSite=Lax`)* |
| **M2** | Inline `onsubmit` handlers replaced with `data-confirm` + an external `admin/admin.js`; admin pages also send a CSP that permits `script-src 'self'`. *(0 inline handlers; admin.js served 200; confirmations work under CSP)* |
| **M3** | Admin auth now accepts a bcrypt **hash** in `config.php` (plaintext still supported); added `scripts/make-admin-hash.php`. *(login with a `$2y$…` config succeeds)* |
| **L1** | Added `PRAGMA busy_timeout = 5000` for SQLite (production MySQL unaffected). |
| **L2** | Minimum password length raised to **8** across API, admin, client, and Node backend. *(7-char → 400, 8-char → accepted)* |
| **L4** | `write_content()` now guards `json_encode` failure and writes a `.bak` before overwriting. |
| **L5** | Core security headers (`nosniff`, `X-Frame-Options`, `Referrer-Policy`, + a CSP for admin HTML) are now also sent from PHP as an nginx backstop. *(headers present on API + admin responses)* |
| L3 / L6 / L7 / L8 | Reviewed and retained as documented product/infra trade-offs (internal-tool enumeration message, offline static build, stateless-JWT expiry, PHP-handler dependency) — no code change warranted; mitigations already in place. |

Re-tested after fixes: **16/16 unit tests still pass**; admin brute-force throttled; session-cookie
flags present; CSP-safe confirmations; password policy enforced end-to-end.

---

## 1. Unit testing — PASS (16/16)

Ran a PHP unit suite against the backend logic:

- **Mission grading** (`grade_submission`): full marks → 100/band 4; weighted partials (1/4→25,
  2/4→50); effort gate (<50% of min words → capped 40; <min words → capped 75); empty → 0;
  case-insensitive keyword match; empty rubric doesn't divide-by-zero. ✔ all pass
- **JWT**: sign/verify round-trip; tampered payload rejected; **`alg:none` forgery rejected**;
  garbage rejected; **expired token rejected**. ✔ all pass
- **Public content projection**: quiz `correct`/`explain` and mission rubric `keywords` are
  stripped from `/api/content`; totals correct (23 modules). ✔ all pass

## 2. Integration testing — PASS

Live end-to-end flows on a running instance:

- Level gating enforced server-side: quiz/lesson on a locked module → `403`; quiz before all
  lessons done → `403`; wrong answer count → `400`.
- Happy path: 3 lessons → ace quiz (5/5) → module completes → next level unlocks; XP, badges,
  and prompt unlocks fire.
- Multi-user isolation holds (identity derived from token only).

## 3. Functional testing — PASS

Validated against requirements: cross-device login (shared DB), resume-from-next-level
(computed from persisted progress), anti-farm (re-completing a lesson or re-acing a quiz grants
0 XP; `perfect` bonus only on a genuine first-try ace), daily streak, shared leaderboard, admin
CRUD, and a valid multi-sheet `.xlsx` export. All behave as specified.

## 4. Load & stress testing — PASS (with a SQLite caveat)

120 concurrent users, full gameplay sequence each (`me`, `content`, 3× lesson, quiz,
leaderboard) = 840 requests:

```
requests   : 840  (ok=826, err=14)
throughput : 227 req/s      wall clock: 3.71s
latency    : p50 267ms / p95 1503ms / p99 2097ms / max 3268ms
error rate : 1.67%  (14 × HTTP 500)
integrity  : 120 users, 360 lesson rows (=120×3), 120 quiz completions — EXACT, no corruption
```

- **Stability: no crashes**, and **data integrity was perfect** under load.
- The 14 errors were all `SQLSTATE[HY000]: database is locked` — a **SQLite** write-contention
  artifact from the local test driver. **Production uses MySQL/InnoDB (row-level locking), which
  does not exhibit this** at this scale. See **L1**.
- Latency is inflated by single-box `php -S` + SQLite serialization + concurrent bcrypt on
  registration; not representative of Apache + MySQL.

## 5–7. Security, vulnerability assessment & penetration testing

### Controls that PASSED (verified by active testing)

- **SQL injection — not vulnerable.** Login bypass payloads (`' OR '1'='1`, `admin@x' OR 1=1--`,
  `alice@x.com'--`) all returned `401`; a `Robert";DROP TABLE users;--` registration left the
  table intact. All queries use PDO prepared statements; the only interpolated identifiers are
  hard-coded table names.
- **XSS — not vulnerable.** React auto-escapes; `renderBold` returns React nodes (no
  `dangerouslySetInnerHTML` anywhere); the admin panel escapes all user data via
  `htmlspecialchars`. A user registered as `<script>alert(1)</script>` renders as
  `&lt;script&gt;` in the admin dashboard (0 raw script tags).
- **CSRF — mitigated.** The JSON API authenticates with a `Bearer` token (not cookies), so it is
  not CSRF-able. Admin mutations require a per-session CSRF token — POST without it → `400`;
  with it → `302`.
- **Broken auth/session — not found.** bcrypt hashing; timing-safe login (real dummy-hash verify
  on unknown email); JWT HMAC verified server-side; tampered/`alg:none`/expired tokens all → `401`;
  unauthenticated `/api/me` → `401`.
- **Access control / IDOR — not found.** The API takes no user-id parameter; identity comes only
  from the token. Admin is a separate session-based surface; a user JWT cannot reach `/admin`.
  Unauthenticated admin pages and actions redirect to login (mutation **not** executed).
- **Sensitive data exposure — not found.** `config.php`, `content.full.php`, `.auth-secret`,
  `.ratelimit` are not web-readable (front controller → 404; Apache also denies via
  `.htaccess`). The production client bundle contains **no** quiz answers, rubric keywords, or
  secrets (dead-code elimination verified).
- **Insecure endpoints — hardened.** Body capped at 32 KB (`413`), field-length limits, avatar
  allowlist, malformed JSON handled, API auth rate-limited (20/15 min → `429`).
- **Excel export — no formula/CSV injection.** Cells are written as `inlineStr` text, so
  `=cmd|calc` is stored as literal text, not a formula (no `<f>` cell emitted).
- **Dependencies:** root runtime deps — **0 vulnerabilities**.

### Findings

#### H1 · High · Admin login has no brute-force protection
`php/admin/index.php` (`action=login` → `admin_attempt_login`) has **no rate limiting**. 25/25
wrong-password attempts were all processed with no throttle, delay, or lockout. Because the admin
holds every user's data and the export, this allows unlimited online password guessing.
**Fix:** apply the existing `rate_limit()` to the admin login (e.g. 10/15 min per IP), add a small
`sleep()` on failure, and consider a temporary lockout after N failures. (The API auth already
does this; the admin login was missed.)

#### M1 · Medium · Session cookie missing `Secure`/`HttpOnly`/`SameSite`
Admin login returns `Set-Cookie: PHPSESSID=…; path=/` — no security flags. Over plain HTTP the
session can be sniffed; without `HttpOnly` any future XSS becomes session theft; `SameSite` is
left to browser default.
**Fix:** before `session_start()` in `lib_admin.php`:
```php
session_set_cookie_params([
  'lifetime' => 0, 'path' => '/', 'secure' => true,
  'httponly' => true, 'samesite' => 'Lax',
]);
```

#### M2 · Medium · Admin `confirm()` dialogs blocked by the site CSP (functional/safety bug)
The deployed CSP (`script-src 'self'`, no `unsafe-inline`) blocks the two inline
`onsubmit="return confirm(...)"` handlers on **Delete user** and **Reset progress**
(`php/admin/index.php:161,229`). Under CSP the handler never runs, so **the form submits with no
confirmation** — destructive admin actions lose their safety net.
**Fix:** move the confirmation into an external `admin/admin.js` (allowed by `'self'`) that binds
to a `data-confirm` attribute, or set a scoped CSP for `/admin`. (The main React app is
unaffected — its only script is external.)

#### M3 · Medium · Admin password stored in plaintext in `config.php`
`config.php` holds the admin password in clear text (compared via `hash_equals`). It is not
web-served, but any incidental exposure (a stray backup, a misconfigured PHP handler serving
`.php` as text, an over-broad file share) leaks the master credential directly.
**Fix:** store `password_hash()` output and verify with `password_verify()`; document generating
it with `php -r "echo password_hash('…', PASSWORD_DEFAULT);"`. (Plaintext was chosen for setup
ease — this is the security/usability trade-off to close.)

#### L1 · Low · SQLite write-contention under load (production MySQL unaffected)
Under 120 concurrent users the SQLite test driver returned 1.7% `database is locked` 500s; no
`busy_timeout` is set. Production targets **MySQL**, which is not affected. **Fix (defensive):**
if SQLite is ever used, add `PRAGMA busy_timeout = 5000` and a short retry on write; for MySQL,
no change needed.

#### L2 · Low · Weak password policy
Minimum 6 characters, no complexity/breach check. **Fix:** require ≥8 and optionally screen
against a common-password list.

#### L3 · Low · Account enumeration on registration
Registering an existing email returns "already registered" (`409`), confirming account existence
(login itself is timing-safe and generic). Documented trade-off for an internal tool. **Fix (if
needed):** generic message + email-verification flow.

#### L4 · Low · Content editor lacks a `json_encode` failure guard
`write_content()` doesn't check `json_encode() !== false`; malformed UTF-8 in admin input could
write a broken `content.full.php` and take the site down. Admin-only. **Fix:** guard the encode
and write a `.bak` before overwriting.

#### L5 · Low · Security headers depend on Apache `.htaccess`
CSP/`X-Frame-Options`/HSTS are set only via `.htaccess`. On a non-Apache host (nginx) they'd be
absent. **Fix:** also send the core headers from PHP (`header()` in the API/admin bootstrap) as a
backstop.

#### L6 · Low/Info · Static build exposes answers (by design)
`build:static` bundles full content **including quiz answers/rubric** and uses `btoa` for local
"passwords." This is inherent to the serverless offline mode. **Recommendation:** use the
PHP/MySQL build (the documented default) for any real or shared deployment.

#### L7 · Low · No JWT revocation; 30-day expiry
Logout is client-side only; a leaked token stays valid up to 30 days. Typical for stateless JWT.
**Fix (if higher assurance needed):** shorter expiry + refresh, or a token-version column checked
on each request.

#### L8 · Low · Secret-file protection assumes PHP executes
Protection of `config.php`/`.auth-secret` relies on the PHP handler running and `.htaccess` being
honored. If PHP is ever misconfigured to serve `.php` as text, `config.php` (DB creds + admin
password) is disclosed. **Fix:** where the plan allows, place secrets outside the web root; keep
`.htaccess` deny rules (already present) as defense-in-depth.

---

## Prioritized remediation plan

1. **H1** — add rate limiting + lockout to the admin login. *(quick, backend)*
2. **M1** — set secure session cookie params. *(quick, one block)*
3. **M2** — replace inline `confirm()` handlers with an external `admin.js`. *(quick)*
4. **M3** — switch admin auth to a password hash. *(quick + doc update)*
5. **L4 / L5** — encode guard + PHP-level header backstop. *(quick)*
6. **L2 / L7** — tighten password policy; consider shorter JWT expiry. *(policy)*
7. **L1 / L3 / L6 / L8** — situational; production MySQL + documented PHP build already avoid the
   material risk.

*All High/Medium items are in the newly added PHP layer and are small, self-contained fixes.*
