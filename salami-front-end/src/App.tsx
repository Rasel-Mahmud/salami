import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Earn from "./components/Earn/Earn";
import Spend from "./components/Spend/Spend";
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
              <Earn />
              <Spend />
            </Route>
          </Switch>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
