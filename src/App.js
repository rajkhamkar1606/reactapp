/*
Created by Oualid Faouzi

NOTE: Session storage is used to store sensitive information about the user.
Session storage was NOT designed to be used as a secured storage mechanism in a browser.
If an attacker runs Javascript, they can retrieve all the data stored in the sessionstorage
and send it off to their own domain. This issue can be solved by integrating a database to store the data.
*/

import React from 'react';

//Bootstrap dependencies are used to create responsive elements
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Overview from './JS/ScreenComponents/Overview';
import Refund from './JS/ScreenComponents/Refund';

function App() {
  //Sessionstorage cleared every time the browser gets refreshed and numOfInvoicesRegistered is initialized to 0.
  sessionStorage.clear();
  sessionStorage.setItem("numOfInvoicesRegistered", 0);
  console.log("Session memory cleared.")
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Overview</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/refund">Refund</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Switch>
          <Route path="/" exact component={Overview}>
            <Overview />
          </Route>
          <Route path="/refund" exact component={Refund}>
            <Refund />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;