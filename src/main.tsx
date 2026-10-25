// ENTRY POINT — Vite loads this module from index.html
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/globals.css';  // SIDE-EFFECT IMPORT — injects global CSS into <head>

// PATTERN: createRoot renders the entire React tree into a DOM node
createRoot(document.getElementById('root')!).render(
  // PATTERN: StrictMode wraps the app to detect side effects (double-renders in dev)
  <StrictMode>
    <App />
  </StrictMode>
);
