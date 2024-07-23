import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Navigation from "./components/Navigation";

function App() {
  const [isLoaded, setIsLoaded] = useState(true);
 

  return (
    <div className="app-container">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <div className="content-container">
          <Switch>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      )}
    </div>
  );
}

export default App;
