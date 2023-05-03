import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryDialogProvider } from "./hooks/useQueryDialog";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryDialogProvider>
      <App />
    </QueryDialogProvider>
  </React.StrictMode>
);
