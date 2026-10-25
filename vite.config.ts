// PATTERN: VITE CONFIG — minimal config for a React + TypeScript project
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],         // PATTERN: React plugin enables JSX transform + Fast Refresh
  server: {
    port: 5173,
    open: true,               // auto-opens browser on dev start
  },
});
