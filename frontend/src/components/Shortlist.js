import React, {Component} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';


class RecMyjob extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            thisjob:this.props.location.state.id,
            applications: [],
            varr: false
        };
        this.changestate = this.changestate.bind(this);
        this.sortbyname = this.sortbyname.bind(this);
        this.sortbydname = this.sortbydname.bind(this);
        this.sortbytitle = this.sortbytitle.bind(this);
        this.sortbydtitle= this.sortbydtitle.bind(this);
        this.sortbyrating = this.sortbyrating.bind(this);
        this.sortbydrating = this.sortbydrating.bind(this);
    }

    changestate(idd,state,appid,event){
        event.preventDefault();
        if(state === 'Shortlisted')
        {
        
        axios.post('http://localhost:5000/apply/rejectall', {id:appid})
        .then(res => {
            console.log(res.data);

        })
        .catch(err => {
                alert(err);
        });
        }
        const edit = {
            id: idd,
            state: state
        }
      //  console.log(edit);
     //   console.log(1000000);
        axios.post('http://localhost:5000/apply/state', edit)
                    .then(res => {
                        console.log(res.data);

                    })
                    .catch(err => {
                            alert(err);
                    });
        window.location.reload();
    }
    async componentWillMount(){
        let curr = localStorage.getItem('userid');

        let arr = await axios.get('http://localhost:5000/apply')
             .then(response => {
            //     console.log(response.data);
                return response.data;
            })
             .catch(function(error) {
                 console.log(error);
             });

        
        const data = await Promise.all( arr.map(async function(job, i){
            let alldata = {};
            alldata = {...job};
            
            let arrr = await axios.post('http://localhost:5000/user/getname', { id: job.app})
            .then(response => {
                return response.data;
           });
         //  console.log(arrr.name);
           alldata.recname = arrr.name;
           alldata.varr = 1;
           let arrrr = await axios.post('http://localhost:5000/profileapp/getrating', { id: job.app})
            .then(response => {
                return response.data;
           });

           var list = [];
           alldata.education = [];
           arrrr.education.map((value,idx) => {
                var obj = {
                    insti: value.insti,
                    syear: value.syear,
                    eyear: value.eyear,
                }
                list.push(obj);
            })
            alldata.education = list;
          //  console.log(alldata.education);
           //console.log(typeof arrrr.education);
           alldata.rating = arrrr.rating;
           return alldata;
         
        }));
        this.setState({
            applications: data
    });
    let neww = await data.filter( items => items.rec === curr );
      //  console.log(neww);
        this.setState({
                applications: neww
        });
        
        const currrr = "Rejected";
        let newww = await neww.filter( items => items.type != currrr );
        this.setState({
                applications: newww
        });
        let newwww = await newww.filter( items => items.jobid === this.state.thisjob );
        this.setState({
                applications: newwww
        });
        console.log(this.state.applications.education);
    }
    
    sortbyname = () => {
        let thiss  = this.state.applications;
        thiss.sort((a,b) => (a.recname > b.recname) ? 1 : -1);
        this.setState({
            applications: thiss
    });
    }
    sortbydname = () => {
        let thiss  = this.state.applications;
        thiss.sort((a,b) => (a.recname < b.recname) ? 1 : -1);
        this.setState({
            applications: thiss
    });
    }
    sortbytitle = () => {
        let thiss  = this.state.applications;
        thiss.sort((a,b) => (a.date > b.date) ? 1 : -1);
        this.setState({
            applications: thiss
    });
    }
    sortbydtitle = () => {
        let thiss  = this.state.applications;
        thiss.sort((a,b) => (a.date < b.date) ? 1 : -1);
        this.setState({
            applications: thiss
    });
    }
    sortbyrating = () => {
        let thiss  = this.state.applications;
        thiss.sort((a,b) => (a.rating > b.rating) ? 1 : -1);
        this.setState({
            applications: thiss
    });
    }
    sortbydrating = () => {
        let thiss  = this.state.applications;
        thiss.sort((a,b) => (a.rating < b.rating) ? 1 : -1);
        this.setState({
            applications: thiss
    });
    }
            render() {
                return (
                    <div>
                       <form>
                        <Button style = {{backgroundColor:'purple'}} variant="contained"  onClick={this.sortbyname} >Sort By Name</Button>
                        <Button style = {{backgroundColor:'purple'}} variant="contained"  onClick={this.sortbydname} >Sort By Name(D)</Button>
                        </form>
                        <form>
                        <Button style = {{backgroundColor:'lime'}} variant="contained"  onClick={this.sortbytitle} >DO Application</Button>
                        <Button style = {{backgroundColor:'lime'}} variant="contained"  onClick={this.sortbydtitle} >DO Application(D)</Button>
                        </form>
                        <form>
                        <Button style = {{backgroundColor:'orange'}} variant="contained"  onClick={this.sortbyrating} >Sort By Rating</Button>
                        <Button style = {{backgroundColor:'orange'}} variant="contained"  onClick={this.sortbydrating} >Sort By Rating(D)</Button>
                        </form>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>SOP</th>
                                    <th>Education</th>
                                    <th>Rating</th>
                                    <th>Stage</th>
                                    <th>Date of Application</th>

                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            { 
                                this.state.applications.map((job, i) => {
                                    let varr = false;
                                    return (
                                        <tr key={i}>
                                            <td>{job.recname}</td>
                                            <td>{job.review}</td>
                                            <td> 
                                            {job.education.map((valuee,idx) => {
                                            return <div>
                                                    {valuee.insti} ({valuee.syear}   -   {valuee.eyear})
                                                 </div>
                                            })}
                                             </td>
                                            <td>{job.rating}</td>
                                            <td>{job.type}</td>
                                            <td>{job.date}</td>
                                            <th> {job.type === "Applied" ?  <Button style = {{backgroundColor:'aqua'}} variant="contained" onClick={(event)=>{this.changestate(job._id,job.type,job.app,event)}}>Shortlist</Button> : (  job.type === "Shortlisted" ?  <Button style = {{backgroundColor:'yellow'}} variant="contained" onClick={(event)=>{this.changestate(job._id,job.type,job.app,event)}}>Accept</Button> : <Button style = {{backgroundColor:'green'}} variant="contained" onClick={(event)=>{this.changestate(job._id,job.type,job.app,event)}}>Badhai Ho</Button> )} </th>
                                            <th>
                                    { job.type === "Accepted" ?   <Button  style = {{color:'red'}}  color="primary" disabled></Button> : <Button style = {{backgroundColor:'red'}} variant="contained" onClick={(event)=>{this.changestate(job._id,"Rejected",job.app,event)}}>Reject</Button> } </th>
                                             
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

export default RecMyjob;