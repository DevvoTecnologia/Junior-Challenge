import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import Global from "./styles/global";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Global />
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById("root")
);
