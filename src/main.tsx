import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import AppProvider from "./providers/app";
import LoadingProvider from "./components/Loading/provider";

ReactDOM.render(
  <React.StrictMode>
    <LoadingProvider>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </LoadingProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
