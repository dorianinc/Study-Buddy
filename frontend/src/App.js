import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import DocumentUpload from "./components/DocumentUpload/DocumentUpload";
import Navigation from "./components/Navigation";
import { useRestoreUserQuery } from "./store/features/api";
import DisplayDoc from "./components/displayDoc";
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
            <DocumentUpload />
          </Route>
        </Switch>
      </div>
      )}
      {isLoading && <div>Loading user data...</div>}
    </div>
  );
}

export default App;
