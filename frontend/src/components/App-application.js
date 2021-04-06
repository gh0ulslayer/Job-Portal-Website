import React, {Component} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';

class Appapplication extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            applications: []

        };

    }
    async componentWillMount(){
        let curr = localStorage.getItem('userid');
        
        let arr = await axios.post('http://localhost:5000/apply/app',{id:curr})
             .then(response => {
                 console.log(response.data);
                return response.data;
            })
             .catch(function(error) {
                 console.log(error);
             });
        
        
        this.setState({
                applications: arr
        });
        const data = await Promise.all( arr.map(async function(job, i){
            let alldata = {};
            alldata = {...job};
            
            let arrr = await axios.post('http://localhost:5000/user/getname', { id: job.rec})
            .then(response => {
                return response.data;
           });
           alldata.recname = arrr.name;
            return alldata;
         
        }));
        this.setState({
            applications: data
    });
    const dataa = await Promise.all( data.map(async function(job, i){
        let alldataa = {};
        alldataa = {...job};
        
        let arrrr = await axios.post('http://localhost:5000/job/app', { id: job.jobid})
        .then(response => {
            return response.data;
       });
       alldataa.title = arrrr[0].title;
       alldataa.rating = arrrr[0].rating;
       alldataa.salary = arrrr[0].salary;
       alldataa.duration = arrrr[0].duration;
       alldataa.deadline = arrrr[0].deadline;

       return alldataa;
     
    }));
    this.setState({
        applications: dataa
});
    //    console.log(data);
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
                                    <th>Date of Joining</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            { 
                                this.state.applications.map((application, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{application.title}</td>
                                            <td>{application.recname}</td>
                                            <td>{application.rating}</td>
                                            <td>{application.salary}</td>
                                            <td>{application.duration}</td>
                                            <td>{application.doj}</td>
                                            <td>{application.type}</td>
                                            <th>
                                        {application.type === 'Accepted' ? <Link to={{ pathname: './ratejob', state: { 'id': application._id , 'rating': application.rating } }}>Rate</Link> :  <Button  style = {{color:'red'}}  color="primary" disabled>can't rate</Button>}</th>    

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