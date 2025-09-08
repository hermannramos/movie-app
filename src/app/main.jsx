import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from "./store.js";

import '../styles/index.scss'

import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

const app = (
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

const rootElement = document.getElementById("root");
if(!rootElement){
  throw new Error("No se encontró #root en index.html");
}

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}