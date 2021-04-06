import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class RecMyjob extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            jobs: []
        };
    }

    async componentWillMount(){
        let curr = localStorage.getItem('userid');

        let arr = await axios.get('http://localhost:5000/job/all')
             .then(response => {
                return response.data;
            })
             .catch(function(error) {
                 console.log(error);
             });
        let arrr = await axios.post('http://localhost:5000/apply/rec',{id:curr})
             .then(response => {
                return response.data;
            })
             .catch(function(error) {
                 console.log(error);
             });

        let neww = await arr.filter( items => items.rec === curr );
        this.setState({
                jobs: neww
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
                                    <th>No of Applicants</th>
                                    <th>Date of Posting</th>

                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            { 
                                this.state.jobs.map((job, i) => {
                                    return (
                                        <tr key={i}>
                                            <th>
                                            <Link to={{ pathname: './shortlist', state: { 'id': job._id} }}>{job.title}</Link></th>
                                            <td>{job.maxpos}</td>
                                            <td>{job.maxapp}</td>
                                            <td>{job.date}</td>
                                            <th>
                                        <Link to={{ pathname: './jobedit', state: { 'id': job._id, 'maxpos':job.maxpos, 'maxapp':job.maxapp, 'deadline':job.deadline} }}>Edit</Link></th>    
                                       <th>
                                        <Link to={{ pathname: './delete', state: { 'id': job._id, 'name':job.title} }}>Delete</Link></th>    
                                           
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