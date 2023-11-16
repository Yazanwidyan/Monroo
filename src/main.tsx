import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import App from "./App.tsx";
import { themes } from "./ChakraThemes.ts";
import LookupsProvider from "./contexts/LookupsContext.tsx";
import "./index.scss";
import "./Localization/i18next.ts";
import { SnackBarProvider } from "./contexts/SnackbarContext.tsx";
import SnackBar from "./components/molecules/snackbar/SnackBar.tsx";

const theme = extendTheme(themes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <SnackBarProvider>
        <LookupsProvider>
          <App />
        </LookupsProvider>
        <SnackBar />
      </SnackBarProvider>
    </ChakraProvider>
  </React.StrictMode>
);
