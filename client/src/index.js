import React from "react";
import { render } from "react-dom";
import FunProvider from "./FunProvider";
import App from "./components/App";

render(
  <FunProvider>
    <App />
  </FunProvider>,
  document.getElementById("root")
);
