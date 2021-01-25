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
            jobs: [],
            search: '',
            minsalary: '',
            maxsalary: '',
            duration: 0,
            j_type: 'F'

        };
        this.onChangesearch = this.onChangesearch.bind(this);
        this.sortbysalary = this.sortbysalary.bind(this);
        this.sortbyduration = this.sortbyduration.bind(this);
        this.sortbyrating = this.sortbyrating.bind(this);
        this.dsortbyrating = this.dsortbyrating.bind(this);
        this.dsortbyduration = this.dsortbyduration.bind(this);
        this.dsortbysalary = this.dsortbysalary.bind(this);
        this.onChangeminsalary = this.onChangeminsalary.bind(this);
        this.onChangemaxsalary = this.onChangemaxsalary.bind(this);
        this.onChangeduration = this.onChangeduration.bind(this);
        this.onChangej_type = this.onChangej_type.bind(this);
        this.filterbysalary = this.filterbysalary.bind(this);
        this.filterbyduration = this.filterbyduration.bind(this);
        this.filterbyj_type = this.filterbyj_type.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.subcount= this.subcount.bind(this);

    }
    onChangesearch(event) {
        this.setState({ search: event.target.value });
    }
    onChangemaxsalary(event) {
        this.setState({ maxsalary: event.target.value });
    }
    onChangeminsalary(event) {
        this.setState({ minsalary: event.target.value });
    }
    onChangemaxsalary(event) {
        this.setState({ maxsalary: event.target.value });
    }
    onChangeduration(event) {
        this.setState({ duration: event.target.value });
    }
    onChangej_type(event) {
        this.setState({ j_type: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const Search = {
            title: this.state.search,
        }

        console.log(Search);
        axios.post('http://localhost:5000/job/search', Search)
             .then(res => {
          //      console.log(res.data);
                this.setState({jobs: res.data});

            })
             .catch(err =>
                {
                    if(err.response.data.message)
                    alert(err.response.data.message);
                    console.log(err)
                });

        this.setState({
            search : '',
        });
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
                jobs: arr,
                minsalary: this.state.minsalary,
                maxsalary: this.state.maxsalary
        });
        const data = await Promise.all( arr.map(async function(job, i){
            let alldata = {};
            alldata = {...job};
            
            let arrr = await axios.post('http://localhost:5000/user/getname', { id: job.rec})
            .then(response => {
                return response.data;
           });
         //  console.log(arrr.name);
           alldata.recname = arrr.name;
           const idd = localStorage.getItem('userid');
           let lol = 0;
           let arrrr = await axios.post('http://localhost:5000/profileapp/getrem',{id:idd})
            .then(response => {
                return response.data;
           });
           alldata.rem = arrrr[0].rem;
            //    console.log(alldata);
           return alldata;
        
        }));
        this.setState({
            jobs: data,
            minsalary: this.state.minsalary,
            maxsalary: this.state.maxsalary
    });
    //    console.log(data);
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
    filterbysalary = () => {
        let thiss  = this.state.jobs;
        let neww =  thiss.filter( items => items.salary < this.state.maxsalary & items.salary > this.state.minsalary)
        this.setState({
            jobs: neww,
            minsalary: '',
            maxsalary: ''
    });
    }
    filterbyduration = () => {
        let thiss  = this.state.jobs;
        let neww =  thiss.filter( items => items.duration === this.state.duration )
        this.setState({
            jobs: neww,
    });
    }
    filterbyj_type = () => {
        let thiss  = this.state.jobs;
        let neww =  thiss.filter( items => items.type === this.state.j_type )
        this.setState({
            jobs: neww,
    });
    }
    subcount() {
        const idd = localStorage.getItem('userid');
        let curr = 0;
        axios.post('http://localhost:5000/profileapp/getrem',{id:idd})
             .then(response => {
             //  console.log(response.data[0]);
                curr = response.data[0].rem;
                let edit = {
                    id: idd,
                    rem: response.data[0].rem,
                    ind: 2
                }
                console.log(10);
                axios.post('http://localhost:5000/profileapp/rem', edit)
                    .then(res => {
                      //  console.log(res.data);
                    })
                    .catch(err => {
                            alert(err);
                    });

            })
             .catch(function(error) {
                 console.log(error);
             });

        
    }
   
            render() {
                const curr = localStorage.getItem('userid');
              //  console.log(this.state.jobs);
                return (
                    <div>
                        <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                        <label>Job Title: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.search}
                               onChange={this.onChangesearch}
                               />  
                         </div>

                        <div className="form-group">
                        <input type="submit" value="Search" className="btn btn-primary" size="2"/>
                        </div>
                         </form>
                        <Button  onClick={this.sortbysalary} >Sort By Salary</Button>
                        <Button  onClick={this.dsortbysalary} >Sort By Salary(Descending)</Button>
                        <Button  onClick={this.sortbyduration} >Sort By Duration</Button>
                        <Button  onClick={this.dsortbyduration} >Sort By Duration(Descending)</Button>
                        <Button  onClick={this.sortbyrating} >Sort By Rating</Button>
                        <Button  onClick={this.dsortbyrating} >Sort By Rating(Descending)</Button>
                        <br></br>
                        <label>Min Salary: </label>
                        <input type="number" 
                               value={this.state.minsalary}
                               onChange={this.onChangeminsalary}
                               />  
                        
                        <label> Max Salary: </label>
                        <input type="number" 
                               value={this.state.maxsalary}
                               onChange={this.onChangemaxsalary}
                               />  
                        <Button  onClick={this.filterbysalary} >Filter by salary</Button>
                        <br></br>
                        <label> Duration: </label>
                        <input type="number" 
                               value={this.state.duration}
                               onChange={this.onChangeduration}
                               />
                        <Button  onClick={this.filterbyduration} >Filter by Duration</Button>
                        <br></br>
                        <label> Type: </label>
                        <input type="text" 
                               value={this.state.j_type}
                               onChange={this.onChangej_type}
                               />
                        <Button  onClick={this.filterbyj_type} >Filter by Type</Button>

                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Job Title</th>
                                    <th>Recruiter</th>
                                    <th>Job Rating</th>
                                    <th>Salary per month</th>
                                    <th>Job Duration</th>
                                    <th>Job Type</th>
                                    <th>Deadline</th>
                                    <th>remaining applications</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            { 
                               this.state.jobs.map((job,i)=> {
                                   return(
                                    
                                <tr key={i}>
                                <td>{job.title}</td>
                                <td>{job.recname}</td>
                                <td>{job.rating}</td>
                                <td>{job.salary}</td>
                                <td>{job.duration}</td>
                                <td>{job.type}</td>
                                <td>{job.deadline}</td>
                                <th>
                                            { job.rem > 0    ?    <Link to={{ pathname: './sop', state: { 'jobid': job._id , 'app': curr , 'rec': job.rec} }} onClick={() => this.subcount()}> <Button style = {{backgroundColor:'green'}} variant="contained" onClick={()=>{}}>Apply</Button></Link> : <Button  style = {{color:'red'}}  color="primary" disabled>Full</Button> }</th>
                                <td> 
                               
                                </td>
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