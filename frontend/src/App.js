import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/sessionReducer";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage/HomePage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

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
