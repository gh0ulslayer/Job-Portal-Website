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

class ApplicantNavbar extends Component {
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
                <NavbarBrand href ="/">Hi {curr}</NavbarBrand>
                <NavbarToggler onClick ={this.toggle} /> 
                <Collapse isOpen ={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                        <NavLink href = "/App-appplication" >My Applications</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink href = "/App-jobs">All Jobs</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink href = "/App-profile" >My Profile</NavLink>
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

export default ApplicantNavbar;
