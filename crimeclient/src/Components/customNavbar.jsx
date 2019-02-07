import React, {Component } from 'react'
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
  DropdownItem,
Alert } from 'reactstrap';
import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';
import {  FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  {  faAngleDoubleRight ,faSpinner , faArrowAltCircleDown ,faSignInAlt , faSign , faHandPaper } from '@fortawesome/free-solid-svg-icons';
import * as loginActions from '../Actions/loginActions/loginAction';

import { BrowserRouter , Route , Router, Link } from 'react-router-dom';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
// import './customNavbar.css';
class CustomNavbar extends Component {
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
  privateMethod =()=>{
    try{
    if(this.props.auth.users.type == 'Admin'){
      return(
       <div>
         <div style={{textAlign:'right'}} >
         <NavItem>
          
            <Link style={{color:'#ffff'}} to='/dashboard/ReportManager/AllDetailsCrimeReport'>
          <i className="fa fa-dashboard" aria-hidden="true"></i>
             Update Reports Status
            </Link>
         </NavItem>
         </div>
       </div>
      )
    }
  }
  catch(e){
    console.log('handle error');
  }
  }

  Logout =(e) =>{
    e.preventDefault();
    this.props.action.logout();
  }
  render() {
    const { isAuth } = this.props.auth; 
    const userLinks = (
            <div style={{textAlign:'right'}} >
              {this.privateMethod()}
            <NavItem>
              <a href='#' style={{color:'#fff'}} onClick={this.Logout} >
            <FontAwesomeIcon icon={faSignInAlt} />
            Logout
              </a> 
              </NavItem>
              </div>
    );
    
    const guestLinks = (
            <div style={{textAlign:'center',display:'flex',flexDirection:'row'}} >
            <NavItem>
                  <Link to='/openCrimeReports' style={{color:'#ffff',padding:20}}  >
                  <FontAwesomeIcon icon={faAngleDoubleRight} /> Crime Reports
                 </Link>
              </NavItem>
              <NavItem>
                  <Link to='/openMissingReports' style={{color:'#ffff',padding:20}}  >
                  <FontAwesomeIcon icon={faAngleDoubleRight} /> 
                 Missing Reports
                 </Link>
              </NavItem>           
            <NavItem>
                  <Link to='/signUp' style={{color:'#ffff',padding:20}}  >
                 <FontAwesomeIcon icon={faSignInAlt} />
                 Sign Up
                 </Link>
              </NavItem>
              <NavItem>
                <Link to='/login' style={{color:'#ffff',padding:10}}  >
              <FontAwesomeIcon icon={faSign} /> Login
                </Link>
              </NavItem>
              </div>
    );

    return (
      <div>
        
       <Navbar className='navbar navbar-dark bg-dark' color="light" light expand="md">
          <NavbarBrand href="/"> <FontAwesomeIcon icon={faHandPaper}  /> Crime Report</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
                            
              {isAuth ? userLinks : guestLinks}
              
            </Nav>
          </Collapse>
        </Navbar>
          </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    action:bindActionCreators(loginActions,dispatch)
  }
}
function mapStateToProps(state) {
  debugger;
  return {
    auth:state.setuser,

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(CustomNavbar);