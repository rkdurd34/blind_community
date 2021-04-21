import React from 'react'
import './App.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'


import Main from './containers/Main'
import Test from './containers/Test'
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';

import AuthRoute from './routes/auth';
function App() {
  
  return (
    <Router>
      <Switch>
        <Route path='/signin' exact component={SignIn} />
        <Route path='/signup' exact component={SignUp} />
        <Route exact path='/' component = {Main}/>
        
        <AuthRoute exact path='/test' component ={Test}/> 
      </Switch>
    </Router>
  );
}

export default App;
