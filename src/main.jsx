import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import '@fontsource-variable/quicksand';
import './scss/styles.scss';

createRoot(document.getElementById('paperfox-content')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
