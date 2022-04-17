import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.js";
import store from "./state/store";
import theme from "./utils/theme";
import { Provider } from "react-redux";

import { ThemeProvider } from "styled-components";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
