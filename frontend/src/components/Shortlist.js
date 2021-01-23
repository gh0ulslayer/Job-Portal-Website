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
            applications: []
        };
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
           console.log(arrr.name);
           alldata.recname = arrr.name;
            return alldata;
         
        }));
        this.setState({
            applications: data
    });
    let neww = await data.filter( items => items.rec === curr );
        console.log(neww);
        this.setState({
                applications: neww
        });

    }

            render() {
                return (
                    <div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>SOP</th>

                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            { 
                                this.state.applications.map((job, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{job.recname}</td>
                                            <td>{job.review}</td>
                                            <th>
                                        <Link to={{ pathname: './jobedit', state: { 'id': job._id, 'maxpos':job.maxpos, 'maxapp':job.maxapp} }}>Shortlist</Link></th>    
                                       <th>

                                        <Link to={{ pathname: './recprofileedit', state: { 'id': job._id, 'name':job.title} }}>Reject</Link></th>    
                                           
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