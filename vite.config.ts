import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// realpath.native gives the canonical drive-letter case on Windows, so "@/x" and "./x" imports
// resolve to the same module id (otherwise React context/hooks can be duplicated).
const src = fs.realpathSync.native(path.resolve(import.meta.dirname, 'src'));

// BASE_PATH: "/TimeLiner/" for GitHub Pages (project site), "/" for Vercel / local.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  root: fs.realpathSync.native(import.meta.dirname),
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': src }, dedupe: ['react', 'react-dom'] },
});
