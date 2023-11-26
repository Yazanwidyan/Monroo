import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import App from "./App.tsx";
import { themes } from "./ChakraThemes.ts";
import LookupsProvider from "./contexts/LookupsContext.tsx";
import "./index.scss";
import "./Localization/i18next.ts";
import { UserProvider } from "./contexts/UserContext.tsx";
import LanguageProvider from "./Localization/LanguageProvider.tsx";

const theme = extendTheme(themes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <LanguageProvider>
        <UserProvider>
          <LookupsProvider>
            <App />
          </LookupsProvider>
        </UserProvider>
      </LanguageProvider>
    </ChakraProvider>
  </React.StrictMode>
);
