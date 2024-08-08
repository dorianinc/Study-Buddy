import React from "react";
import { useRestoreUserQuery } from "./store/features/api";
import MyFolders from "./components/Folder/MyFolders";
import MyDocuments from "./components/Document/MyDocuments";
import MyNotes from "./components/Note/MyNotes";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Viewer from "./components/Viewer";

const App = () => {
  const { data: user, isLoading } = useRestoreUserQuery();

  return (
    <div className="app-container">
      <Navigation />
      {user && (
        <div className="content-container">
          <Routes>
            <Route path="/folders/:folderId/:docId" element={<Viewer />} />
            <Route path="/folders/:folderId" element={<MyDocuments />} />
            <Route
              path="/"
              element={
                <>
                  <MyNotes />
                  <MyFolders />
                </>
              }
            />
          </Routes>
        </div>
      )}
      {isLoading && <div>Loading user data...</div>}
    </div>
  );
};

export default App;
