import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Auth0Provider
        domain="dev-hg0u8gx37e2g85v8.us.auth0.com"
        clientId="u3YVR95BNlkOfrhBfFHqemNXwganO7Kx"
        authorizationParams={{
            redirect_uri: "http://localhost:5173",
        }}
    >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Auth0Provider>,
);
