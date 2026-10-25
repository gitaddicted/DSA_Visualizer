import type { StorybookConfig } from '@storybook/react-vite';

// PATTERN: STORYBOOK CONFIG — tells Storybook where to find stories and which addons to use
const config: StorybookConfig = {
  // PATTERN: Glob pattern — discovers all .stories.tsx files in src/
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  // PATTERN: addon-essentials bundles Controls, Actions, Docs, Viewport, Backgrounds
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',  // integrates with Vite (no webpack)
    options: {},
  },
  docs: {
    autodocs: 'tag',  // PATTERN: Auto-generates docs for stories tagged ['autodocs']
  },
};

export default config;
