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

class Appjob extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            jobs: []
        };
        this.sortbysalary = this.sortbysalary.bind(this);
        this.sortbyduration = this.sortbyduration.bind(this);
        this.sortbyrating = this.sortbyrating.bind(this);
        this.dsortbyrating = this.dsortbyrating.bind(this);
        this.dsortbyduration = this.dsortbyduration.bind(this);
        this.dsortbysalary = this.dsortbysalary.bind(this);
        this.filterbysalary = this.filterbysalary.bind(this);
    }
   
    async componentWillMount(){
        let curr = localStorage.getItem('userid');

        let arr = await axios.get('http://localhost:5000/job')
             .then(response => {
                return response.data;
            })
             .catch(function(error) {
                 console.log(error);
             });
        
        
        this.setState({
                jobs: arr
        });
        
    }
    
    sortbysalary = () => {
        let thiss  = this.state.jobs;
        thiss.sort((a,b) => (a.salary > b.salary) ? 1 : -1);
        this.setState({
            jobs: thiss
    });
    }
    
    sortbyduration = () => {
        let thiss  = this.state.jobs;
        thiss.sort((a,b) => (a.duration > b.duration) ? 1 : -1);
        this.setState({
            jobs: thiss
    });
    }
    
    sortbyrating = () => {
        let thiss  = this.state.jobs;
        thiss.sort((a,b) => (a.rating > b.rating) ? 1 : -1);
        this.setState({
            jobs: thiss
    });
    }
    dsortbyduration = () => {
        let thiss  = this.state.jobs;
        thiss.sort((a,b) => (a.duration < b.duration) ? 1 : -1);
        this.setState({
            jobs: thiss
    });
    }
    dsortbyrating = () => {
        let thiss  = this.state.jobs;
        thiss.sort((a,b) => (a.rating < b.rating) ? 1 : -1);
        this.setState({
            jobs: thiss
    });
    }  
    dsortbysalary = () => {
        let thiss  = this.state.jobs;
        thiss.sort((a,b) => (a.salary < b.salary) ? 1 : -1);
        this.setState({
            jobs: thiss
    });
    }
    filterbysalary = (a,b) => {
        let thiss  = this.state.jobs;
        let neww =  thiss.filter( items => items.salary < 1000 & items.salary > 20)
        this.setState({
            jobs: neww
    });
    }
            render() {
                const curr = localStorage.getItem('userid');
                return (
                    <div>
                        <Button  onClick={this.sortbysalary} >Sort By Salary</Button>
                        <Button  onClick={this.dsortbysalary} >Sort By Salary(Descending)</Button>
                        <Button  onClick={this.sortbyduration} >Sort By Duration</Button>
                        <Button  onClick={this.dsortbyduration} >Sort By Duration(Descending)</Button>
                        <Button  onClick={this.sortbyrating} >Sort By Rating</Button>
                        <Button  onClick={this.dsortbyrating} >Sort By Rating(Descending)</Button>
                        
                    
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Job</th>
                                    <th>Positions remaining</th>
                                    <th>Salary per month</th>

                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            { 
                                this.state.jobs.map((job, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{job.title}</td>
                                            <td>{job.maxpos}</td>
                                            <td>{job.salary}</td>

                                            <th>
                                              <Link to={{ pathname: './sop' ,state : {'jobid': job._id , 'app': curr , 'rec': job.rec }}}>Apply</Link></th>                               

                                            
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

export default Appjob;