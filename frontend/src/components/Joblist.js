import React , { Component } from 'react';
import { 
    Container , 
    ListGroup ,
    ListGroupItem ,
    Button
} from 'reactstrap';

import {
    CSSTransition,
    TransitionGroup
} from 'react-transition-group';

import {v4 as uuidv4} from 'uuid';

class JobList extends Component{
    state = {
        jobs: [
            {id: uuidv4(), name:'Tech'},
            {id: uuidv4(), name:'HR'},
            {id: uuidv4(), name:'Peon'},

        ]
    }
    
    render() {
        const {jobs} = this.state;
        return(
            <Container> 
            <Button
                color = "dark"
                style = {{marginBottom: '2rem'}}
                onClick = {() => {
                    const name  = prompt('Enter Job');
                    if(name) {
                        this.setState(state => ({
                            jobs: [...state.items, {id : uuidv4(),name}]
                        }));
                    }
                }}
                >Add Job</Button>
            </Container>
        ); 
    }
    
}

export default JobList;