import React ,{useState , useEffect }from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './components/Header'
import Login from './components/Login';
import Home from './components/Home';
import Register from "./components/Register";
import Dashboard from "./components/Dashboard"
function App() {
return(

  <div>
   
      <Router>
      <Route exact path="/" render={props=>(
        <React.Fragment>
        <Home />
        </React.Fragment>)} />
        <Route exact path="/login" render={props=>(
          <React.Fragment>
          <Login />
          </React.Fragment>)} />
          <Route exact path="/register" render={props=>(
            <React.Fragment>
            <Register />
            </React.Fragment>)} />
            <Route exact path="/dashboard" render={props=>(
              <React.Fragment>
              <Dashboard />
              </React.Fragment>)} />
      </Router>
  </div>
)
}

export default App;
