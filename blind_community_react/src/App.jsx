import React from 'react'
import './App.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Main from './containers/Main'
import Test from './containers/Test'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/test' component ={Test}/>
        <Route exact path='/' component = {Main}/>
      </Switch>
    </Router>
  );
}

export default App;
