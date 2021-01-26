import React, {Component} from 'react';
import axios from 'axios';


export default class EditApp extends Component {
    
    constructor(props) {

        super(props);

        this.state = {
            name: this.props.location.state.name,
            id: this.props.location.state.id,
            email: this.props.location.state.email,
            education: this.props.location.state.education,
            insti: '',
            syear: '',
            eyear: '',
        }
        this.onChangename = this.onChangename.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangeinsti = this.onChangeinsti.bind(this);
        this.onChangesyear = this.onChangesyear.bind(this);
        this.onChangeeyear = this.onChangeeyear.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitEducation = this.onSubmitEducation.bind(this);
    }
    
    onChangename(event) {
        this.setState({ name: event.target.value });
    }
    onChangeemail(event) {
        this.setState({ email: event.target.value });
    }
    onChangeinsti(event) {
        this.setState({ insti: event.target.value });
    }
    onChangesyear(event) {
        this.setState({ syear: event.target.value });
    }
    onChangeeyear(event) {
        this.setState({ eyear: event.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        let edit = {
            id: this.state.id,
            name: this.state.name,
            email: this.state.email,
            education: this.state.education,
        }
        console.log(edit);
        axios.post('http://localhost:5000/profileapp/edit', edit)
            .then(response => {
                console.log(response.data.message);
                this.props.history.push("/App-profile");
                window.location.reload();
            })
            .catch(err => {
                    alert(err);
            });
    }
    onSubmitEducation(e){
        e.preventDefault();
        const edit = {
            insti: this.state.insti,
            syear: this.state.syear,
            eyear: this.state.eyear
        }

        if(this.state.insti === '' || this.state.syear === '' ){
            alert("Please provide all fields.")
        }
        else{
            let neww = this.state.education;
            neww.push(edit);
            this.setState({
            education: neww,
            insti: '',
            syear: '',
            eyear: ''
        });
        }
        
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
                    </div>
                    <div>
                         <h3> Add Education </h3>
                        <label>Institution: </label>
                            <input type="text" 
                               className="form-control" 
                               value={this.state.insti}
                               onChange={this.onChangeinsti}
                            />  
                            <label>Start Year: </label>
                            <input type="text" 
                            className="form-control" 
                            value={this.state.syear}
                            onChange={this.onChangesyear}
                            />
                            <label>End Year: </label>
                            <input type="text" 
                               className="form-control" 
                               value={this.state.eyear}
                               onChange={this.onChangeeyear}
                            />
                    </div>
                    <div className="form-group">
                                <input type="submit" value="ADD" className="btn btn-primary" onClick={this.onSubmitEducation}/>
                            </div>
                    <div className="form-group">
                        <input type="submit" value="Update" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
            
        )
    }
}