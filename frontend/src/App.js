import React , { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


import AppNavbar from './components/Appnavbar';
import JobList from './components/Joblist';
import Register from './components/Register';
import Login from './components/Login';


function App() {
  return (
    <div className="App">
      <AppNavbar />
      <Router>
       <Route path="/register" component={Register}/>
       <Route path="/login" component={Login}/>

      </Router>
    
    </div>
  );
}

export default App;
