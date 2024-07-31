import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Navigation from "./components/Navigation/Navigation";
import { useRestoreUserQuery } from "./store/features/api";
import MyFolders from "./components/Folder/MyFolders";
import MyDocuments from "./components/Document/MyDocuments";
// import Documents from "./components/Documents/Documents";

function App() {
  const user = useSelector((state) => state.session.user);
  const { isLoading } = useRestoreUserQuery();

  return (
    <div className="app-container">
      <Navigation />
      {user && (
        <div className="content-container">
          <Switch>
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
