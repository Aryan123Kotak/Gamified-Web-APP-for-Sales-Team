# 🚀 Deploying to Hostinger (shared Web / Premium / Business hosting)

This is the **static, browser-only** version of AI Learning Arena. It runs entirely
in each visitor's browser — no server, no database — so it works on ordinary shared
hosting. Progress (XP, badges, quiz + mission results) is saved in each person's own
browser via `localStorage`.

> **What this version does and doesn't do**
> - ✅ All 23 levels, lessons, quizzes (80% to pass), the prompt-card vault, and the
>   auto-graded missions — all fully working offline.
> - ✅ Progress saved per person, in their browser, and survives refreshes.
> - ⚠️ **No shared, company-wide leaderboard** and **no cross-device login** — those
>   need the always-on server version. The "Ranks" page here only shows profiles
>   created on that same device/browser.
>
> If you later want the live team leaderboard, run the server version on a free host
> like Render (see the main `README.md`) and point a Hostinger domain at it.

---

## Step 1 — Build the static site

On any computer with **Node.js 18+** installed, in the project folder:

```bash
npm run setup        # first time only — installs dependencies
npm run build:static
```

This creates a folder: **`client/dist/`**. Everything inside it is your website.

> Already have `client/dist` from a normal `npm run build`? Rebuild with
> `npm run build:static` — the static (offline) build is different.

---

## Step 2 — Upload it to Hostinger

You can use **hPanel's File Manager** (easiest) or **FTP**.

### Option A — File Manager (no extra software)

1. Log in to **hPanel** → your website → **File Manager**.
2. Open the **`public_html`** folder.
   - Hosting the app at your main domain (e.g. `yourdomain.com`)? Upload into
     `public_html` directly.
   - Want it in a subfolder (e.g. `yourdomain.com/arena`)? Create a folder like
     `public_html/arena` and upload into that instead. (The app uses relative paths,
     so a subfolder works fine.)
3. Upload **the contents of `client/dist`** (not the `dist` folder itself) — so that
   `index.html` sits directly inside `public_html` (or your subfolder).
   - Tip: zip the contents of `client/dist`, upload the zip, then use File Manager's
     **Extract** — much faster than uploading files one by one.
4. **Important — include the hidden `.htaccess` file.** It sets the security headers.
   In File Manager, click **Settings → Show hidden files (dotfiles)** so you can see
   and upload `.htaccess`. If you zipped, make sure the zip included it.

### Option B — FTP (e.g. FileZilla)

1. In hPanel → **Files → FTP Accounts**, get your FTP host, username and password.
2. Connect with FileZilla, open `public_html`, and drag the **contents of
   `client/dist`** into it (enable "show hidden files" so `.htaccess` transfers).

---

## Step 3 — Turn on HTTPS (free)

In hPanel → **Security → SSL**, install the free SSL certificate for your domain
(usually one click, may take a few minutes). This makes the site load over `https://`
and activates the HSTS security header.

---

## Step 4 — Open your site 🎉

Visit `https://yourdomain.com` (or `.../arena` if you used a subfolder).
Click **New Player**, create a profile, and start Level 0.

---

## Updating the content later

The learning content lives in these files:

- `client/src/game/stage1.js` — Stage 1 (Levels 0–6)
- `client/src/game/stage2.js` — Stage 2 (Levels 7–14)
- `client/src/game/stage3.js` — Stage 3 (Builder Levels 1–8)
- `client/src/game/index.js` — ranks, badges, XP values

After editing, re-run `npm run build:static` and re-upload the new `client/dist`
contents (Step 2). Returning visitors keep their saved progress.

> Note: this static build has its **own copy** of the content under
> `client/src/game/`. The server version uses `server/content/`. If you maintain both,
> update both — but for Hostinger you only need the `client/src/game/` copy.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| Blank page / assets 404 | You uploaded the `dist` **folder** instead of its **contents**. `index.html` must be directly inside `public_html` (or your subfolder). |
| Fonts look plain | The arcade font loads from Google Fonts over the internet — it appears once the page can reach `fonts.googleapis.com`. Make sure SSL/HTTPS is on. |
| Security headers missing | The hidden `.htaccess` didn't upload. Enable "show hidden files" and upload it. |
| "That email is already registered on this device" | Profiles are per-browser. Use a different email, or log in with the existing one. |
| Everyone's progress looks separate | That's expected — this offline version stores progress per browser. For shared progress/leaderboard, use the server version. |
