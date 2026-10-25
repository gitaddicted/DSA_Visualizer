import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';  // PATTERN: Global CSS import — applies design tokens to all stories

// PATTERN: STORYBOOK PREVIEW — global decorators and parameters applied to every story
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,  // auto-detects color props for color picker
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',   // PATTERN: Default dark background matches the app's theme
      values: [
        { name: 'dark', value: '#0d1117' },
        { name: 'light', value: '#ffffff' },
      ],
    },
    layout: 'padded',    // PATTERN: Adds padding around each story
  },
};

export default preview;
