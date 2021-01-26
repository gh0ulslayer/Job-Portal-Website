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
        console.log('1000');
        let curr = {
            jobid: this.state.jobid,
            idx:0
        }
        var idd = this.state.jobid;
        axios.post('http://localhost:5000/job/getapp',{id:this.state.jobid})
        .then(response => {
          console.log(response.data);
           curr = response.data.maxapp;
           console.log(curr);
           let edit = {
               id: idd,
               maxapp : curr,
               ind: 0
           }
           console.log(10);
           axios.post('http://localhost:5000/job/editapp', edit)
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
                        <input type="submit" value="Submit" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}