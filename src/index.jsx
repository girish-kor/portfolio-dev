import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './global.scss';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("❌ Root element not found! Ensure your index.html has `<div id='root'></div>`");
} else {
  const root = createRoot(rootElement);
  root.render(<App />);
}
