import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { DarkModeProvider } from '../src/components/DarkModeContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DarkModeProvider>
        <App />
        </DarkModeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

