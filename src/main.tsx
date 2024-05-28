// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import React, {StrictMode} from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./scss/index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <StrictMode>
        <App />
    // </StrictMode>
);
