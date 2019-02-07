import React, { Component } from 'react';
import Home from './Components/Home';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Forgetpassword from './Components/forgetPassword';
import CustomNavbar from './Components/customNavbar';
import CustomFooter from './Components/customFooter';
import ForgetConfirm from './Components/forgetConfimr';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './Components/dashBoard';
import requirAuth from './Components/requirAuth/requireAuth';
import requireAuthCommon from './Components/requirAuth/requireAuthCommon';
import ResetPassword from './Components/resetPassword';
import requireAuthForgetpass from './Components/requirAuth/requireAuthForgetpass';
import requireEmailConfirm from './Components/requirAuth/requireEmailConfirm';
import requireForgetPassword from './Components/requirAuth/requireAuthForgetpass';
import Profile from './Components/Profile';
import MissingReport from './Components/subComponents/missingReport';
import CrimeReport from './Components/subComponents/crimeReport';
import Complaints from './Components/subComponents/complaints';
import CrimeReportViewer from './Components/subComponents/viewComponents/CrimeReportViewer';
import MissingReportViewer from './Components/subComponents/viewComponents/MissingReportViewer';
import ComplaintReportViewer from './Components/subComponents/viewComponents/ComplaintReportViewer';
import AllCrimeReports from './Components/CompForAll/AllCrimeReports';
import AllMissingReports from './Components/CompForAll/AllMissingReports';
import AdminAccess from './Components/Admin/AdminAccess';
import AdminCrimeReport from './Components/Admin/Accessibility/AdminCrimeReport';
         
class App extends Component {
  render() {
    return (
    <Router>
    <div className="App">
    <CustomNavbar />
    {/* ALL Authenticated Routes  */}
    <Route exact path="/" component={ requireAuthCommon(Home)} />
   <Route path='/signUp' component={requireAuthCommon(SignUp)} />
   <Route path='/login' component={requireAuthCommon(Login)} />
   <Route path='/dashboard' component={requirAuth(Dashboard)} />
   <Route path='/password_forget' component={Forgetpassword} />
   <Route path='/confirmation' component={requireEmailConfirm(ForgetConfirm)} />
  <Route path='/forgot_password' component={requireAuthForgetpass(ResetPassword)} />  
  <Route path='/dashboard/Profile' component={requirAuth(Profile)} />
   <Route path='/dashboard/ReportManager' component={(AdminAccess)} />
   {/* End of Auth routes */}
   {/* Open Routes  */}
  <Route path='/dashboard/crimeReport' component={CrimeReport} />
  <Route path='/dashboard/missingReport' component={MissingReport} />
  <Route path='/dashboard/complaints' component={Complaints} />
  <Route path='/dashboard/viewcrimeRecord' component={ (CrimeReportViewer)} />
  <Route path='/dashboard/viewmissingRecord' component={(MissingReportViewer)} />
  <Route path='/dashboard/viewcomplaintRecord' component={(ComplaintReportViewer)} /> 
  <Route path='/openCrimeReports' component={(AllCrimeReports)} />
  <Route path='/openMissingReports' component={(AllMissingReports)}  />
  {/* <Route path="/dashboard/ReportManager/AllDetailsCrimeReport" component={(AdminCrimeReport)} /> */}
         
  {/* End of Open Routes */}
   {/* <CustomFooter /> */}
      </div>
      </Router>
    );
  }
}

export default App;
