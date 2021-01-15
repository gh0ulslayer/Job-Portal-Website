import React , { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


import AppNavbar from './components/Appnavbar';
import ApplicantNavbar from './components/ApplicantNavbar';
import RecruiterNavbar from './components/RecruiterNavbar';

import JobList from './components/Joblist';
import Register from './components/Register';
import Login from './components/Login';


class App extends React.Component {
  render() {
    let type = localStorage.getItem('type');  

    let navbar = null;
    
    if(type === 'A')
      navbar = <ApplicantNavbar />;
    else if(type === 'R')
      navbar = <RecruiterNavbar />;
    else
      navbar = <AppNavbar />;

      return (
        <div className="App">
          
          {navbar}
          <Router>
           <Route path="/register" component={Register}/>
           <Route path="/login" component={Login}/>
    
          </Router>
        
        </div>
      );
  }
}

export default App;
