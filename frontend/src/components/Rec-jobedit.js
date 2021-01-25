import React, {Component} from 'react';
import axios from 'axios';


export default class EditJob extends Component {
    
    constructor(props) {

        super(props);

        this.state = {
            id: this.props.location.state.id,
            maxpos: this.props.location.state.maxpos,
            maxapp: this.props.location.state.maxapp,
            deadline: this.props.location.state.deadline
        }
        this.onChangemaxpos = this.onChangemaxpos.bind(this);
        this.onChangemaxapp = this.onChangemaxapp.bind(this);
        this.onChangedeadline = this.onChangedeadline.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangemaxpos(event) {
        this.setState({ maxpos: event.target.value });
    }

    onChangemaxapp(event) {
        this.setState({ maxapp: event.target.value });
    }

    onChangedeadline(event) {
        this.setState({ deadline: event.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        let edit = {
            id: this.state.id,
            maxapp: this.state.maxapp,
            maxpos: this.state.maxpos,
            deadline: this.state.deadline
        }
        console.log(edit);
        axios.post('http://localhost:5000/job/edit', edit)
            .then(response => {
                console.log(response.data.message);
                this.props.history.push("/Rec-myjob");
                window.location.reload();
            })
            .catch(err => {
                    alert(err);
            });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Max Positions: </label>
                        <input type="string"
                               className="form-control" 
                               value={this.state.maxpos}
                               onChange={this.onChangemaxpos}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Max Applicants: </label>
                        <input type="string"
                               className="form-control" 
                               value={this.state.maxapp}
                               onChange={this.onChangemaxapp}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Deadline of Application: </label>
                        <input type="date" 
                               className="form-control" 
                               value={this.state.deadline}
                               onChange={this.onChangedeadline}
                               />  
                    </div>     
 
                    <div className="form-group">
                        <input type="submit" value="Update" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}