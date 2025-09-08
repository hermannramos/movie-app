import React, { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom/server";

import App from "../app/App.jsx";
import { store } from "../app/store.js";

export async function render(url) {
    const html = renderToString(
    <Provider store={store}>
        <StaticRouter location={url}>
            <App />
        </StaticRouter>
    </Provider>
    );
    return { html };
}