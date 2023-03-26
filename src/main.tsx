import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import AppProvider from "./providers/app";
import ServicesProvider from "./providers/services";
import LoadingProvider from "./components/Loading/provider";

ReactDOM.render(
  <React.StrictMode>
    <LoadingProvider>
      <ServicesProvider>
        <AppProvider>
          <RouterProvider router={router} />
        </AppProvider>
      </ServicesProvider>
    </LoadingProvider>
  </React.StrictMode>,
  document.getElementById("root")
);