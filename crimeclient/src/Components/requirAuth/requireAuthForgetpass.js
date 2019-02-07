import React ,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as flashAction from '../../Actions/flashmessageAction/flashmessage';
import * as checkTokenStatus  from '../../Actions/dashBoardActions.js/dashboardActions';
import axios from 'axios';
import config from '../../config';
import loading from '../../images/loading.gif';
export default function(ComposeComponent){
 class Authenticate extends Component {
   constructor(props) {
       super(props);
       this.state={
           isLoading:false,
       }
   }
    renderComponent=()=>{
      if(this.state.isLoading){
          return(
              <div>
                <div style={{textAlign:'center'}} >
                  <img src={loading}  alt="#loader"/>
                  </div>
              </div>
          )
      }
      else{
        return (
        
            <ComposeComponent {...this.props}  />
        
        )
      }
     }
    componentWillMount(){
            if(this.props.auth){
               this.props.history.push('/dashboard');
            }
        this.setState({isLoading:true})           
       
    const query = window.location.search.substring(1);
    const getToken=query.split('=');
     const realToken=getToken[1];
     if(!realToken){
         this.props.history.push('/login');
     }
     if(realToken){
        axios({ method: 'POST', url: `${config.port}/api/resetToken`, headers: {authorization: realToken}})
        .then((res)=>{
            this.setState({isLoading:false})           
            console.log('res', res);
        })
        .catch((err)=>{
            console.log('err', err.response);
            this.setState({isLoading:false})
            this.props.action.flashMessage({type:'expireResetOnWill',text:'This password reset link is no longer valid, Please try again'});          
            this.props.history.push('/login');        
        })
    }
 }

   render() {
       return(
           <div>
               {this.renderComponent()}
           </div>
       )
  }
}
function mapStateToProps(state) {
    return{
        auth:state.setuser.isAuth,
    }
}

function mapDispatchToProps(dispatch) {
    return{
        action_1:bindActionCreators(checkTokenStatus,dispatch),
        action:bindActionCreators(flashAction,dispatch)
    }
}
return connect(mapStateToProps,mapDispatchToProps)(Authenticate);
}
