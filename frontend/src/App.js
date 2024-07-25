import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Navigation from "./components/Navigation";
import { useRestoreUserQuery } from "./store/features/api";
function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  const {isLoading, isSuccess, error } = useRestoreUserQuery();

  useEffect(() => {
    if (isSuccess) {
      setIsLoaded(true);
    }
  }, [isLoading, isSuccess, error]); // Update on query state changes

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
      {isLoading && <div>Loading user data...</div>}
    </div>
  );
}

export default App;