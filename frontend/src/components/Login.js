import React, {Component} from 'react';
import axios from 'axios';
export default class CreateUser extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            password:'',
            type: 'A'
        }
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangename = this.onChangename.bind(this);
        this.onChangetype = this.onChangetype.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangename(event) {
        this.setState({ name: event.target.value });
    }


    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }



    onChangetype(event) {
        this.setState({ type: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            password:  this.state.password,
            type: this.state.type
        }
        //console.log(newUser);
        axios.post('http://localhost:5000/user/login', newUser)
             .then(res => 
            {
                if (res.data.length === 0)
                    alert('User Not Found')
                else {
                    alert("Login Successfull");
                    console.log(res.data[0].type)
                    if (res.data[0].type === "A") {
                        console.log(this.state);
                        this.props.history.push({
                            pathname: '/applicant/:name',
                            name: res.data[0].name
                        })
                    }
                    else {
                        this.props.history.push({
                            pathname: '/recruiter/:name',
                            name: res.data[0].name
                        })
                    }
                }
                //console.log(res.data.name);
                
            })
           

        this.setState({
            name: '',
            password: '',
            type: 'A'
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangename}
                               />
                    </div>
                  
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />  
                    </div>     
                   
                    <div className="form-group">
                        <label>Type: </label>
                        <select className="form-control" value={this.state.type} onChange={this.onChangetype}>
                            <option value="A">Applicant</option>
                            <option value="R">Recruiter</option>
                        </select>
                    </div>
                   
                 
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}