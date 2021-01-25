import React, {Component} from 'react';
import axios from 'axios';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { Link } from 'react-router-dom';

class RecMyjob extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            applications: [],
            varr: false
        };
        this.changestate = this.changestate.bind(this);
    }

    async componentWillMount(){
        let curr = localStorage.getItem('userid');

        let arr = await axios.get('http://localhost:5000/apply')
             .then(response => {
                return response.data;
            })
             .catch(function(error) {
                 console.log(error);
             });

        
        const data = await Promise.all( arr.map(async function(job, i){
            let alldata = {};
            alldata = {...job};
            
            let arrr = await axios.post('http://localhost:5000/user/getname', { id: job.app})
            .then(response => {
                return response.data;
           });
         //  console.log(arrr.name);
           alldata.recname = arrr.name;
           alldata.varr = 1;
            return alldata;
         
        }));
        this.setState({
            applications: data
    });
    let neww = await data.filter( items => items.rec === curr );
      //  console.log(neww);
        this.setState({
                applications: neww
        });

    }
    changestate(idd,state,event){
        event.preventDefault();
        const edit = {
            id: idd,
            state: state
        }
        console.log(edit);
        axios.post('http://localhost:5000/apply/state', edit)
                    .then(res => {
                        console.log(res.data);

                    })
                    .catch(err => {
                            alert(err);
                    });
        window.location.reload();
    }

            render() {
                return (
                    <div>
                       
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>SOP</th>
                                    <th>Education</th>
                                    <th>Rating</th>
                                    <th>Stage</th>
                                    <th>Date of Application</th>

                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            { 
                                this.state.applications.map((job, i) => {
                                    let varr = false;
                                    return (
                                        
                                        <tr key={i}>
                                            <td>{job.recname}</td>
                                            <td>{job.review}</td>
                                            <td>{job.education}</td>
                                            <td>{job.rating}</td>
                                            <td>{job.type}</td>
                                            <td>{job.date}</td>
                                            <th> {job.type === "Applied" ?  <Button style = {{backgroundColor:'green'}} variant="contained" onClick={(event)=>{this.changestate(job._id,job.type,event)}}>Shortlist</Button> : (  job.type === "Shortlisted" ?  <Button style = {{backgroundColor:'green'}} variant="contained" onClick={(event)=>{this.changestate(job._id,job.type,event)}}>Accept</Button> : <Button style = {{backgroundColor:'red'}} variant="contained" onClick={()=>{}}>Khtm tata bye</Button> )} </th>
                                            <th>
                                    { job.type === "Accepted" ?   <Button  style = {{color:'red'}}  color="primary" disabled>Full</Button> : <Button style = {{backgroundColor:'red'}} variant="contained" onClick={(event)=>{this.changestate(job._id,"Rejected",event)}}>Reject</Button> } </th>
                                             
                                        </tr>
                                        
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                )
            }
}

export default RecMyjob;