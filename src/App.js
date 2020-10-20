/*
Created by Oualid Faouzi
*/

import React from 'react';
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