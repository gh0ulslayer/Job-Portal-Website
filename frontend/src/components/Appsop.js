import React, {Component} from 'react';
import axios from 'axios';


export default class EditJob extends Component {
    
    constructor(props) {

        super(props);

        this.state = {
            jobid: this.props.location.state.jobid,
            rec: this.props.location.state.rec,
            app: this.props.location.state.app,
            review: ''
        }
        this.onChangereview = this.onChangereview.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    

    onChangereview(event) {
        this.setState({ review: event.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        let edit = {
            jobid: this.state.jobid,
            rec: this.state.rec,
            app: this.state.app,
            review: this.state.review
        }
        console.log(edit);
        axios.post('http://localhost:5000/apply', edit)
            .then(response => {
                console.log(response.data.message);
                this.props.history.push("/App-jobs");
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
                        <label>SOP: </label>
                        <input type="string"
                               className="form-control" 
                               value={this.state.review}
                               onChange={this.onChangereview}
                               />  
                    </div>
                   
                    <div className="form-group">
                        <input type="submit" value="Submit" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}