import React, { Component } from 'react';
import { Container, Row, Col ,Badge, Nav, NavItem, NavLink } from 'reactstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link , Switch } from 'react-router-dom';
import AdminCrimeReport from '../Admin/Accessibility/AdminCrimeReport';
import AdminMissingReports from '../Admin/Accessibility/AdminMissingReports';
import AdminComplaintReports from '../Admin/Accessibility/AdminComplaintReports';
import config from '../../config';
class AdminAccess extends Component {
    render() {
        return (
            <div>
                <Container>
              <Badge style={{fontSize:30}} color='warning' >Admin Pannel</Badge>  
              <Row>
          <Col xs="3">
          <Nav vertical>
          <div style={{paddingTop:15}} >
          <div style={{padding:10}} >
          <Link to='/dashboard/ReportManager/AllDetailsCrimeReport' >All Crime Reports </Link> 
          </div>
          <div style={{padding:10}} >
          <Link to='/dashboard/ReportManager/AllDetailsMissingReport' >All Missing Reports </Link> 
          </div>
          <div style={{padding:10}} >
          <Link to='/dashboard/ReportManager/AllDetailsComplaintReport' >All Complaint Reports </Link> 
          </div>
          </div>
        </Nav></Col>
          <Col xs="9">
          <Switch>
  <Route path='/dashboard/ReportManager/AllDetailsCrimeReport' component={(AdminCrimeReport)} />
  <Route path='/dashboard/ReportManager/AllDetailsMissingReport' component={AdminMissingReports} />
  <Route path='/dashboard/ReportManager/AllDetailsComplaintReport' component={AdminComplaintReports} />
  
  {/* <Route component={NoMatch} /> */}
            </Switch>
          </Col>
        </Row>
        </Container>
            </div>
        );
    }
}

export default AdminAccess;