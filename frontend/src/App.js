import React , { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


import AppNavbar from './components/Appnavbar';
import ApplicantNavbar from './components/ApplicantNavbar';
import RecruiterNavbar from './components/RecruiterNavbar';
import RecAddjob from './components/Rec-addjob';
import RecMyjob from './components/Rec-myjob';
import RecReqjob from './components/Rec-jobreq';
import RecProfile from './components/Rec-profile';
import Appjob from './components/Appjob';
import EditRec from './components/Profilerecedit';
import EditApp from './components/Profileappedit';
import AppProfile from './components/App-profile';

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
           <Route path="/Rec-addjob" component={RecAddjob}/>
           <Route path="/Rec-myjob" component={RecMyjob}/>
           <Route path="/Rec-jobreq" component={RecReqjob}/>
           <Route path="/Rec-profile" component={RecProfile}/>
           <Route path="/App-jobs" component={Appjob}/>
           <Route path="/recprofileedit" component={EditRec}/>
           <Route path="/appprofileedit" component={EditApp}/>
           <Route path="/App-profile" component={AppProfile}/>
          
    
          </Router>
        
        </div>
      );
  }
}

export default App;
