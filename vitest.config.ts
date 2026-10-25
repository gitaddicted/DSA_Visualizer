// PATTERN: VITEST CONFIG — test runner configuration
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['./tests/unit/**/*.test.{ts,tsx}'],  // PATTERN: Include pattern — which tests to run
    globals: true,          // PATTERN: globals — lets tests use describe/it/expect without imports
    environment: 'jsdom',   // PATTERN: jsdom — simulates browser DOM in Node for component tests
    setupFiles: './src/setupTests.ts',  // runs before each test file
  },
});
