import React from "react";
import { Switch, Route } from "react-router-dom";
import DocumentUpload from "./components/DocumentUpload/DocumentUpload";

function App() {
  return (
    <div className="app-container">
      <div className="content-container">
        <Switch>
          <Route path="/">
            <DocumentUpload />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
