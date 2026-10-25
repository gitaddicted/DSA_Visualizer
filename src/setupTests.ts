// PATTERN: TEST SETUP — runs before every test file
import '@testing-library/jest-dom/vitest';  // adds expect(...).toBeInTheDocument() etc.
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();  // PATTERN: cleanup — unmounts React trees between tests to prevent leakage
});
