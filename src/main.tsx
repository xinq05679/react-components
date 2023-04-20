import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProgressBarDialogProvider } from "./dialog/progressbar-dialog/useProgressBarDialog";
import { QueryDialogProvider } from "./dialog/query-dialog/useQueryDialog";
import { ModalProvider } from "./components/modal/useModal";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryDialogProvider>
      <ProgressBarDialogProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </ProgressBarDialogProvider>
    </QueryDialogProvider>
  </React.StrictMode>
);
