import React, { useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import { useRestoreUserQuery } from "./store/features/api";
import MyFolders from "./components/Folder/MyFolders";
import MyDocuments from "./components/Document/MyDocuments";
import MyNotes from "./components/Note/MyNotes";
import DocumentPageTest from "./components/DocumentPageTest/DocumentPageTest";

function App() {
  const user = useSelector((state) => state.session.user);
  const { isLoading } = useRestoreUserQuery();

  return (
    <div className="app-container">
      <Navigation />
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
              <MyNotes />
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
