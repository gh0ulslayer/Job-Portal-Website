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

class Appjob extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            jobs: []
        };
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

            render() {
                return (
                    <div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Job</th>
                                    <th>Positions remaining</th>

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