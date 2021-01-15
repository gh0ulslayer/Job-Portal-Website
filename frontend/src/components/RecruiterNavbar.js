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
      return (
        <div>
        <Navbar color = "dark" dark expand= "sm" className = "mb-5">
            <Container> 
                <NavbarBrand href ="/">Recruiter</NavbarBrand>
                <NavbarToggler onClick ={this.toggle} /> 
                <Collapse isOpen ={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href = "/" >My Applications</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink href = "/">Create Job</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink href = "/">All Jobs</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink href = "/">Job Requests</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink href = "/" >My Profile</NavLink>
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
