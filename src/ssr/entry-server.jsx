// src/ssr/entry-server.jsx
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "../app/App.jsx";
import { store } from "../app/store.js";

export function render(url) {
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>
  );
  return { html };
};