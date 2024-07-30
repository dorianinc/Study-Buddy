import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import DocumentUpload from "./components/DocumentUpload/DocumentUpload";
import Navigation from "./components/Navigation/Navigation";
import { useRestoreUserQuery } from "./store/features/api";
import Documents from "./components/Documents/Documents";

function App() {
  const user = useSelector(state => state.session.user);
  const { isLoading } = useRestoreUserQuery();

  return (
    <div className="app-container">
      <Navigation />
      {user && (
      <div className="content-container">

        <Switch>
        <Route path="/:folderId/">
            <Documents />
          </Route>
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
