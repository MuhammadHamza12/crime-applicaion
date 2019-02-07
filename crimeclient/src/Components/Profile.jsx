import React, { Component } from 'react'
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Collapse,  CardBody } from 'reactstrap';
import { Badge } from 'reactstrap';
import * as profileAction from '../Actions/ProfileAction/profileAction';
import config from '../config';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { 
      collapse: false ,
      loader:false,
      crCount:this.props.reportCount ? this.props.reportCount.crimeReportCount : 'Loading....',
      comrCount:this.props.reportCount ? this.props.reportCount.complaintsReportCount: 'Loading....',
      misrCount:this.props.reportCount ? this.props.reportCount.missingReportCount : 'Loading....',
  
    };
  }
   componentWillReceiveProps=(nextProps)=>{
    this.setState({
      crCount:nextProps.reportCount.crimeReportCount,
      comrCount:nextProps.reportCount.complaintsReportCount,
      misrCount:nextProps.reportCount.missingReportCount,
    })
   }
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  
  componentDidMount(){
    const userId = this.props.userId;
    const data ={userId}
    this.props.actions.countDataEnteries(`${config.port}/api/reportCount`,data)
    .then((res)=>{
      console.log('downlooad data : ',res);
     
    })
    .catch((err)=>{
      console.log('error in downloading data', err);
    })  
  }
  render() {
    return (
      <div>
        <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
        <h1>Profile</h1>
        <CardText>User Email: {this.props.userData.users.email}</CardText>
        <CardText>User Name: {this.props.userData.users.username} </CardText>
        <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Reports Details</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }} >
            <CardBody>  
            <CardText>Number of Crime Reports:  <Badge style={{fontSize:20}} color="danger">{this.state.crCount || '0'}</Badge></CardText>
        <CardText>Number of Missing Person Reports:   <Badge style={{fontSize:20}} color="dark">{this.state.misrCount || '0'}</Badge></CardText>
        <CardText>Complaints:   <Badge style={{fontSize:20}}  color="secondary">{this.state.comrCount || '0'}</Badge></CardText>
            </CardBody>
          </Card>
        </Collapse>
       
        </Card>    
      </div>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return{
    actions:bindActionCreators(profileAction,dispatch),
  }
}
function mapStateToProps(state) {
  debugger  
  return{
      userData:state.setuser,
      userId:state.setuser.users.id,
      reportCount:state.setRCount,
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile);