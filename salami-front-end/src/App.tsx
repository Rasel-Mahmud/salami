import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Earn from "./components/Earn";
import Title from "./components/Title";
import { UserProvider } from "./components/UserContext";

function App() {
  return (
    <div className="container-width">
      <UserProvider>
        <Title />
        <Router>
          <Switch>
            <Route exact path="/">
              <Earn />
            </Route>
          </Switch>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
