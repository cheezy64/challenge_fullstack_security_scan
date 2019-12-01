import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import NavBar from './nav/NavBar';
import ScanResultsListContainer from './scan/containers/ResultsListContainer';
import ScanResultFormContainer from './scan/containers/ResultFormContainer';
import ScanResultDetailsContainer from './scan/containers/ResultDetailsContainer';

function App() {
  return (
    <Router>
      <div className='App'>
        <h1>Scan Results</h1>
        <NavBar />
        <div className='content'>
          <Switch>
            <Route exact path='/' component={ScanResultsListContainer} />
            <Route path='/add' component={ScanResultFormContainer} />
            <Route path='/view/:id' component={ScanResultDetailsContainer} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
