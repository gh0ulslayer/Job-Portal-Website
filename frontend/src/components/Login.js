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
                //console.log(res.data.name);
                let lol = newUser.type;
                console.log(newUser);
                if(lol == 'A'){
                    console.log(10);
                }
                if(lol == 'R'){
                    console.log(20);
                }
                let noice = "Here you go, "+ newUser.name +"!";
                alert(noice);
                console.log(res.data)
            })
             .catch(err => {
                if(err.response.data.name)
                    alert(err.response.data.name);
                console.log(err)});

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