import React, {Component} from 'react';
import axios from 'axios';
export default class CreateUser extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            password:'',
            type: "A",
            email: ''
        }
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangename = this.onChangename.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangename(event) {
        this.setState({ name: event.target.value });
    }

    onChangeType(event) {
        this.setState({ type: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onChangeemail(event) {
        this.setState({ email: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            type: this.state.type,
            email: this.state.email,
            password:  this.state.password
        }
        //console.log(newUser);
        axios.post('http://localhost:5000/user', newUser)
             .then(res => 
            {
                let noice = "Happy to have you on board, "+ newUser.name +"!";
                alert(noice);
                console.log(res.data)
            })
             .catch(err => {
                if(err.response.data.name)
                    alert(err.response.data.name);
                console.log(err)});

        this.setState({
            name: ''
        });
    }

    render() {
        
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangename}
                               />
                    </div>
                    
                   
                   
                    <div className="form-group">
                        <input type="submit" value="Edit" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}