import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
export default class CustomFooter extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
     
  render() {
    return (
      <div>
         <Nav className="navbar fixed-bottom navbar-dark bg-dark" >
          <NavItem >
            {/* <NavLink href="#">Link</NavLink> */}
            <div style={{textAlign:'center'}} >

            <h5 style={{color:'#fff'}} >Muhammad Hamza Haneef Qureshi</h5>
            </div>
          </NavItem>
        
        </Nav>

       
      </div>
    )
  }
};
