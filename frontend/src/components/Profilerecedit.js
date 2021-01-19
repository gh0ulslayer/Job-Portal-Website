import React, {Component} from 'react';
import axios from 'axios';


export default class EditRec extends Component {
    
    constructor(props) {

        super(props);

        this.state = {
            name: this.props.location.state.name,
            id: this.props.location.state.id,
            email: this.props.location.state.email,
            bio: this.props.location.state.bio,
            contact:this.props.location.state.contact
        }
        this.onChangename = this.onChangename.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangebio = this.onChangebio.bind(this);
        this.onChangecontact = this.onChangecontact.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangename(event) {
        this.setState({ name: event.target.value });
    }
    onChangeemail(event) {
        this.setState({ email: event.target.value });
    }
    onChangebio(event) {
        this.setState({ bio: event.target.value });
    }
    onChangecontact(event) {
        this.setState({ contact: event.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        let edit = {
            id: this.state.id,
            name: this.state.name,
            email: this.state.email,
            contact: this.state.contact,
            bio: this.state.bio,
        }
        console.log(edit);
        axios.post('http://localhost:5000/profilerec/edit', edit)
            .then(response => {
                console.log(response.data.message);
                this.props.history.push("/Rec-profile");
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
                        <label>Name: </label>
                        <input type="string"
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangename}
                               />  
                         <label>Email-ID: </label>
                        <input type="string" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeemail}
                               /> 
                         <label>Contact: </label>
                        <input type="string"
                               className="form-control" 
                               value={this.state.contact}
                               onChange={this.onChangecontact}
                               /> 
                         <label>Bio: </label>
                        <input type="string"
                               className="form-control" 
                               value={this.state.bio}
                               onChange={this.onChangebio}
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