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
import EditJob from './components/Rec-jobedit';
import AppProfile from './components/App-profile';
import Appapplication from './components/App-application';
import Addsop from './components/Appsop';
import Shortlist from './components/Shortlist';
import RateApp from './components/rateapp';
import RateJob from './components/ratejob';

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
           <Route path="/jobedit" component={EditJob}/>
           <Route path="/App-profile" component={AppProfile}/>
           <Route path="/App-application" component={Appapplication}/>
           <Route path="/sop" component={Addsop}/>
           <Route path="/shortlist" component={Shortlist}/>
           <Route path="/rateapp" component={RateApp}/>
           <Route path="/ratejob" component={RateJob}/>
          
    
          </Router>
        
        </div>
      );
  }
}

export default App;
