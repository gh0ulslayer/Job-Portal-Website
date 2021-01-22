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

class Appapplication extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            applications: []

        };

    }

    componentWillMount(){
        let curr = localStorage.getItem('userid');
        
        
    }
    
            render() {
                const curr = localStorage.getItem('userid');
                return (
                    <div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Job Title</th>
                                    <th>Recruiter</th>
                                    <th>Job Rating</th>
                                    <th>Salary per month</th>
                                    <th>Job Duration</th>
                                    <th>Deadline</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            { 
                                this.state.applications.map((application, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{application.title}</td>
                                            <td>{application.rec}</td>
                                            <td>{application.rating}</td>
                                            <td>{application.salary}</td>
                                            <td>{application.duration}</td>
                                            <td>{application.deadline}</td>
                                            
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

export default Appapplication;