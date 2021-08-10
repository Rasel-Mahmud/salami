import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MainPage from "./components/MainPage";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";
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
            <Route path="/registration">
              <Registration />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
