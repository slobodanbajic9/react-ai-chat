import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ClerkProvider } from "@clerk/clerk-react";

const CLERK_API_KEY = process.env.REACT_APP_VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_API_KEY) {
  throw new Error("Missing Clerk API key");
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={CLERK_API_KEY}
      afterSignOutUrl="/sign-in"
      signUpUrl="/sign-up">
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
