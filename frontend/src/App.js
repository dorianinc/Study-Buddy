import React from "react";
import { Switch, Route } from "react-router-dom";
import DocumentUpload from "./components/DocumentUpload/DocumentUpload";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <div className="app-container">
        <div className="content-container">
          <Switch>
            <Route path="/">
              <DocumentUpload />
            </Route>
          </Switch>
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
