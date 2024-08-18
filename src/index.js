import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/styles.scss';
import App from './App';

// Below is checked by App rendering
/* istanbul ignore next */
const root = ReactDOM.createRoot(document.getElementById('paperfox-content'));
/* istanbul ignore next */
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
