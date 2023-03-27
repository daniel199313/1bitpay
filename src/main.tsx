import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import AppProvider from "./providers/app";
import LoadingProvider from "./components/Loading/provider";
import ToastProvider from "./components/Toast/provider";

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider>
      <LoadingProvider>
        <AppProvider>
          <RouterProvider router={router} />
        </AppProvider>
      </LoadingProvider>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
