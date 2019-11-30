import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import NavBar from './navbar/NavBar';
import DisplayContainer from './scanresults/DisplayContainer';
import ScanResultViewContainer from './scanresults/ScanResultViewContainer';

function App() {
  return (
    <Router>
      <div className='App'>
        <h1>Scan Results</h1>
        <NavBar />
        <div className='content'>
          <Switch>
            <Route exact path='/' component={DisplayContainer} />
            <Route path="/add" component={() => <p>Add</p>} />
            <Route path='/view/:id' component={ScanResultViewContainer} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
