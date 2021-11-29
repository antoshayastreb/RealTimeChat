import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import Home from './components/Home/Home';
import Chat from './components/Chat/Chat';
import { AuthContext } from "./context/AuthContext";
import './App.css';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Chat /> : <Home />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
