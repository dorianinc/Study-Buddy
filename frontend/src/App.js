import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";

function App() {

  return (
    <div className="app-container">
        <div className="content-container">
          <Switch>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
    </div>
  );
}

export default App;
