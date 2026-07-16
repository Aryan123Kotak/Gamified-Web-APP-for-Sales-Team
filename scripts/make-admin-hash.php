<?php
// Generate a bcrypt hash for the admin password, to paste into api/config.php.
// Usage:  php scripts/make-admin-hash.php 'your-strong-password'
$pw = $argv[1] ?? '';
if (strlen($pw) < 8) {
  fwrite(STDERR, "Usage: php scripts/make-admin-hash.php 'your-password'  (min 8 chars)\n");
  exit(1);
}
echo password_hash($pw, PASSWORD_BCRYPT), "\n";
