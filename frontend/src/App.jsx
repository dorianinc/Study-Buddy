import { useRestoreUserQuery } from "./store/features/api";
import MyFolders from "./components/Folder/MyFolders";
import MyDocuments from "./components/Document/MyDocuments";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import DisplayDoc from "./components/displayDoc/DisplayDoc";

const App = () => {
  const { data: user, isLoading } = useRestoreUserQuery();

  return (
    <div className="app-container">
      <Navigation />
      {user && (
        <div className="content-container">
          <Routes>
            <Route
              path="/folders/:folderId/:documentId"
              element={<DisplayDoc />}
            />
            <Route path="/folders/:folderId" element={<MyDocuments />} />
            <Route path="/" element={<MyFolders />} />
          </Routes>
        </div>
      )}
      {isLoading && <div>Loading user data...</div>}
    </div>
  );
};

export default App;
