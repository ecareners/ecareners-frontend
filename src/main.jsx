import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AppProvidersWrapper from './components/wrappers/AppProvidersWrapper';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvidersWrapper>
        <App />
      </AppProvidersWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
