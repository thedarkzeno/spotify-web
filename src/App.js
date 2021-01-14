import React from "react";
import { Provider } from "react-redux";
import Routes from "./Routes";
import store from "./Store";
import "./App.css";
import { GlobalStyles } from "./styles/GlobalStyles";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Routes />
      </Provider>
      <GlobalStyles />
    </div>
  );
}

export default App;
