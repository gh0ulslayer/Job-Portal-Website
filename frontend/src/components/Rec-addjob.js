import React, {Component} from 'react';
import axios from 'axios';
export default class CreateUser extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            salary:'',
            maxpos:'',
            type: "F"
        }
        this.onChangetitle = this.onChangetitle.bind(this);
        this.onChangesalary = this.onChangesalary.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangemaxpos = this.onChangemaxpos.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangetitle(event) {
        this.setState({ title: event.target.value });
    }


    onChangeType(event) {
        this.setState({ type: event.target.value });
    }



    // onChangerec(event) {
    //     this.setState({ rec: event.target.value });
    // }

    onChangesalary(event) {
        this.setState({ salary: event.target.value });
    }

    onChangemaxpos(event) {
        this.setState({  maxpos: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        var curr = localStorage.getItem('userid');
        
        const newJob = {
            title: this.state.title,
            type: this.state.type,
            salary: this.state.salary,
            maxpos: this.state.maxpos,
            rec: curr
        }
        console.log(newJob);
        axios.post('http://localhost:5000/job', newJob)
             .then(res => 
            {
                let varrr = "Job  "+ newJob.title +" added successfully !";
                alert(varrr);
                console.log(res.data)
            })
             .catch(err => {
                if(err.response.data.title)
                    alert(err.response.data.title);
                console.log(err)});

        this.setState({
            name: '',
            salary : '',
            maxpos : '',
            type: 'F'
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Job Title: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.title}
                               onChange={this.onChangetitle}
                               />
                    </div>
                    
                    <div className="form-group">
                        <label>Salary: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.salary}
                               onChange={this.onChangesalary}
                               />
                    </div>
                
                    
                   
                    <div className="form-group">
                        <label>Max Positions: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.maxpos}
                               onChange={this.onChangemaxpos}
                               />  
                    </div>     
                   

                    <div className="form-group">
                        <label>Type: </label>
                        <select className="form-control"  value={this.state.type} onChange={this.onChangeType}> 
                            <option name="F" value="F">Full Time</option>
                            <option name="P" value="P">Part Time</option>
                            <option name="W" value="W">Work From Home</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Add Job" className="btn btn-primary"/>

                    </div>
                </form>
            </div>
        )
    }
}