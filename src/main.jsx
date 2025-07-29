import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Buffer } from "buffer";
import { store } from "./store/store.js";
import { Provider } from "react-redux";

if (!window.Buffer) {
  window.Buffer = Buffer;
}

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
