import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Navigation from "./components/Navigation";
import { useRestoreUserQuery } from "./store/features/api";
function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  const { data: user, isLoading, } = useRestoreUserQuery();

  useEffect(() => {
    if (user) {
      setIsLoaded(true);
    }
  }, [user]);

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