import React, {Component} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';

class RecMyjob extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            applications: []
        };
        this.sortbyname = this.sortbyname.bind(this);
        this.sortbydname = this.sortbydname.bind(this);
        this.sortbydoj = this.sortbydoj.bind(this);
        this.sortbyddoj = this.sortbyddoj.bind(this);
        this.sortbytitle = this.sortbytitle.bind(this);
        this.sortbydtitle= this.sortbydtitle.bind(this);
        this.sortbyrating = this.sortbyrating.bind(this);
        this.sortbydrating = this.sortbydrating.bind(this);
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
           let arrrr = await axios.post('http://localhost:5000/job/getname', { id: job.jobid})
            .then(response => {
              //  console.log(response.data);
                return response.data;
           });
           alldata.jobname = arrrr.title;
           alldata.typee = arrrr.type;
           let arrrrr = await axios.post('http://localhost:5000/profileapp/getrating', { id: job.app})
            .then(response => {
                return response.data;
           }); 
           alldata.rating = arrrrr.rating;
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

        const currr = "Accepted";
        let newww = await neww.filter( items => items.type === currr );
        this.setState({
                applications: newww
        });
        
        
    }
    sortbyname = () => {
        let thiss  = this.state.applications;
        thiss.sort((a,b) => (a.recname > b.recname) ? 1 : -1);
        this.setState({
            applications: thiss
    });
    }
    sortbydname = () => {
        let thiss  = this.state.applications;
        thiss.sort((a,b) => (a.recname < b.recname) ? 1 : -1);
        this.setState({
            applications: thiss
    });
    }
    sortbytitle = () => {
        let thiss  = this.state.applications;
        console.log(thiss)
        thiss.sort((a,b) => (a.jobname > b.jobname) ? 1 : -1);
        this.setState({
            applications: thiss
    });
    }
    sortbydtitle = () => {
        let thiss  = this.state.applications;
        thiss.sort((a,b) => (a.jobname < b.jobname) ? 1 : -1);
        this.setState({
            applications: thiss
    });
    }
    sortbyrating = () => {
        let thiss  = this.state.applications;
        thiss.sort((a,b) => (a.rating > b.rating) ? 1 : -1);
        this.setState({
            applications: thiss
    });
    }
    sortbydrating = () => {
        let thiss  = this.state.applications;
        thiss.sort((a,b) => (a.rating < b.rating) ? 1 : -1);
        this.setState({
            applications: thiss
    });
    }
    sortbydoj = () => {
        let thiss  = this.state.applications;
        thiss.sort((a,b) => (a.doj > b.doj) ? 1 : -1);
        this.setState({
            applications: thiss
    });
    }
    sortbyddoj = () => {
        let thiss  = this.state.applications;
        thiss.sort((a,b) => (a.doj < b.doj) ? 1 : -1);
        this.setState({
            applications: thiss
    });
    }
            render() {
                return (
                    <div>
                        <form>
                        <Button style = {{backgroundColor:'purple'}} variant="contained"  onClick={this.sortbyname} >Sort By Name</Button>
                        <Button style = {{backgroundColor:'purple'}} variant="contained"  onClick={this.sortbydname} >Sort By Name(D)</Button>
                        </form>
                        <form>
                        <Button style = {{backgroundColor:'lime'}} variant="contained"  onClick={this.sortbytitle} >Sort By Title</Button>
                        <Button style = {{backgroundColor:'lime'}} variant="contained"  onClick={this.sortbydtitle} >Sort By Title(D)</Button>
                        </form>
                        <form>
                        <Button style = {{backgroundColor:'orange'}} variant="contained"  onClick={this.sortbyrating} >Sort By Rating</Button>
                        <Button style = {{backgroundColor:'orange'}} variant="contained"  onClick={this.sortbydrating} >Sort By Rating(D)</Button>
                        </form>
                        <form>
                        <Button style = {{backgroundColor:'yellow'}} variant="contained"  onClick={this.sortbydoj} >Sort By DOJ</Button>
                        <Button style = {{backgroundColor:'yellow'}} variant="contained"  onClick={this.sortbyddoj} >Sort By DOJ(D)</Button>
                        </form>
                       
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Job Title</th>
                                    <th>Job Type</th>
                                    <th>Rating</th>
                                    <th>Date of Joining</th>

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
                                            <td>{job.jobname}</td>
                                            <td>{job.typee}</td>
                                            <td>{job.rating}</td>
                                            <td>{job.doj}</td>

                                            <th>
                                        <Link to={{ pathname: './rateapp', state: { 'id': job._id , 'rating': job.rating } }}>Rate</Link></th>    

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