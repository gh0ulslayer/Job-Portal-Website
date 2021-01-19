import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default class RecruiterProfile extends Component {
    
    constructor(props) {
        super(props);
        this.state = {profile: []};
        
    }


    async componentWillMount(){
        let curr = JSON.parse(localStorage.getItem('info'));

        let arr = await axios.get('http://localhost:5000/profilerec')
             .then(response => {
                return response.data;
            })
             .catch(function(error) {
                 console.log(error);
             });
             console.log(arr);
        
        
             let neww = await arr.filter( items => items.rec === curr._id );
        console.log(curr._id);

        this.setState({
                profile: neww
        });

    }

    render() {
        let user = localStorage.getItem('name');
        return (
            <div>
                <h2>{user}'s Profile:</h2>
                <br></br>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact Number</th>
                            <th>Bio</th>
                            <th></th>
                            
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.profile.map((Profilerec, i) => {
                            
                            return (
                                <tr key={i}>
                                    <td>{Profilerec.name}</td>
                                    <td>{Profilerec.email} </td>
                                    <td>{Profilerec.contact} </td>
                                    <td>{Profilerec.bio} </td>

                                    <th>
                                        <Link to={{ pathname: './recprofileedit', state: { 'id': Profilerec._id, 'name':Profilerec.name,'email':Profilerec.email,'contact':Profilerec.contact,'bio':Profilerec.bio} }}>Edit</Link></th>
                                </tr>
                            )

                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}