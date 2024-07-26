import React from "react";
import { Switch, Route } from "react-router-dom";
import DocumentUpload from "./components/DocumentUpload/DocumentUpload";
import Navigation from "./components/Navigation/Navigation";
// import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
      <div className="app-container">
        <div className="content-container">
          <Switch>
            <Route path="/">
              <DocumentUpload />
            </Route>
          </Switch>
          <Switch>
          </Switch>
        </div>
      </div>
  );
}

export default App;
