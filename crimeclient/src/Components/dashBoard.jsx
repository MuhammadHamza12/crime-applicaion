import React, { Component } from 'react'
import { Jumbotron, Container } from 'reactstrap';
import FlashMessagesList from './flashMessagesList';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';
import * as checkTokenStatus  from '../Actions/dashBoardActions.js/dashboardActions';
import { Nav, NavItem, Alert , Dropdown, Button ,DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import '../css/style.css';
import back from '../images/back.jpg';
const divStyle = {
  width: '100%',
  height: '300px',
  backgroundImage: `url(${back})`,
  backgroundSize: 'cover', 
};
const styles = {
  header: {
    // styles go here!
  },
  backgroundImg: {
  
  },
};
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  privateMethod =()=>{
    if(this.props.isAdmin == 'Admin'){
      return(
       <div>
         <Alert color='primary' >Hello Admin</Alert>
         <div style={{textAlign:'right'}} >
            <Link to='/dashboard/ReportManager'>
             Update Reports Status
            </Link>
         </div>
       </div>
      )
    }
  }
componentWillMount(){
}
  render() {
    
    return (
      <div style={divStyle} >
        <FlashMessagesList />
         <p className='para' style={{fontSize:60,color:'#ffff'}} >Wellcome to Dashboard!</p>
        <Nav className='para' tabs>
          <NavItem style={{padding:'15px',display:'inline-block',lineHeight:'20px'}} >
          
           <Link style={{color:'#ffff'}} className='para' to='/dashboard/Profile' >Profile</Link> 
          </NavItem>
          <NavItem style={{padding:'15px',display:'inline-block',lineHeight:'20px'}} >
          <Link to='/dashboard/crimeReport' style={{color:'#ffff'}} >Crime Report</Link> 
          </NavItem>
          <NavItem  style={{padding:'15px',display:'inline-block',lineHeight:'20px'}} >
           <Link to='/dashboard/missingReport' style={{color:'#ffff'}} >Missing Report</Link>
           </NavItem>
          <NavItem style={{padding:'15px',display:'inline-block',lineHeight:'20px'}} >     
            <Link style=  {{color:'#ffff'}} to='/dashboard/complaints' >Complaints</Link> 
          </NavItem>
          <Dropdown style={{color:'#000000'}} nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle  style={{color:'#000000'}} nav caret>
              View Records 
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem style={{color:'#000000'}}  header>Record List</DropdownItem>
              <DropdownItem><Link style={{color:'#000000'}} to='/dashboard/viewcrimeRecord' >Viewe Crime Reports</Link> 
          </DropdownItem>
              <DropdownItem divider />
              <DropdownItem> <Link  style={{color:'#000000'}} to='/dashboard/viewmissingRecord' >View Missing Person Reports</Link> </DropdownItem>
              <DropdownItem divider />
              <DropdownItem> <Link  style={{color:'#000000'}} to='/dashboard/viewcomplaintRecord'>View Complaints</Link></DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Nav>
      </div>
    );
  };
};
function mapStateToProps(state) {
  return {
    authData : state.signup,
    username:state.setuser.users.username,
    isAdmin : state.setuser.users.type,
  }

}

export default connect(mapStateToProps,null)(Dashboard);