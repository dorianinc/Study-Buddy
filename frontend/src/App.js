import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import { useRestoreUserQuery } from "./store/features/api";
import MyFolders from "./components/Folder/MyFolders";
import MyDocuments from "./components/Document/MyDocuments";
import DocumentPageTest from "./components/DocumentPageTest/DocumentPageTest";
import { useSelector } from "react-redux";
import DisplayDoc from "./components/displayDoc/DisplayDoc";

function App() {
  const user = useSelector((state) => state.session.user);
  const { isLoading } = useRestoreUserQuery();

  return (
    <div className="app-container">
      <Navigation />
      <DisplayDoc/>
      {user && (
        <div className="content-container">
          <Switch>
            <Route exact path="/folders/:folderId/:documentId">
              <DocumentPageTest />
            </Route>
            <Route exact path="/folders/:folderId">
              <MyDocuments />
            </Route>
            <Route path="/">
              <MyFolders />
            </Route>
          </Switch>
        </div>
      )}
      {isLoading && <div>Loading user data...</div>}
    </div>
  );
}

export default App;
