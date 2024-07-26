import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ModalProvider, Modal } from "./context/ModalContext";
import { ChakraProvider } from "@chakra-ui/react";

import { store } from "./store/index";
import {
  restoreCSRF,
   csrfFetch
  } from "./store/csrf";

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
}

function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
        <ChakraProvider>
          <App />
        </ChakraProvider>
          <Modal />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  );
}

// ReactDOM.createRoot(
//   <React.StrictMode>
//     <Root />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
