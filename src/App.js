import React from 'react';
import HomePage from "./components/HomePage/HomePage";
import Signup from "./components/SignupPage/Signup";
import Login from "./components/LoginPage/LoginPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <Route path='/profile' component={ProfilePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
