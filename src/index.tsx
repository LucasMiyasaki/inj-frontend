import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import "./i18next";
import { Theme } from "./lib/themes/theme";

import { register } from "swiper/element/bundle"

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

register();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <App />
      <ToastContainer/>
    </ThemeProvider>
  </React.StrictMode>,
);
