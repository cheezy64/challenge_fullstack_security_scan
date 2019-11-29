import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import NavBar from './navbar/NavBar';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Scan Results</h1>
        <NavBar />
        <div className="content">
          <Switch>
            <Route exact path="/" component={() => <p>Display</p>} />
            <Route path="/add" component={() => <p>Add</p>} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
