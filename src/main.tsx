import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import FadeIn from './components/FadeIn.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FadeIn delay={100}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FadeIn>
  </StrictMode>,
);
