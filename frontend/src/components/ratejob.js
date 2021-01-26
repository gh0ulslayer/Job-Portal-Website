import React, {Component} from 'react';
import axios from 'axios';


export default class RateJob extends Component {
    
    constructor(props) {

        super(props);

        this.state = {
            id: this.props.location.state.id,
            rating: this.props.location.state.rating
        }
        this.onChangerating = this.onChangerating.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangerating(event) {
        this.setState({ rating: event.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        let edit = {
            id: this.state.id,
            rating: this.state.rating,
            to_be: 1
        }
        let arr =  axios.post('http://localhost:5000/apply/getapplication',edit)
             .then(response => {
                 console.log(response.data);
                edit.id = response.data[0].jobid;
                console.log(edit);

                axios.post('http://localhost:5000/job/editrating', edit)
                .then(response => {
                console.log(response.data.message);
                this.props.history.push("/App-application");
                window.location.reload();
                })
                .catch(err => {
                    alert(err);
                 });
                return response.data;
            })
             .catch(function(error) {
                 console.log(error);
             });
        
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Rating: </label>
                        <input type="number"
                               className="form-control" 
                               value={this.state.rating}
                               onChange={this.onChangerating}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Rate" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}