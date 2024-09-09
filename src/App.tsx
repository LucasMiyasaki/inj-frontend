import React, { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { entryScreens } from "./lib/routes/routes-manager";
import { Provider } from "react-redux";
import { store, persistor } from "./store/index";
import { PersistGate } from "redux-persist/integration/react";

function App(): ReactElement {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <BrowserRouter>
          <Routes>
            {entryScreens.map((item) => {
              const Component = item.screen;
              return (
                <Route
                  key={item.route}
                  path={item.route}
                  element={<Component />}
                />
              );
            })}
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
