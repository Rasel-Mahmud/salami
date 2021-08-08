import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MainPage from "./components/MainPage";
import { MainTitle } from "./components/Title";
import { UserProvider } from "./components/UserContext";

function App() {
  return (
    <div className="container-width">
      <UserProvider>
        <MainTitle />
        <Router>
          <Switch>
            <Route exact path="/">
              <MainPage />
            </Route>
          </Switch>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
