import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The server build (BrowserRouter, served from Express at the domain root) needs
// absolute asset paths — otherwise a page reload on a deep route like /module/5
// resolves assets against the wrong path and 404s.
// The static Hostinger build (HashRouter, VITE_LOCAL=1) needs relative paths so
// it works from any folder (public_html or a subfolder), since all routing there
// happens after the # and every request always loads the same index.html.
const isStatic = process.env.VITE_LOCAL === '1' || process.env.VITE_LOCAL === 'true';

export default defineConfig({
  plugins: [react()],
  base: isStatic ? './' : '/',
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
  },
});
