import { defineConfig } from 'vitest/config';
export default defineConfig({ test: { include: ['tests/**/*.test.ts'], env: { TIMELINER_TODAY: '2026-11-26' }, testTimeout: 30_000, hookTimeout: 60_000 } });
