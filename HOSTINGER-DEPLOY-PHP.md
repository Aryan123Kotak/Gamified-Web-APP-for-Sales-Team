# Deploy to Hostinger (shared hosting) — full version with shared login, database & admin

This is the **recommended** deployment. It runs on a normal Hostinger shared plan
(the built-in **PHP + MySQL**, no Node server) and gives you everything:

- ✅ **One account works on every device** — log in on your laptop and your phone and see the same progress.
- ✅ **Every user's journey saved in a real database** (MySQL).
- ✅ **Installable app (PWA)** — an "⬇️ Install app" button at the top adds it to phones/desktops.
- ✅ **Admin panel** at `/admin` — see every user, add/edit/delete, reset progress, and **export to Excel**.

> There is also an older browser-only build (`HOSTINGER-DEPLOY.md`) that needs no database,
> but it stores progress *per-browser* — that's what caused the "wrong email/password on my
> phone" problem. Use **this** PHP version instead for shared accounts and the admin panel.

---

## What you need

- A Hostinger plan with **PHP 8.0+** and **MySQL** (all shared plans: Web / Premium / Business).
- The files this repo produces (built for you by one command below).

---

## Step 1 — Build the upload bundle (on your computer)

Install [Node.js 18+](https://nodejs.org) and [Python 3](https://python.org) once, then in the project folder run:

```bash
npm run setup            # first time only — installs dependencies
npm run package:hostinger
```

This creates a **`deploy/`** folder laid out exactly like `public_html`:

```
deploy/
├── index.html, assets/, icons/, manifest.webmanifest, sw.js, .htaccess   ← the web app (+ PWA)
├── api/     ← PHP + MySQL backend
└── admin/   ← PHP admin panel
```

## Step 2 — Create a MySQL database (in hPanel)

1. hPanel → **Databases → MySQL Databases**.
2. Create a **new database** and a **new database user**, and **add the user to the database** (all privileges).
3. Write down the **database name**, **username**, **password**, and **host** (usually `localhost`).

## Step 3 — Upload the files

1. hPanel → **Files → File Manager** → open **`public_html`**.
2. Upload **the contents of `deploy/`** into `public_html` (so you end up with
   `public_html/index.html`, `public_html/api/…`, `public_html/admin/…`).
   *Tip:* zip the contents of `deploy/`, upload the zip, then "Extract" in File Manager.

## Step 4 — Add your configuration

1. In `public_html/api/`, copy **`config.sample.php`** to **`config.php`**.
2. Edit `config.php` and fill in:
   - your **MySQL** `name`, `user`, `pass` (from Step 2),
   - your **admin** `email` and `password` (you choose these — this is your login for `/admin`).
   - leave `auth_secret` as `''` — it auto-generates on first run.

```php
'db' => [
  'driver' => 'mysql',
  'host'   => 'localhost',
  'name'   => 'u123456_arena',
  'user'   => 'u123456_arena',
  'pass'   => 'your-db-password',
],
'admin' => [
  'email'    => 'you@yourcompany.com',
  'password' => 'a-strong-admin-password',
],
```

The database tables are created **automatically** the first time someone visits — no SQL to import.

## Step 5 — Turn on HTTPS

hPanel → **Security → SSL** → install the free SSL for your domain, then force HTTPS.
(The app sets secure headers and the install button/PWA require HTTPS.)

## Done 🎉

- **Team:** everyone opens your domain, taps **New Player**, and registers. The same login works on
  every device, and the leaderboard is shared automatically.
- **Install the app:** the **⬇️ Install app** button (top of the screen) installs it to a phone/desktop.
- **Admin:** go to `https://yourdomain/admin/`, sign in with the admin email/password from `config.php`.
  - See every user and their full journey (lessons, quizzes, mission submissions, badges, XP log).
  - Add / edit / delete users, reset passwords, adjust XP, mark levels complete, grant/revoke badges.
  - Edit lessons / quizzes / missions under **Content**.
  - **⬇️ Export Excel** downloads an `.xlsx` of all users and their data.

---

## Updating later

- **App or backend code changed:** run `npm run package:hostinger` again and re-upload `deploy/`
  (your `api/config.php` stays on the server — don't overwrite it).
- **Course content changed** in `server/content/*.js`: the packaging step regenerates it, or you can
  edit content live in the **admin → Content** editor.

## Notes & troubleshooting

- **Keep `config.php` private.** It's never served to browsers (a direct hit runs PHP and returns
  nothing), and `api/.htaccess` also denies it. Never commit it to git.
- **Quiz answers are safe.** They live only in `api/content.full.php` (server-side) and are stripped
  from everything sent to the browser.
- **Upload at the domain root.** The app uses absolute paths (`/assets`, `/api`). If you must run it
  from a subfolder, ask and we'll switch it to relative paths.
- **"Session expired" right after login:** make sure you uploaded `api/.htaccess` (it passes the login
  token through to PHP). Most Hostinger setups handle this automatically.
