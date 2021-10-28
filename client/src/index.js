import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import { ItemsProvider } from "./contexts/ItemsContext";

ReactDOM.render(
  <ItemsProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ItemsProvider>,
  document.getElementById("root")
);
