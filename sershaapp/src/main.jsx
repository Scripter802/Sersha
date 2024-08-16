import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AppProvider } from './context/context.jsx';
import { MusicProvider } from './context/MusicContext.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AppProvider>
    <MusicProvider >
      <App />
    </MusicProvider>
  </AppProvider>
  // </React.StrictMode>,
);
