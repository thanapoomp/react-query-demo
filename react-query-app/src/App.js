/**
 * Entry application component used to compose providers and render Routes.
 * */

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { ReactQueryDevtools } from "react-query/devtools";
import TokenHandler from "./app/modules/_auth/components/TokenHandler";
import { Routes } from "./app/routes/Routes";

// import * as CONST from "../Constants";
// import { Helmet } from "react-helmet";
const queryClient = new QueryClient();

export default function App({ store, persistor, basename }) {
  return (
    /* Provide Redux store */
    <Provider store={store}>
      {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
      <PersistGate persistor={persistor}>
        {/* Override `basename` (e.g: `homepage` in `package.json`) */}
        <QueryClientProvider client={queryClient}>
          <HashRouter basename={basename}>
            {/* Render routes with provided `Layout`. */}
            <Routes />
            <TokenHandler></TokenHandler>
          </HashRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
