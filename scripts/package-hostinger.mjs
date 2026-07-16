// Assembles everything to upload to Hostinger into a single ./deploy folder,
// laid out exactly like public_html. Run: npm run package:hostinger
//
//   deploy/            ← upload the CONTENTS of this to public_html
//   ├── index.html, assets/, icons/, manifest.webmanifest, sw.js, .htaccess
//   ├── api/           ← PHP + MySQL backend (you create api/config.php on the server)
//   └── admin/         ← PHP admin panel

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const deploy = path.join(root, 'deploy');
const run = (cmd) => execSync(cmd, { cwd: root, stdio: 'inherit' });

console.log('\n1/4  Refreshing content for the PHP backend…');
run('node scripts/export-content.mjs');

console.log('\n2/4  Building the web app…');
run('npm --prefix client install --no-audit --no-fund');
run('npm --prefix client run build');

console.log('\n3/4  Assembling ./deploy …');
fs.rmSync(deploy, { recursive: true, force: true });
fs.mkdirSync(deploy, { recursive: true });

// Web app (built SPA + PWA assets + .htaccess from client/public).
fs.cpSync(path.join(root, 'client', 'dist'), deploy, { recursive: true });

// PHP API — everything except local secrets / runtime data.
const skip = new Set(['config.php', '.auth-secret', 'data', '.ratelimit']);
fs.cpSync(path.join(root, 'php', 'api'), path.join(deploy, 'api'), {
  recursive: true,
  filter: (src) => !skip.has(path.basename(src)),
});

// PHP admin panel.
fs.cpSync(path.join(root, 'php', 'admin'), path.join(deploy, 'admin'), { recursive: true });

console.log('\n4/4  Done.\n');
console.log('Upload the CONTENTS of ./deploy into your Hostinger public_html, then:');
console.log('  1. In hPanel → Databases, create a MySQL database + user.');
console.log('  2. Copy deploy/api/config.sample.php to public_html/api/config.php');
console.log('     and fill in the DB name/user/password + your admin email/password.');
console.log('  3. Visit your site to register; manage users at  https://yourdomain/admin/');
console.log('\nFull steps: HOSTINGER-DEPLOY-PHP.md\n');
