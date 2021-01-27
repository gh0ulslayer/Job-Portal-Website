import React , { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container,
    NavLink
} from 'reactstrap';

class RecruiterNavbar extends Component {
  state = {
      isOpen: false
  }

  toggle = () => {
      this.setState({
          isOpen: !this.state.isOpen
      })
  }

  render() {
      const curr = localStorage.getItem('name');
      return (
        <div>
        <Navbar color = "dark" dark expand= "sm" className = "mb-5">
            <Container> 
                 <NavbarBrand href ="/"> Hi {curr} </NavbarBrand>
                <NavbarToggler onClick ={this.toggle} /> 
                <Collapse isOpen ={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                        <NavLink href = "/Rec-addjob">Add Job</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink href = "/Rec-myjob">My Jobs</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink href = "/Rec-jobreq">Accepted Applicants</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink href = "/Rec-profile" >My Profile</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink onClick={() => {localStorage.clear();
                            window.location.href = "/"; }} >Logout</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Container>
            </Navbar>
         </div>
      );
  }

}

export default RecruiterNavbar;
