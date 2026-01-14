import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './lang/index';
import App from './App/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
