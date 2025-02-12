import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GlobalProvider } from "./contexts/GlobalProvider.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="193052259849-kikecos0g85mt60dvvj8gs2nv69m5dh6.apps.googleusercontent.com">
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </GoogleOAuthProvider>
);
