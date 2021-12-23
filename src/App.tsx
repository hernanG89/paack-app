import React from "react";

import { Provider } from "react-redux";
import AppContent from "./navigation";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
