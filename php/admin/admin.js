// Confirmation prompts for destructive admin actions. Loaded as an external file
// so it works under the site's Content-Security-Policy (script-src 'self'), which
// blocks inline on* handlers. Any <form data-confirm="…"> asks before submitting.
document.addEventListener('submit', function (e) {
  var form = e.target;
  if (!form || !form.getAttribute) return;
  var msg = form.getAttribute('data-confirm');
  if (msg && !window.confirm(msg)) {
    e.preventDefault();
    e.stopPropagation();
  }
}, true);
