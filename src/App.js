import React from 'react';
import './CSS/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Overview from './JS/ScreenComponents/Overview'
import Refund from './JS/ScreenComponents/Refund'

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Overview</Link>
            </li>
            <li>
              <Link to="/refund">Refund</Link>
            </li>
          </ul>
        </nav>

         {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/refund" component={Refund}>
            <Refund />
          </Route>
          <Route path="/" component={Overview}>
            <Overview />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;