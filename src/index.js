import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { AuthContextProvider } from "./store/AuthContext";
import { BookSlotContextProvider } from "./store/BookSlotContext";

ReactDOM.render(
  <AuthContextProvider>
    <BookSlotContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BookSlotContextProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);
