import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BudgetProvider } from './contexts/BudgetContexts';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BudgetProvider>
      <App />  
    </BudgetProvider>
  </StrictMode>
);

